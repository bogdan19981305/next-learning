import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {Providers} from "./providers";
import "./globals.css";
import Header from "@/components/ui/header";
import {siteConfig} from "@/config/site.config";
import {auth} from "@/auth/auth";
import {SessionProvider} from "next-auth/react";
import AppLoader from "@/hoc/app-loader";
import Title from "@/components/ui/title";

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
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <Providers>
          <SessionProvider session={session}>
            <AppLoader>
              <main className="dark text-foreground bg-background">
                <Header />
                <Title />
                {children}
                <footer>
                  <div className="text-center text-sm text-gray-500 py-4">
                    © {new Date().getFullYear()} {siteConfig.title}. All rights
                    reserved.
                  </div>
                </footer>
              </main>
            </AppLoader>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
