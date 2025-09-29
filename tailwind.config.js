/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./**/*.{html,js}"
  ],
    
  safelist: ['scale-95', 'scale-100', 'opacity-0', 'opacity-100', 'hidden'],

  theme: {
    extend: {
      colors: {
        bg: "#f9fafb",
        text: "#003d4d",
        accent: "#00b8d9",
        themebtn: "#e6b800",
        "dark-bg": "#07293d",
        "card-bg": "#ffffff",
        "border-color": "#e1e8ee",
        "btn-bg": "#00b8d9",
        "btn-hover-bg": "#008891",
        "btn-text": "#ffffff",
        "nav-bg": "#142832",
      },


      keyframes: {
        rgb: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        slide: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(300%)" },
        },
      },
      animation: {
        "spin-once": "spin 0.5s linear",
        rgb: "rgb 6s linear infinite",
        slide: "slide 3s linear infinite",
      },
    },
  },
  plugins: [],
};
