import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';
// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif']
      },
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
        "blue-to-transparent": "linear-gradient(90deg, rgba(11, 96, 176, 0.17) 5.99%, rgba(11, 96, 176, 0.00) 83.92%)",
      },
      colors: {
        brand: {
          "darkblue": {
            DEFAULT: "#0B60B0",
            10: "#0B60B010",
            5: '#0B60B005'
          },
          "white": {
            DEFAULT: "#FFFFFF",
            60: "#FFFFFF60",
            80: "#FFFFFF80",
            10: "#FFFFFF10"
          },
          "black": "#000000",
          "lightblack": "#51697F",
          "blackblue": "#0A142F",
          "red": "#DC5436"
        }
      },
      screens: {
        ...defaultTheme.screens,
        "msm": "0px"
      }
    },
  },
  plugins: [],
};
export default config;
