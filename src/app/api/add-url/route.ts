import { getUserCoins } from "@/actions/fetchAction";
import { summarySchema } from "@/validations/summary-validation";
import vine, { errors } from "@vinejs/vine";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { Document } from "@langchain/core/documents";
import prisma from "@/lib/db.config";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const validator = vine.compile(summarySchema);
    const payLoad = await validator.validate(body);

    // Check if user has suffiecint coinds or not
    const userCoins = await getUserCoins(payLoad.user_id);
    if (userCoins === null || (userCoins?.coins && userCoins?.coins < 10)) {
      return NextResponse.json(
        {
          message:
            "You don't have sufficient coins for generating a summary. Please add more coins",
        },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let text: Document<Record<string, any>>[];
    try {
      const loader = YoutubeLoader.createFromUrl(payLoad?.url, {
        language: "en",
        addVideoInfo: true,
      });

      text = await loader.load();
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message:
            "No Transcript available for this video. Plese try another video",
        },
        { status: 404 }
      );
    }

    // After reciving transcript add it in summary
    const chat = await prisma.summary.create({
      data: {
        ...payLoad,
        user_id: Number(payLoad?.user_id),
        title: text[0].metadata?.title ?? "No Title found!",
      },
    });
    return NextResponse.json({
      message: "Url Added Successfully!",
      data: chat,
    });

  } catch (error) {
    console.log("Error: ", error);
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        {
          message: "Please check Validation errors!",
          errors: error.messages,
        },
        { status: 422 } //unprocessbale entry
      );
    }
    return NextResponse.json(
      {
        message: "Something went wrong! Please try again!",
      },
      { status: 500 }
    );
  }
}
