"use client";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "x" as const, // 세로형 막대 그래프
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  scales: {
    y: {
      beginAtZero: true, // 0부터 시작
      max: 100, // ✅ 최대값을 100으로 고정
      ticks: {
        stepSize: 20,
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

type MajorProps = {
  type: string;
  totalScore: number;
  totalCount: number;
  average: number;
}[];

export default function Chart({ studies }: { studies: MajorProps }) {
  const labels = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "CONVERSATION"];

  const getDataByType = (key: keyof MajorProps[number]) => {
    return labels.map((label) => {
      const found = studies.find((study) => study.type === label);
      return found ? found[key] : 0;
    });
  };

  const data = {
    labels,
    datasets: [
      {
        label: "횟수",
        data: getDataByType("totalCount"),
        borderColor: "#8be5a6",
        backgroundColor: "rgba(99, 255, 107, 0.5)",
        tension: 0.1,
      },
      {
        label: "평균",
        data: getDataByType("average"),
        borderColor: "#ff70ab",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.1,
      },

      {
        label: "점수",
        data: getDataByType("totalScore"),
        borderColor: "#ffe486",
        backgroundColor: "rgba(255, 244, 95, 0.5)",
        tension: 0.1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
