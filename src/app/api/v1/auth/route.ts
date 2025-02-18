import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, value, httpOnly, expires } = await request.json();
  const date = new Date(expires * 1000);
  const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  const kstDate = new Date(date.getTime() + kstOffset);

  const response = NextResponse.json({ message: "쿠키 설정 완료" });
  response.cookies.set({
    name,
    value,
    expires: kstDate,
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
