import { Button } from "@/components/buttons";
import {
  advanced,
  beginner,
  conversation,
  intermediate,
} from "@/constants/pathname";

export default function LevelPage() {
  return (
    <div className="wrapper">
      <h2>원하시는 레벨을 선택해주세요 !</h2>
      <div className="grid grid-cols-2 grid-rows-2 gap-5">
        <Button href={beginner}>Beginner : 초급</Button>
        <Button href={intermediate}>Intermediate : 중급</Button>
        <Button href={advanced}>Advanced : 고급</Button>
        <Button href={conversation}>Conversation : 회화</Button>
      </div>
    </div>
  );
}
