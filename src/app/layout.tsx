import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Starfield } from "@/components/starfield";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atif Siddiqui — Senior Software Developer",
  description:
    "Full-stack engineer with 3.5+ years shipping production systems in React Native, Next.js, Node.js, Spring Boot, and .NET.",
  metadataBase: new URL("https://www.atifsid.in"),
  openGraph: {
    title: "Atif Siddiqui — Senior Software Developer",
    description: "Full-stack engineer. Mobile, web and backend.",
    type: "website",
  },
};

// Applies the saved theme before paint so there is no flash; dark is the default.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SmoothScroll />
        <Starfield />
        {children}
      </body>
    </html>
  );
}
