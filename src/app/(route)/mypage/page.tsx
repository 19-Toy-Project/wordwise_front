import Calender from "@/components/calender/calender";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { cookies } from "next/headers";

export default async function UserPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v2/users/learned-sentences/count`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const { data: studiedSentence } = await response.json();

  return (
    <div>
      <div className="border border-background rounded-md p-5">
        <p className="font-bold">공부한 문장 개수</p>
        <p>{studiedSentence.studySentenceCount}개</p>
      </div>
      <Calender />
    </div>
  );
}
