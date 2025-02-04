export default async function StudyPage() {
  const response = await fetch("http://localhost:8080/api/v1/users/score", {
    method: "get",
  });
  const { data: study } = await response.json();
  return (
    <div>
      내가 학습한 문장 조회 차트
      <p>초급 점수 : {study.level1Score}</p>
      <p>중급 점수 : {study.level2Score}</p>
      <p>고급 점수 : {study.level3Score}</p>
      <p>회화 점수 : {study.conversationScore}</p>
    </div>
  );
}
