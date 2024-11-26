const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.purple,
          DEFAULT: colors.purple[600],
        },
        secondary: {
          ...colors.pink,
          DEFAULT: colors.pink[500],
        },
        background: {
          light: "rgba(255, 255, 255, 0.1)",
          dark: "rgba(17, 24, 39, 0.8)",
          card: {
            light: "rgba(255, 255, 255, 0.7)",
            dark: "rgba(17, 24, 39, 0.7)",
          },
        },
        text: {
          base: {
            light: colors.gray[900],
            dark: colors.gray[100],
          },
          inverted: {
            light: colors.white,
            dark: colors.gray[900],
          },
          muted: {
            light: colors.gray[500],
            dark: colors.gray[400],
          },
        },
      },
      // 폰트 크기 시스템
      fontSize: {
        display: ["4rem", { lineHeight: "1.1", fontWeight: "700" }],
        h1: ["3rem", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["2.25rem", { lineHeight: "1.3", fontWeight: "600" }],
        h3: ["1.875rem", { lineHeight: "1.4", fontWeight: "600" }],
        h4: ["1.5rem", { lineHeight: "1.5", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        body: ["1rem", { lineHeight: "1.75" }],
        "body-sm": ["0.875rem", { lineHeight: "1.75" }],
      },
      // 트랜지션 설정
      transitionProperty: {
        colors: "background-color, border-color, color, fill, stroke",
        transform: "transform",
        opacity: "opacity",
        all: "all",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      // 애니메이션 설정
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      // 간격 시스템
      spacing: {
        section: "6rem",
        container: "2rem",
      },
      // 반지름 설정
      borderRadius: {
        card: "1rem",
        button: "0.5rem",
      },
      // 그림자 설정
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "card-hover":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".backdrop-blur-sm": {
          backdropFilter: "blur(4px)",
        },
        ".backdrop-blur": {
          backdropFilter: "blur(8px)",
        },
        ".backdrop-blur-lg": {
          backdropFilter: "blur(12px)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
