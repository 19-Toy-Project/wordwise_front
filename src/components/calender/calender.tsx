"use client";
import { useCookie } from "@/contexts/cookie.context";
import useCalendar from "@/hooks/useCalendar";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { subMonths } from "date-fns";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IconButton } from "../buttons";

export default function Calendar() {
  const calendar = useCalendar();
  const { cookie } = useCookie();
  const [schedules, setSchedules] = useState<string[]>([]);

  // 오늘 날짜
  const today = new Date();
  const todayFormatted = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchWithAuth(
        `${
          process.env.NEXT_PUBLIC_SERVICE_URL
        }/api/v2/users/calendar?year=${calendar.currentDate.getFullYear()}&month=${
          calendar.currentDate.getMonth() + 1
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      const { data } = await response.json();
      setSchedules(data);
    };
    fetchData();
  }, [calendar.currentDate, cookie]);

  return (
    <div className="text-center">
      <IconButton
        onClick={() =>
          calendar.setCurrentDate(subMonths(calendar.currentDate, 1))
        }
        icon={() => <FaAngleLeft color="black" size={20} />}
      />
      <strong>
        {calendar.currentDate.getFullYear()}년{" "}
        {calendar.currentDate.getMonth() + 1}월
      </strong>
      <IconButton
        onClick={() =>
          calendar.setCurrentDate(subMonths(calendar.currentDate, -1))
        }
        icon={() => <FaAngleRight color="black" size={20} />}
      />
      <div>
        {calendar.weekCalendarList.map((week, weekIndex) => (
          <div className="flex px-20 w-full" key={weekIndex}>
            {week.map(({ day, isCurrentMonth }, dayIndex) => {
              const formattedDate = `${calendar.currentDate.getFullYear()}-${String(
                calendar.currentDate.getMonth() + 1
              ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

              const isScheduled = schedules.includes(formattedDate);
              const isToday = formattedDate === todayFormatted; // 오늘 날짜 확인

              return (
                <button
                  key={`${weekIndex}-${dayIndex}`}
                  className={`flex justify-center min-w-[calc(100%/7)] items-center text-center p-2 rounded-md transition-colors duration-300 
                    ${isCurrentMonth ? "" : "invisible"} 
                    ${isScheduled ? "bg-background" : "bg-white"} 
                    ${isToday ? "text-mainColor font-bold" : ""}`} // 오늘 날짜면 테두리 추가
                >
                  {day}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
