import type { Metadata } from "next";
import { Kode_Mono } from 'next/font/google';
import { Climate_Crisis } from 'next/font/google';
import localFont from "next/font/local";


import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const kodeMono = Kode_Mono({
  variable: "--font-kode-mono",
  subsets: ["latin"],
  weight: ['400', '700'],
  display: 'swap',
});

const climateCrisis = Climate_Crisis({
  variable: "--font-climate-crisis",
  subsets: ["latin"],
  display: 'swap',
});


const MSOutline = localFont({
  src: [
    { path: "./fonts/MSOutline.otf", weight: "700" },
  ],
  variable: "--font-ms-outline",
});

export const metadata: Metadata = {
  title: "Green Pill by Laylow",
  description: "Site vitrine concept pour le prochain album de Laylow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${climateCrisis.variable} ${MSOutline.variable} ${kodeMono.variable} antialiased overflow-y-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
