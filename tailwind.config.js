/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          pink: "#F8BBD0",
          coral: "#F06292",
          blue: "#4FC3F7",
          mint: "#81C784",
        },
        text: {
          dark: "#1F2937",
          gray: "#6B7280",
        },
        bg: {
          main: "#F3F4F6",
          card: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
