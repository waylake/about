import { createClient } from "contentful";

// 서버 환경에서 환경 변수 가져오기
const client = createClient({
  space: process.env.VITE_CONTENTFUL_SPACE_ID || "", // 서버에서 환경 변수 로드
  accessToken: process.env.VITE_CONTENTFUL_ACCESS_TOKEN || "",
});

export default client;
