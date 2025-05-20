import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { satoshi } from "../fonts/font";

const geistKarla = Karla({
  variable: "--font-geist-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnapCast",
  description: "A Screen Sharing App",
  icons: {
    icon: "/assets/icons/logo.svg",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistKarla.variable} ${satoshi.variable} font-karla bg-black text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
