import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const { amount, description } = await request.json();

    if (!description) {
      return NextResponse.json(
        { error: "Description is required for export transactions." },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      description,
      receipt_email: "customer@example.com",
      shipping: {
        name: "abc",
        address: {
          line1: "xyz",
          city: "City",
          postal_code: "Postal Code",
          country: "IN",
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

// export async function OPTIONS(request: Request) {
//   const response = new NextResponse(null, {
//     status: 200,
//     headers: {
//       "Access-Control-Allow-Origin": "*", // Adjust as needed for security
//       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//     },
//   });

//   return response;
// }
