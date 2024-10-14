/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/client/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#FF9D43",
      },
      backgroundImage: {
        main: "url('/background.png')",
      },
    },
  },
  plugins: [],
};
