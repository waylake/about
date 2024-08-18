const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.purple,
        secondary: colors.pink,
        background: {
          light: "rgba(255, 255, 255, 0.1)",
          dark: "rgba(17, 24, 39, 0.8)",
        },
      },
      textColor: {
        base: colors.gray[100],
        inverted: colors.white,
      },
      transitionProperty: {
        colors: "background-color, border-color, color, fill, stroke",
      },
    },
  },
  plugins: [],
};
