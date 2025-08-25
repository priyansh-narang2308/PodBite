import { NextRequest, NextResponse } from "next/server";
import { authOptions, CustomSession } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { Stripe } from "stripe";
import prisma from "@/lib/db.config";

interface SessionPayload {
  plan: string;
}

export async function POST(req: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body: SessionPayload = await req.json();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    // get the plan fromthe database

    const products = await prisma.products.findUnique({
      where: {
        name: body.plan,
      },
    });

    if (!products) {
      return NextResponse.json(
        {
          message:
            "No product found. Please check that you have passed a correct product",
        },
        { status: 404 }
      );
    }

    // * Create Transaction
    const transaction = await prisma.transactions.create({
      data: {
        user_id: Number(session?.user?.id ?? ""),
        amount: products.amount,
      },
    });

    // now create stripe session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      currency: "INR",
      billing_address_collection: "required",
      line_items: [
        {
          price: products?.price_id,
          quantity: 1,
        },
      ],
      mode:"payment",
    //   trnasation id to be put
      success_url: `${req.nextUrl.origin}/payment/success?txnId=${transaction.id}`,
      cancel_url: `${req.nextUrl.origin}/payment/cancel?txnId=${transaction.id}`,
    });


    return NextResponse.json({
      message: "Session generated successfully!",
      id: stripeSession?.id,
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong plss try again later!",
      },
      { status: 500 }
    );
  }
}
