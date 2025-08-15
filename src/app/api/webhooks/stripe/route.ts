import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// lib
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
      return NextResponse.json(
        { error: "No Stripe signature" },
        { status: 400 }
      );
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error("❌ Invalid webhook signature:", err);
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    // console.log("🔔 Webhook received:", event.type);

    let userId: string | null = null;

    // Handle payment success
    if (event.type === "checkout.session.completed") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const session = event.data.object as any;

      // ✅ Always store userId in metadata when creating checkout session
      userId = session.metadata?.userId;
      if (!userId) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
      }

      const paymentIntentId = (session.payment_intent as string) ?? session.id;
      const amount = session.amount_total ? session.amount_total / 100 : 0; // store in INR

      // Check for duplicates
      const existingPayment = await prisma.payment.findUnique({
        where: { paymentIntentId },
      });

      if (existingPayment) {
        // console.log("⚠️ Duplicate payment detected, skipping...");
        return NextResponse.json({ message: "Payment already recorded" });
      }

      // Save payment
      await prisma.payment.create({
        data: {
          userId,
          paymentIntentId,
          isPaid: true,
          amount,
        },
      });

      // console.log("✅ Payment recorded successfully:", { userId, amount });
    }

    // Only revalidate if we actually have a userId
    if (userId) {
      revalidateTag(`questions-${userId}`);
      revalidateTag(`saved-questions-${userId}`);
      revalidateTag(`preimium-data-${userId}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("🚨 Webhook Error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
