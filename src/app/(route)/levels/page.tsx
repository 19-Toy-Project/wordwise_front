import { Button } from "@/components/buttons";
import {
  advanced,
  beginner,
  conversation,
  intermediate,
} from "@/constants/pathname";

export default function LevelPage() {
  return (
    <div className="bg-white border rounded-md container mx-auto p-5">
      <h1 className="font-bold text-4xl text-center text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient bg-clip-text">
        원하시는 레벨을 선택해주세요 !
      </h1>
      <div className="grid grid-cols-2 grid-rows-2 gap-5">
        <Button href={beginner}>Beginner : 초급</Button>
        <Button href={intermediate}>Intermediate : 중급</Button>
        <Button href={advanced}>Advanced : 고급</Button>
        <Button href={conversation}>Conversation : 회화</Button>
      </div>
    </div>
  );
}
