"use client";
import { Button } from "@/components/buttons";
import { useCookie } from "@/contexts/cookie.context";
import { SentenceType } from "@/types/type";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useEffect, useState } from "react";

export default function WishPage() {
  const { cookie } = useCookie();
  const [wishSentence, setStudied] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/users/wish/sentence`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      const { data: wishSentence } = await response.json();
      setStudied(wishSentence.content);
    };
    fetchUser();
  }, [cookie]);

  if (wishSentence.length > 0) {
    return (
      <div className="flex flex-col">
        {wishSentence.map((sentence: SentenceType & { wordId: number }) => (
          <Button
            intent="white"
            href={`/words/${sentence.wordId}`}
            key={sentence.sentenceId}
          >
            <p>{sentence.sentence}</p>
            <p>{sentence.sentence_kr}</p>
          </Button>
        ))}
      </div>
    );
  } else {
    return <div>찜한 문장이 없습니다.</div>;
  }
}
