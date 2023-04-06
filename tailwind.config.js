module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        f2f2f2: "#f2f2f2",
        FFFFFB: "#FFFFFB",
        FAFAF5: "#FAFAF5",
        ececec: "#ececec",
      },
      boxShadow: {
        neumorphicBorder:
          "-10px -10px 15px rgba(255,255,255,0.55),10px 10px 15px rgba(70,70,70,0.12)",
        neumorphicBorderOver:
          "-5px -5px 10px rgba(255, 255, 255, 0.55), 5px 5px 10px rgba(70, 70, 70, 0.12), inset -2px -2px 4px rgba(255, 255, 255, 0.55), inset 2px 2px 4px rgba(70, 70, 70, 0.12)",
        neumorphicBorderActive:
          "-5px -5px 10px rgba(255, 255, 255, 0.55), 1px 1px 7px rgba(70, 70, 70, 0.12), inset -2px -2px 4px rgba(255, 255, 255, 0.55),inset 10px 10px 15px rgba(70,70,70,0.12)",
        neumorphicInput:
          "inset -10px -10px 15px rgba(255,255,255,0.55),inset 10px 10px 15px rgba(70,70,70,0.12)",
        neumorphicCard:
          "-5px -5px 10px rgba(255,255,255,0.75),5px 5px 10px rgba(70,70,70,0.12)",
        neumorphicCardOver:
          "-10px -10px 20px rgba(255,255,255,0.55),10px 10px 20px rgba(70,70,70,0.12)",
      },
    },
  },
  plugins: [],
};
