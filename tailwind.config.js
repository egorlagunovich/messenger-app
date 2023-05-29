/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBlue: "#1A77F2",
        navGrey: "#F7F8FA",
        homeGrey: "#F2F3F5",
      },
    },
  },
  plugins: [],
};
