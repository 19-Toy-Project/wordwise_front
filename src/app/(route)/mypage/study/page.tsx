import { cookies } from "next/headers";

export default async function StudyPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  const response = await fetch("http://localhost:8080/api/v1/users/score", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const { data: study } = await response.json();

  return (
    <div>
      내가 학습한 문장 조회 차트
      {study.content.length > 0 ? (
        <div>목록 구현 예정</div>
      ) : (
        <div>학습한 목록이 없습니다</div>
      )}
    </div>
  );
}
