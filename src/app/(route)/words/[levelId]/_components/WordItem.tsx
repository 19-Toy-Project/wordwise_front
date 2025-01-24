"use client";
import { words } from "@/constants/pathname";
import { useParams } from "next/navigation";
import Button from "./../../../../../components/buttons/Button";

type WordType = {
  wordId: number;
  word: string;
  meaning: string;
};
const WordItem = ({ word }: { word: WordType }) => {
  const { levelId } = useParams<{ levelId: string }>();
  return (
    <Button
      href={`${words}/${levelId}/${word.wordId}`}
      className="bg-white rounded-md p-3 shadow-md hover:scale-x-105 hover:duration-300 hover:ease-in-out transform cursor-pointer"
    >
      <span>{word.word}</span>
    </Button>
  );
};

export default WordItem;
