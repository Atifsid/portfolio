import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#030304",
          raised: "#0b0b0f",
          line: "#1c1c22",
        },
        mist: {
          DEFAULT: "#a7a7b4",
          dim: "#6f6f7c",
        },
        glow: {
          blue: "#3d5afe",
          violet: "#8b5cf6",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        label: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        aurora:
          "radial-gradient(60% 50% at 70% 0%, rgba(61,90,254,0.35) 0%, rgba(61,90,254,0) 60%), radial-gradient(45% 40% at 20% 10%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0) 65%)",
      },
    },
  },
  plugins: [],
};

export default config;
