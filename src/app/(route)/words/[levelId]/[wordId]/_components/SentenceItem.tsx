import { IconButton } from "@/components/buttons";
import { AiOutlineSound } from "react-icons/ai";
import { IoMdMic } from "react-icons/io";
import { TbJewishStar, TbJewishStarFilled } from "react-icons/tb";

type SentenceType = {
  sentenceId: number;
  sentence: string;
  meaning: string;
  wish: boolean;
};
const SentenceItem = ({ sentence }: { sentence: SentenceType }) => {
  return (
    <div>
      <h5>{sentence.sentence}</h5>
      <p>{sentence.meaning}</p>

      <IconButton icon={() => <AiOutlineSound color="black" />} />
      <IconButton icon={() => <IoMdMic color="black" />} />
      {sentence.wish ? (
        <IconButton icon={() => <TbJewishStarFilled color="black" />} />
      ) : (
        <IconButton icon={() => <TbJewishStar color="black" />} />
      )}
    </div>
  );
};

export default SentenceItem;
