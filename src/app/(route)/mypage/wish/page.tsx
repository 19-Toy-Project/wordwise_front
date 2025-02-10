import { Button } from "@/components/buttons";
import { SentenceType } from "@/types/type";
import { cookies } from "next/headers";

export default async function WishPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  const response = await fetch(
    `http://localhost:8080/api/v1/users/wish/sentence`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const { data: wishSentence } = await response.json();
  console.log(wishSentence);
  if (wishSentence.content.length > 0) {
    return (
      <div>
        {wishSentence.content.map(
          (sentence: SentenceType & { wordId: number }) => (
            <Button
              href={`/words/${sentence.wordId}`}
              key={sentence.sentenceId}
            >
              <strong>{sentence.sentence}</strong>{" "}
              <span>{sentence.sentence_kr}</span>
            </Button>
          )
        )}
      </div>
    );
  } else {
    return <div>찜한 문장이 없습니다.</div>;
  }
}
