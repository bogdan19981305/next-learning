import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {Providers} from "./providers";
import "./globals.css";
import Header from "@/components/ui/header";
import {siteConfig} from "@/config/site.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
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
      <Providers>
        <Header />
        {children}
          <footer>
            <div className="text-center text-sm text-gray-500 py-4">
              © {new Date().getFullYear()} {siteConfig.title}. All rights reserved.
            </div>
          </footer>
      </Providers>
      </body>
    </html>
  );
}
