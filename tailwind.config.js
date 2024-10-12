/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      spacing: {
        "5.5": "1.375rem"
      }
    },
  },
  plugins: [],
}

