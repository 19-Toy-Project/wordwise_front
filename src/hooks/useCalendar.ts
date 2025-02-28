import { getDaysInMonth } from "date-fns";
import React from "react";

const DAY_OF_WEEK = 7;
const DEFAULT_TRASH_VALUE = 0;
const useCalendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const totalMonthDays = getDaysInMonth(currentDate); // 이번 달의 총 일수
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay(); // 이번 달의 첫 번째 요일

  // const prevMonthDate = subMonths(currentDate, 1);
  //const totalPrevMonthDays = getDaysInMonth(prevMonthDate); // 이전 달의 총 일수

  // 이전 달에서 가져와야 할 날짜 개수
  const prevDayList = Array.from({ length: firstDayOfMonth }).map(() => ({
    day: DEFAULT_TRASH_VALUE, //totalPrevMonthDays - firstDayOfMonth + i + 1,
    isCurrentMonth: false,
  }));

  // 이번 달의 날짜 리스트
  const currentDayList = Array.from({ length: totalMonthDays }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: true,
  }));

  // 다음 달의 날짜 리스트 (총 6주를 유지하기 위함)
  const remainingDays =
    (prevDayList.length + currentDayList.length) % DAY_OF_WEEK;
  const nextDayList = Array.from({
    length: remainingDays ? DAY_OF_WEEK - remainingDays : 0,
  }).map(() => ({
    day: DEFAULT_TRASH_VALUE, //i + 1,
    isCurrentMonth: false,
  }));

  const currentCalendarList = [
    ...prevDayList,
    ...currentDayList,
    ...nextDayList,
  ];
  const weekCalendarList = currentCalendarList.reduce(
    (acc: { day: number; isCurrentMonth: boolean }[][], cur, idx) => {
      const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
      if (!acc[chunkIndex]) acc[chunkIndex] = [];
      acc[chunkIndex].push(cur);
      return acc;
    },
    []
  );

  return {
    weekCalendarList,
    currentDate,
    setCurrentDate,
  };
};

export default useCalendar;
