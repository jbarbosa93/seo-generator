import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServerSupabaseClient } from "@/lib/supabase";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { message: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { message: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  const supabase = createServerSupabaseClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      // Update user with Stripe info
      await supabase
        .from("users")
        .update({
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          plan: "pro",
          credits_remaining: 100,
        })
        .eq("email", session.customer_email);

      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      if (subscription.status === "active") {
        // Reset credits on renewal
        await supabase
          .from("users")
          .update({ credits_remaining: 100 })
          .eq("stripe_customer_id", customerId);
      }

      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      await supabase
        .from("users")
        .update({
          plan: "free",
          credits_remaining: 5,
          stripe_subscription_id: null,
        })
        .eq("stripe_customer_id", customerId);

      break;
    }
  }

  return NextResponse.json({ received: true });
}
