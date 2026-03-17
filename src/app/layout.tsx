import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adarsh Gupta | Software Engineer & Researcher",
  description:
    "Full-stack engineer building at the intersection of systems and scale. From embedded wildlife sensors to cloud-scale microservices.",
  keywords: [
    "Adarsh Gupta",
    "adarsh.gupta@iitg.ac.in",
    "iamadarshgupta8@gmail.com",
    "9650946587",
    "Software Engineer",
    "Full-Stack Developer",
    "IIT Guwahati",
    "Uber",
    "React",
    "Go",
    "TypeScript",
    "Machine Learning",
  ],
  authors: [{ name: "Adarsh Gupta" }],
  creator: "Adarsh Gupta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://coolsunflower.github.io",
    title: "Adarsh Gupta | Software Engineer & Researcher",
    description:
      "Full-stack engineer building at the intersection of systems and scale.",
    siteName: "Adarsh Gupta Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adarsh Gupta | Software Engineer & Researcher",
    description:
      "Full-stack engineer building at the intersection of systems and scale.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "unNDPeXEuzSXG0Pzubv33tlAr-Wx0ByBTqNVxQQrqCo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#050505] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
