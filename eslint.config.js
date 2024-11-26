import js from "@eslint/js";
import globals from "globals";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{ts,tsx}"],
  ignores: ["dist"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-refresh": reactRefresh,
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "off", // any 허용
    "@typescript-eslint/no-unsafe-assignment": "off", // any 타입 할당 허용
    "@typescript-eslint/no-unsafe-member-access": "off", // any 타입의 프로퍼티 접근 허용
    "@typescript-eslint/no-unsafe-call": "off", // any 타입의 함수 호출 허용
    "@typescript-eslint/no-unsafe-argument": "off", // any 타입의 인자 전달 허용
    "@typescript-eslint/no-unsafe-return": "off", // any 타입의 반환 허용
  },
});
