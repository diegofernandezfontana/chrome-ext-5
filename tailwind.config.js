/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        container: "997",
        max: "9999",
      },
    },
  },
  plugins: [],
};
