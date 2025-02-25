"use client";
import useCalendar from "@/hooks/useCalendar";
import { subMonths } from "date-fns";
import { useState } from "react";

export default function Calender() {
  const calendar = useCalendar();
  const [select, setSelect] = useState<number[]>([]);
  
  return (
    <div>
      <button
        onClick={() => {
          calendar.setCurrentDate(subMonths(calendar.currentDate, 1));
        }}
      >
        &lt;
      </button>
      <strong>{calendar.currentDate.getMonth() + 1}</strong>
      <button
        onClick={() => {
          calendar.setCurrentDate(subMonths(calendar.currentDate, -1));
        }}
      >
        &gt;
      </button>
      <div>
        {calendar.weekCalendarList.map((item) => (
          <div className="flex px-20 w-full" key={Math.random()}>
            {item.map((day) => (
              <button
                onClick={() => {
                  const findItem = select.find((item) => item === day);
                  if (findItem) {
                    setSelect((prev) => prev.filter((item) => item !== day));
                  } else {
                    setSelect((prev) => [...prev, day]);
                  }
                }}
                className={`flex justify-between min-w-[calc(100%/7)] active:bg-blue-500 hover:bg-blue-400 items-center text-center ${
                  day === 0 ? " invisible" : ""
                }
                ${select.find((item) => item === day) ? " bg-blue-600" : ""}
                `}
                key={Math.random()}
              >
                {day}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
