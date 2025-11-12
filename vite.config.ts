import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 🔽 이 부분을 추가하세요 🔽
  // server: {
  //   proxy: {
  //     // 프론트에서 '/youtube'로 시작하는 요청을 감지
  //     "/youtube": {
  //       // 실제 백엔드 서버 주소로 요청을 전달
  //       target: "http://localhost:8000",
  //       // 호스트 헤더를 target으로 변경하여 백엔드가 출처를 'localhost:8000'으로 인식하게 함
  //       changeOrigin: true,
  //       // 보안 인증서 검사 비활성화 (개발 환경에 따라 필요)
  //       secure: false,
  //     },
  //   },
  // },
  // // 🔼 이 부분을 추가하세요 🔼
});
