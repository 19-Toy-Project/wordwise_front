import { cookies } from "next/headers";
import Chart from "./_components/Chart";

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
  console.log(study);
  return (
    <div>
      내가 학습한 문장 조회 차트
      <Chart studies={study.content.length > 0 ? study.content : []} />
    </div>
  );
}
