"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import { Outfit } from "next/font/google";
// import Script from "next/script";
import PreloadTeamImages from "@/components/Team/PreloadTeamImages";

import "react-modal-video/css/modal-video.css";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          const theme = localStorage.getItem('theme') || 'light';
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        })();
      `,
    }}
  />
</head>

      <body className={`bg-[#FCFCFC] dark:bg-black ${outfit.className} antialiased`}>
        <Providers>
          <PreloadTeamImages />
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
