/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./editor.html",
    "./signin.html",
    "./courses.html",
    "./errors/*.html",
    "./css-course/*.html",
    "./html-course/*.html",
    "./mongo-course/*.html",
    "./nodexpress-course/*.html",
    "./js-course/*.html",
    "./python-course/*.html",
    "./react-course/*.html",
    "./git-course/*.html",
    "./mysql-course/*.html",
    "./quiz/*.html",
    "./assets/js/*.js"
  ],
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
