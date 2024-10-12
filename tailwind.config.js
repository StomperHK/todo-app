/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      screens: {
        "max-1280": {"max": "1280px"}
      },
      spacing: {
        "1.5": "0.375rem",
        "2.5": "0.675rem",
        "5.5": "1.375rem"
      },
      fontFamily: {
        rubik: '"Rubik", serif',
        monospace: "Monospace"
      },
      boxShadow: {
        normal: "rgba(50, 50, 93, 0.25) 0px 25px 50px -20px, rgba(0, 0, 0, 0.3) 0px 15px 30px -30px;"
      },
      backgroundImage: {
        "peaks": "url(/src/assets/layered-peaks.svg) cover"
      },
    },
  },
  plugins: [],
}

