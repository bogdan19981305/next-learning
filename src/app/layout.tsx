import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {Providers} from "./providers";
import "./globals.css";
import Header from "@/components/ui/header";
import {siteConfig} from "@/config/site.config";
import {auth} from "@/auth/auth";
import {SessionProvider} from "next-auth/react";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Providers>
          <SessionProvider session={session}>
            <Header />
            {children}
              <footer>
                <div className="text-center text-sm text-gray-500 py-4">
                  © {new Date().getFullYear()} {siteConfig.title}. All rights reserved.
                </div>
              </footer>
          </SessionProvider>
      </Providers>
      </body>
    </html>
  );
}
