import Calender from "@/components/calender/calender";
import { useCookie } from "@/contexts/cookie.context";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useEffect, useState } from "react";

export default function UserPage() {
  const { cookie } = useCookie();
  const [studied, setStudied] = useState<number>(0);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v2/users/learned-sentences/count`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      const { data: studiedSentence } = await response.json();
      setStudied(studiedSentence.studySentenceCount);
    };
    fetchUser();
  }, [cookie]);
  return (
    <div>
      <div className="border border-background rounded-md p-5">
        <p className="font-bold">공부한 문장 개수</p>
        <p>{studied}개</p>
      </div>
      <Calender />
    </div>
  );
}
