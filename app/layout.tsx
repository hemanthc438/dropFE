import type { Metadata } from "next";
import { Geist, Geist_Mono, Audiowide, Foldit, Orbitron } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/context/CursorProvider";
import CustomCursor from "./components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Custom Google Fonts
const audiowide = Audiowide({
  weight: "400", // Audiowide only has one weight
  variable: "--font-audiowide",
  subsets: ["latin"],
});

const foldit = Foldit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // All available weights
  variable: "--font-foldit",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  weight: ["400", "500", "600", "700", "800", "900"], // All available weights
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DropFE",
  description: "Your email drop solution",
  icons: {
    icon: '/dropfe-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${audiowide.variable} ${foldit.variable} ${orbitron.variable} antialiased`}
      >
        <CursorProvider>
          <CustomCursor />
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}
