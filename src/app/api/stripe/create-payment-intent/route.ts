import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { amount, description } = await request.json();

    // Ensure that a description is provided
    if (!description) {
      return NextResponse.json(
        { error: "Description is required for export transactions." },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      description: "Your transaction description here", // Provide a description for the transaction as per Stripe documentation
      receipt_email: "customer@example.com", // Provide the customer's email address
      shipping: {
        name: "abc",
        address: {
          line1: "xyz",
          city: "City", // Provide the city information
          postal_code: "Postal Code", // Provide the postal code information
          country: "IN", // Provide the country code for India (IN)
        },
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
