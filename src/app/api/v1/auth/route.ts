import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, value, httpOnly } = await request.json();
  // const date = new Date();
  // date.setTime(date.getTime() + exp * 60 * 1000);

  const response = NextResponse.json({ message: "쿠키 설정 완료" });
  response.cookies.set({
    name,
    value,
    httpOnly: httpOnly || false,
    path: "/",
  });
  return response;
}

export async function DELETE() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "쿠키 삭제 완료",
    });
    response.cookies.set({
      name: "refreshToken",
      value: "",
      expires: new Date(0),
      httpOnly: true,
      path: "/",
    });
    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
