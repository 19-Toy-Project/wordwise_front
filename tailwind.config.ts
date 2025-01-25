import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeInUp: "fadeInUp 1.5s ease-in-out forwards", // fadeInUp 애니메이션 정의
        scaleInfinite: "scaleInfinite 1s infinite", // scaleInfinite 애니메이션 정의
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleInfinite: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mainColor: "var(--mainColor)",
        subColor: "var(--subColor)",
      },
    },
  },
  plugins: [],
} satisfies Config;
