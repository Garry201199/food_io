module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        Cormorant: ["Cormorant", "sans-serif"],
        Pop: ["Poppins", "sans-serif"],
      },
      colors: {
        textColor: "#101010",
        activeText: "#D6230A",
        gradientBg: "rgba(116, 249, 105,0.4)",
        whiteAlpha: "rgba(255,255,255,0.2)",
        bgSpan:"rgba( 66, 66, 66, 0.65 )",
        cardColor: "#f5f5f5",
        cartBg: "#282a2c",
        cartItem: "#2e3033",
        cartTotal: "#343739",
      },
    },

    
  },
  plugins: [require("daisyui")],
}