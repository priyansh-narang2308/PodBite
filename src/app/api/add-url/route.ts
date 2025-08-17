import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
  }

  try {

    


  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(
      {
        message: "Something went wrong! Please try again!",
      },
      { status: 500 }
    );
  }
}
