import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atif Siddiqui — Senior Software Developer",
  description:
    "Full-stack engineer with 3.5+ years shipping production systems in React Native, Next.js, Node.js, Spring Boot, and .NET.",
  metadataBase: new URL("https://atifsiddiqui.dev"),
  openGraph: {
    title: "Atif Siddiqui — Senior Software Developer",
    description: "Systems built with intent. Shipped to last.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
