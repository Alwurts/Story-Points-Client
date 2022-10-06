/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Roboto", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      keyframes: {
        clickshadow: {
          "0% 100%": { transform: "translateY(-25%)" },
          "50%": { transform: "translateY(0)" },
        },
      },
      animation: {
        clickshadow: "clickshadow 200ms ease-in-out",
      },
      boxShadow: {
        solid: "6px 6px 0px 0px rgba(0,0,0,1);",
        solidclicked: "2px 2px 0px 0px rgba(0,0,0,1);",
      },
    },
  },
  plugins: [],
};
