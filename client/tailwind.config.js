/** @format */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        desktop: "1440px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
