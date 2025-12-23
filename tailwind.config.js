/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0F1A",
        card: "#121826",
        primary: "#8B5CF6", // purple
        accent: "#F97316",  // orange
        muted: "#9CA3AF"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: [],
};


