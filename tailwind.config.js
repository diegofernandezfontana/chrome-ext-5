/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        container: "1200",
        max: "1201",
      },
    },
  },
  plugins: [],
};
