import { Button } from "@/components/buttons";
import { SentenceType } from "@/types/type";
import { cookies } from "next/headers";

export default async function WishPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/wish/sentence`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const { data: wishSentence } = await response.json();

  if (wishSentence.content.length > 0) {
    return (
      <div className="flex flex-col">
        {wishSentence.content.map(
          (sentence: SentenceType & { wordId: number }) => (
            <Button
              intent="white"
              href={`/words/${sentence.wordId}`}
              key={sentence.sentenceId}
            >
              <p>{sentence.sentence}</p>
              <p>{sentence.sentence_kr}</p>
            </Button>
          )
        )}
      </div>
    );
  } else {
    return <div>찜한 문장이 없습니다.</div>;
  }
}
