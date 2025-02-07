import { words } from "@/constants/pathname";
import { WordType } from "@/types/type";
import Button from "../../../../../components/buttons/Button";

const WordItem = ({ word }: { word: WordType }) => {
  return (
    <Button href={`${words}/${word.wordId}`}>
      <span>{word.word_en}</span>
      {word.word_krs.map((word: string) => (
        <span key={word}>{word}</span>
      ))}
    </Button>
  );
};

export default WordItem;
