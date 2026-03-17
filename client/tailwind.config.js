/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff7f8",
          100: "#ffeef2",
          200: "#ffdbe4",
          300: "#ffc3d2",
          400: "#ff9bb4",
          500: "#f77798",
        },
        rosewood: "#5b2d39",
        champagne: "#f5e6cc",
        ink: "#24181d",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        sans: ['"Manrope"', "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 173, 197, 0.22)",
        card: "0 25px 80px rgba(44, 21, 30, 0.18)",
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.16) 0, transparent 28%), radial-gradient(circle at 80% 0%, rgba(255,215,186,0.22) 0, transparent 30%), radial-gradient(circle at 0% 100%, rgba(255,174,201,0.18) 0, transparent 34%)",
      },
      animation: {
        float: "float 10s ease-in-out infinite",
        drift: "drift 18s linear infinite alternate",
        pulseSoft: "pulseSoft 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        drift: {
          "0%": { transform: "scale(1) translate3d(0, 0, 0)" },
          "100%": { transform: "scale(1.08) translate3d(18px, -12px, 0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.9" },
        },
      },
    },
  },
  plugins: [],
};
