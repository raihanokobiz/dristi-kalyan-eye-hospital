import type { Metadata } from "next";
import "./globals.css";
import { lato } from "./font";
import NextTopLoader from "nextjs-toploader";
import { LanguageProvider } from "@/context/LanguageContext";


export const metadata: Metadata = {
  title: "Dhamrai Dristi Kalyan Eye Hospital ",
  description: "Best Eye Hospital in Dhamrai, Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased `}>
        <NextTopLoader showSpinner={false} color="#1e6a39" />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
