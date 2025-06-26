import { db } from "@/configs/db";
import { PAYMENT_RECORD_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import axios from "axios";

export async function POST(req) {
  console.log("Payment webhook received");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Get the request body as text
  const text = await req.text();
  console.log("Request body length:", text.length);
  
  let event;
  let data;
  let eventType;
  
  // Check if webhook signing is configured
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  try {
    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret
      const signature = req.headers.get("stripe-signature");
      console.log("Stripe signature:", signature);
      
      if (!signature) {
        console.error("No Stripe signature found in headers");
        return NextResponse.json({ error: "No signature" }, { status: 400 });
      }
      
      try {
        event = stripe.webhooks.constructEvent(text, signature, webhookSecret);
        console.log("Event constructed successfully:", event.type);
      } catch (err) {
        console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
    } else {
      // If no webhook secret, parse the body directly (not recommended for production)
      event = JSON.parse(text);
      console.log("No webhook secret, parsed body directly");
    }
    
    // Extract the data from the event
    data = event.data;
    eventType = event.type;
    
    console.log(`Processing Stripe event: ${eventType}`);
  } catch (err) {
    console.error(`Error processing webhook: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  switch (eventType) {
    case "checkout.session.completed":
      // Payment is successful and the subscription is created.
      try {
        console.log("Processing successful checkout session");
        console.log("Full event data:", JSON.stringify(event, null, 2));
        
        // Get customer email from the session data
        let customerEmail = null;
        
        // Try different paths to find the email
        if (data.object.customer_details && data.object.customer_details.email) {
          customerEmail = data.object.customer_details.email;
          console.log("Found email in customer_details:", customerEmail);
        } else if (data.object.customer_email) {
          customerEmail = data.object.customer_email;
          console.log("Found email in customer_email:", customerEmail);
        } else {
          // If we can't find the email directly, try to get it from metadata or other fields
          console.log("Email not found in expected fields, checking metadata...");
          if (data.object.metadata && data.object.metadata.email) {
            customerEmail = data.object.metadata.email;
            console.log("Found email in metadata:", customerEmail);
          }
        }
        
        if (!customerEmail) {
          console.error("Could not find customer email in the webhook data");
          return NextResponse.json({ error: "Customer email not found" }, { status: 400 });
        }
        
        // First, check if the user exists
        const existingUsers = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, customerEmail));
          
        console.log(`Found ${existingUsers.length} users with email ${customerEmail}`);
        
        if (existingUsers.length === 0) {
          console.error(`No user found with email ${customerEmail}`);
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        // Update user status in database
        console.log(`Updating user with email ${customerEmail} to set isMember=true and credit=20`);
        
        try {
          const updateResult = await db
            .update(USER_TABLE)
            .set({
              isMember: true,
              customerId: data.object.customer,
              credit: 20, // Set credit to 20 for paid members
            })
            .where(eq(USER_TABLE.email, customerEmail));
            
          console.log("Update operation completed");
        } catch (dbError) {
          console.error("Database update error:", dbError);
          return NextResponse.json({ error: "Database update failed" }, { status: 500 });
        }
        
        // Verify the update was successful
        const updatedUser = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, customerEmail));
          
        console.log("Updated user:", updatedUser[0]);

        // Add record to payment_records
        try {
          await db.insert(PAYMENT_RECORD_TABLE).values({
            customerId: data.object.customer,
            sessionId: data.object.id,
          });
          console.log("Payment record inserted successfully");
        } catch (recordError) {
          console.error("Failed to insert payment record:", recordError);
          // Continue processing even if payment record insertion fails
        }

        // Notify credit company about successful payment
        try {
          // Call the credit processing service API
          const creditApiUrl =
            process.env.CREDIT_API_URL ||
            "https://api.creditcompany.com/payment-notification";
          const creditApiKey = process.env.CREDIT_API_KEY || "default-key";

          await axios.post(
            creditApiUrl,
            {
              customerId: data.object.customer,
              sessionId: data.object.id,
              amount: data.object.amount_total,
              currency: data.object.currency,
              paymentStatus: "paid",
              timestamp: new Date().toISOString(),
              credit: 20, // Number of credit added
            },
            {
              headers: {
                Authorization: `Bearer ${creditApiKey}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Credit company successfully notified of payment:", {
            customerId: data.object.customer,
            sessionId: data.object.id,
            amount: data.object.amount_total,
            currency: data.object.currency,
          });
        } catch (notificationError) {
          console.error("Failed to notify credit company:", notificationError);
          // Continue processing even if notification fails
        }
      } catch (error) {
        console.error("Error processing checkout.session.completed:", error);
      }
      break;

    case "invoice.paid":
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      try {
        // Add record to payment_records
        await db.insert(PAYMENT_RECORD_TABLE).values({
          customerId: data.object.customer,
          sessionId: data.object.id,
        });

        // Notify credit company about successful recurring payment
        try {
          // Example of notifying a credit company (replace with actual implementation)
          // await axios.post('https://api.creditcompany.com/payment-notification', {
          //   customerId: data.object.customer,
          //   invoiceId: data.object.id,
          //   amount: data.object.amount_paid,
          //   currency: data.object.currency,
          //   paymentStatus: 'paid',
          //   timestamp: new Date().toISOString()
          // });
          console.log("Credit company notified of recurring payment:", {
            customerId: data.object.customer,
            invoiceId: data.object.id,
            amount: data.object.amount_paid,
            currency: data.object.currency,
          });
        } catch (notificationError) {
          console.error("Failed to notify credit company:", notificationError);
        }
      } catch (error) {
        console.error("Error processing invoice.paid:", error);
      }
      break;

    case "invoice.payment_failed":
      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      try {
        await db
          .update(USER_TABLE)
          .set({ isMember: false })
          .where(eq(USER_TABLE.email, data.object.customer_email));

        // Notify credit company about failed payment
        try {
          // Example of notifying a credit company (replace with actual implementation)
          // await axios.post('https://api.creditcompany.com/payment-notification', {
          //   customerId: data.object.customer,
          //   invoiceId: data.object.id,
          //   paymentStatus: 'failed',
          //   timestamp: new Date().toISOString()
          // });
          console.log("Credit company notified of failed payment:", {
            customerId: data.object.customer,
            invoiceId: data.object.id,
          });
        } catch (notificationError) {
          console.error("Failed to notify credit company:", notificationError);
        }
      } catch (error) {
        console.error("Error processing invoice.payment_failed:", error);
      }
      break;

    default:
      // Unhandled event type
      console.log(`Unhandled event type: ${eventType}`);
  }

  return NextResponse.json({ result: true });
}
