/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4DB6AC",
        secondary: "#7986CB",
        accent: "#FDD835",
        background: "#F9FAFB",
      },
    },
  },
  plugins: [],
};
