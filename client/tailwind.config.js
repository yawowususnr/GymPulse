/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ECEEED",
        maroon: "#861F41",
        orange: "#E5751F",
        stone: "#75787b",
      },
    },
  },
  plugins: [],
};
