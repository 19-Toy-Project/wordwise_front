"use client";
import { Button } from "@/components/buttons";
import { levels } from "@/constants/pathname";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

const HomePage = () => {
  const router = useRouter();
  const [expand, setExpand] = useState<boolean>(false);

  // 버튼 클릭 핸들러
  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setExpand(true);
    setTimeout(() => {
      router.push(levels);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-center p-5">
      {/* 이미지 영역 */}
      <div
        className={`transition-all duration-1000 ease-in-out ${
          expand ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src="/english_conversation.png"
          width={1000}
          height={800}
          className="object-contain"
          alt="banner"
        />
      </div>

      {/* 텍스트 및 버튼 영역 */}
      <div
        className={`transition-all duration-1000 ease-in-out space-y-5 text-center ${
          expand ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="font-extrabold text-[#8BE5A6] text-6xl md:text-8xl text-center md:text-right transform translate-y-5 animate-fadeInUp delay-200">
          Let&apos;s
        </h1>
        <h1 className="font-extrabold text-black text-6xl md:text-8xl text-center md:text-right transform translate-y-5 animate-fadeInUp delay-400">
          speak
        </h1>
        <h1 className="font-extrabold text-[#FF70AB] text-6xl md:text-8xl text-center md:text-right transform translate-y-5 animate-fadeInUp delay-600">
          English
        </h1>

        <p>Start learning now!</p>
        <Button
          onClick={handleButtonClick}
          className="font-bold bg-black text-[#FFE486] rounded-full px-20 py-4 transform transition-all hover:animate-scaleInfinite"
        >
          JOIN NOW
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
