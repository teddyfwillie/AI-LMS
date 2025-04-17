import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // This is the url to which the customer will be redirected when they're done
  // managing their billing with the portal.
  const returnUrl = "https://startup-scribe.vercel.app";
  const { customerId } = await req.json();

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  // Redirect to the URL for the session
  //   res.redirect(303, portalSession.url);
  return NextResponse.json(portalSession);
}
