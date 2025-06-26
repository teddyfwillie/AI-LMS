import { db } from "@/configs/db";
import { PAYMENT_RECORD_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
  try {
    const { sessionId } = await req.json();
    
    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    console.log(`Verifying payment for session ID: ${sessionId}`);
    
    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!session) {
      return NextResponse.json(
        { error: "Invalid session ID" },
        { status: 400 }
      );
    }
    
    // Check if the payment was successful
    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed", status: session.payment_status },
        { status: 400 }
      );
    }
    
    // Get customer email from the session
    let customerEmail = null;
    
    if (session.customer_details && session.customer_details.email) {
      customerEmail = session.customer_details.email;
    } else if (session.customer_email) {
      customerEmail = session.customer_email;
    } else if (session.metadata && session.metadata.email) {
      customerEmail = session.metadata.email;
    }
    
    if (!customerEmail) {
      return NextResponse.json(
        { error: "Customer email not found in session" },
        { status: 400 }
      );
    }
    
    // Check if the user exists
    const existingUsers = await db
      .select()
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, customerEmail));
      
    if (existingUsers.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    const user = existingUsers[0];
    
    // Check if payment record already exists
    const existingRecords = await db
      .select()
      .from(PAYMENT_RECORD_TABLE)
      .where(eq(PAYMENT_RECORD_TABLE.sessionId, sessionId));
      
    let paymentRecordExists = existingRecords.length > 0;
    
    // Transaction to update both user and payment record if needed
    try {
      // Update user status if not already a member
      if (!user.isMember) {
        await db
          .update(USER_TABLE)
          .set({ 
            isMember: true,
            credit: user.credit + 20 // Add 20 credits
          })
          .where(eq(USER_TABLE.id, user.id));
          
        console.log(`Updated user ${user.id} (${customerEmail}): isMember=true, added 20 credits`);
      } else {
        console.log(`User ${user.id} (${customerEmail}) is already a member, adding credits only`);
        
        await db
          .update(USER_TABLE)
          .set({ 
            credit: user.credit + 20 // Add 20 credits
          })
          .where(eq(USER_TABLE.id, user.id));
          
        console.log(`Added 20 credits to user ${user.id} (${customerEmail})`);
      }
      
      // Add payment record if it doesn't exist
      if (!paymentRecordExists) {
        await db.insert(PAYMENT_RECORD_TABLE).values({
          userId: user.id,
          customerId: session.customer,
          sessionId: sessionId,
          amount: session.amount_total,
          currency: session.currency,
          status: "paid",
          createdAt: new Date()
        });
        
        console.log(`Created payment record for session ${sessionId}`);
      } else {
        console.log(`Payment record for session ${sessionId} already exists`);
      }
      
      return NextResponse.json({
        success: true,
        message: "Payment verified and database updated",
        userUpdated: !user.isMember,
        paymentRecordCreated: !paymentRecordExists
      });
    } catch (error) {
      console.error("Error updating database:", error);
      return NextResponse.json(
        { error: "Failed to update database", details: error.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment", details: error.message },
      { status: 500 }
    );
  }
}
