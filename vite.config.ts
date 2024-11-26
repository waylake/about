import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// 환경 변수 로드
dotenv.config();

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-spinners"], // CommonJS 모듈로 지정
  },
  define: {
    // 클라이언트에서 사용할 환경 변수 정의
    "process.env": {
      VITE_CONTENTFUL_SPACE_ID: process.env.VITE_CONTENTFUL_SPACE_ID,
      VITE_CONTENTFUL_ACCESS_TOKEN: process.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    },
  },
});
