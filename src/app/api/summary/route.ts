/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { authOptions, CustomSession } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getUserCoins } from "@/actions/fetchAction";
import prisma from "@/lib/db.config";
import { coinsSpend, subtractCoins, updateSummary } from "@/actions/common-actions";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { TokenTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { PromptTemplate } from "@langchain/core/prompts";
import { gptModal } from "@/lib/langchain";
import { summaryTemplate } from "@/lib/prompts";
import { loadSummarizationChain } from "langchain/chains";


interface SummaryPayload {
  url: string;
  id: string;
}

export async function POST(req: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body: SummaryPayload = await req.json();

    // Check if user has suffiecint coinds or not
    const userCoins = await getUserCoins(session?.user?.id ?? "");
    if (userCoins === null || (userCoins?.coins && userCoins?.coins < 10)) {
      return NextResponse.json(
        {
          message:
            "You don't have sufficient coins for generating a summary. Please add more coins",
        },
        { status: 400 }
      );
    }

    // check if there is a available sumamry for same url
    const oldSummary = await prisma.summary.findFirst({
      select: {
        response: true,
      },
      where: {
        url: body.url,
      },
    });

    // if not summary
    if (oldSummary != null && oldSummary.response) {
      //Do things
      await subtractCoins(session?.user?.id ?? "");
      await coinsSpend(session?.user?.id ?? "", body?.id ?? "");
      return NextResponse.json({
        message: "Podcast Summary",
        data: oldSummary.response,
      });
    }

    // * extract video transcript
    let text: Document<Record<string, any>>[];
    try {
      const loader = YoutubeLoader.createFromUrl(body.url!, {
        language: "en",
        addVideoInfo: true,
      });
      text = await loader.load();
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message:
            "No Transcript available for this video.Plese try another video",
        },
        { status: 404 }
      );
    }

    const splitter = new TokenTextSplitter({
      chunkSize: 15000,
      chunkOverlap: 250,
    });
    const docsSummary = await splitter.splitDocuments(text);
    const summaryPrompt = PromptTemplate.fromTemplate(summaryTemplate);
    const summaryChain = loadSummarizationChain(gptModal, {
      type: "map_reduce",
      verbose: true,
      combinePrompt: summaryPrompt,
    });
    const res = await summaryChain.invoke({ input_documents: docsSummary });
  
    // * Do things
    await subtractCoins(session?.user?.id??"");
    await coinsSpend(session?.user?.id??"", body?.id??"");
    await updateSummary(body?.id??"", res?.text);

    return NextResponse.json({
      message: "Podcast Summary",
      data: res?.text,
    });
  } catch (error) {
    console.log("The error is", error);
    return NextResponse.json(
      { message: "Something went wrong.please try again!" },
      { status: 500 }
    );
  }
}
