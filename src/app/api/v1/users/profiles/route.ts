import { NextResponse } from "next/server";

export async function GET() {
  try {
    //백엔드 한테 보내기

    return NextResponse.json({
      success: true,
      statusCode: "200",
      message: "성공",
      data: {
        userName: "홍길동",
        userEmail: "hong@gmail.com",
        userRank: 1,
      },
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
