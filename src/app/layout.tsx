import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RainbowProvider } from "@/providers/RainbowProvider";
import { NotificationProvider } from "@/contexts/NotificationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kuantum Token || Presale || ICO",
  description: "Join the Kuantum Token presale - Revolutionary blockchain technology with secure tokenomics and community-driven governance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RainbowProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </RainbowProvider>
      </body>
    </html>
  );
}
