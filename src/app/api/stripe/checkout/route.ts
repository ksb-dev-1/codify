import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

// lib
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();
    const sessionUser = await auth();

    if (!priceId || !sessionUser?.user?.id || !sessionUser.user.email) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      customer_email: sessionUser.user.email,
      billing_address_collection: "required",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      metadata: {
        userId: sessionUser.user.id, // ✅ Important for webhook
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("❌ Error creating checkout session:", error);
    return NextResponse.json(
      { message: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
