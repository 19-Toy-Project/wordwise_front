import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log(request);
    //백엔드 한테 보내기

    return NextResponse.json({
      success: true,
      statusCode: "200",
      message: "성공",
      data: null,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
