/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      screens: {
        "max-1280": {"max": "1280px"},
        "max-1000": {"max": "1000px"},
        "max-700": {"max": "700px"},
        "max-580": {"max": "580px"},
        "max-520": {"max": "520px"},
        "max-430": {"max": "430px"}, 
        "max-380": {max: "430px"}
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
      transitionProperty: {
        "transition-transform-opacity": "transform opacity"
      }
    },
  },
  plugins: [],
}

