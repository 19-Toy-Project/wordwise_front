import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") as string;
    const size = searchParams.get("size") as string;

    console.log(page, size);
    //백엔드 한테 보내기

    return NextResponse.json({
      success: true,
      statusCode: "200",
      message: "성공",
      data: {
        sentences: [
          {
            sentenceId: 0,
            sentence: "I ate Apple.",
            meaning: "나는 사과를 먹는다",
          },
        ],
        pageable: {
          pageNumber: 1,
          pageSize: 1,
          sort: {
            empty: false,
            sorted: false,
            unsorted: true,
          },
          offset: 0,
          paged: true,
          unpaged: false,
        },
        last: false,
        totalPages: 1,
        totalElements: 1,
        size: 1,
        number: 1,
        sort: {
          empty: false,
          sorted: false,
          unsorted: true,
        },
        first: true,
        numberOfElements: 1,
        empty: false,
      },
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
