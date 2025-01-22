"use client";
import { Button } from "@/components/buttons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";

/**
https://velog.io/@minseok_yun/npm%EC%97%90%EC%84%9C-pnpm%EC%9C%BC%EB%A1%9C-%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98%ED%95%98%EA%B8%B0
pnpm add : 패키지를 설치한다.
pnpm add -D : devDependencies에 추가한다.
pnpm install: 프로젝트의 모든 디펜던시를 설치한다.
pnpm remove : 패키지를 제거한다.
pnpm prune: 사용되지 않는 패키지를 의존성에서 제거한다.
 */

const HomePage = () => {
  const router = useRouter();
  const [expand, setExpand] = useState(false); // 버튼 클릭 후 상태 관리
  const [animate, setAnimate] = useState(false); // 애니메이션 상태

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const radiusRef = useRef(0); // 원의 반지름을 저장할 참조

  const drawCircle = (ctx: CanvasRenderingContext2D, radius: number) => {
    const canvas = canvasRef.current;
    if (canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
      ctx.beginPath();
      ctx.arc(canvas.width - 100, canvas.height / 2, radius, 0, Math.PI * 2); // 화면 오른쪽 중심에 원 그리기
      ctx.fillStyle = "white";
      ctx.fill();
    }
  };

  // 버튼 클릭 핸들러
  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setExpand(true);

    // 애니메이션 시작
    setAnimate(true);

    // 1초 후에 페이지 이동
    setTimeout(() => {
      router.push("/levels");
    }, 1000);

    // 애니메이션을 5초 동안 진행
    setTimeout(() => {
      setAnimate(false); // 애니메이션 끝
    }, 5000);
  };

  // 애니메이션 로직
  useEffect(() => {
    if (animate) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          let radius = radiusRef.current; // 초기 반지름
          const targetRadius = Math.max(canvas.width, canvas.height); // 화면의 최대 크기

          const animateCircle = () => {
            if (radius < targetRadius) {
              radius += 10; // 반지름 증가
              drawCircle(ctx, radius);
              requestAnimationFrame(animateCircle); // 계속 애니메이션 실행
            }
          };

          animateCircle(); // 애니메이션 시작
        }
      }
    }
  }, [animate]);

  // 초기화 및 resize 이벤트 핸들링
  useEffect(() => {
    // 캔버스 크기와 초기 원 상태 설정
    const initializeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          radiusRef.current = Math.min(canvas.width, canvas.height) * 0.5; // 초기 반지름
          drawCircle(ctx, radiusRef.current); // 초기 원 그리기
        }
      }
    };
    // 초기 캔버스 설정
    initializeCanvas();

    // resize 이벤트 핸들러 등록
    const handleResize = () => {
      initializeCanvas(); // 화면 크기 변화 시 캔버스 다시 설정
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 이벤트 제거
    };
  }, []);

  return (
    <div className="w-full bg-slate-100 overflow-hidden flex flex-col md:flex-row md:justify-between">
      {/* 이미지 영역 */}
      <div className="absolute top-1/2 left-0 flex justify-center items-center transition-all duration-1000">
        <Image
          src="/svg/Logo.svg"
          width={500}
          height={300}
          className="object-contain"
          alt="banner"
        />
      </div>

      {/* 텍스트 및 버튼 영역 */}
      <div className="transition-all duration-1000 ease-in-out space-y-4">
        <canvas
          className="transition-all duration-1000 ease-in-out"
          ref={canvasRef}
        ></canvas>

        <div
          className={`absolute right-0 top-1/2 transition-all duration-1000 ease-in-out space-y-5 ${
            expand ? "opacity-0" : "opacity-100"
          }`}
        >
          <h1 className="font-extrabold text-[#FFE486] text-right text-7xl sm:text-6xl md:text-7xl transform translate-y-5 animate-fadeInUp delay-200">
            Let&apos;s
          </h1>
          <h1 className="font-extrabold text-[#8BE5A6] text-right text-7xl sm:text-6xl md:text-7xl transform translate-y-5 animate-fadeInUp delay-400">
            speak
          </h1>
          <h1 className="font-extrabold text-[#FF70AB] text-right text-7xl sm:text-6xl md:text-7xl transform translate-y-5 animate-fadeInUp delay-600">
            in English!
          </h1>
          <div className="text-center">
            <Button
              onClick={handleButtonClick}
              className="font-bold bg-black text-white rounded-full p-4 transform transition-all hover:animate-scaleInfinite"
            >
              Learn Together
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
