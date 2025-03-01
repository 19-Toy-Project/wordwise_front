"use client";
import { useCookie } from "@/contexts/cookie.context";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useEffect, useState } from "react";
import Chart from "./_components/Chart";

export default function StudyPage() {
  const { cookie } = useCookie();
  const [studied, setStudied] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/users/score`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      const { data: study } = await response.json();
      setStudied(study.content);
    };
    fetchUser();
  }, [cookie]);

  return (
    <div>
      내가 학습한 문장 조회 차트
      <Chart studies={studied.length > 0 ? studied : []} />
    </div>
  );
}
