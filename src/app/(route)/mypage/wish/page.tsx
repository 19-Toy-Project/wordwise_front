import { SentenceType } from "@/types/type";

export default async function WishPage() {
  const response = await fetch(
    `http://localhost:8080/api/v1/users/wish/sentence?page=${0}&size=${1}`,
    {
      method: "GET",
    }
  );
  const { data: wishSentence } = await response.json();

  if (wishSentence.sentences.length > 0) {
    return (
      <div>
        {wishSentence.sentences.map((sentence: SentenceType) => (
          <div key={sentence.sentenceId}>
            <strong>{sentence.sentence}</strong>
            <p>{sentence.meaning}</p>
          </div>
        ))}
      </div>
    );
  } else {
    return <div>찜한 문장이 없습니다.</div>;
  }
}
