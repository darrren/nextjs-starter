/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next"
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google"
import { supportedLngs } from '@/i18n/settings'
import "@/app/globals.scss"

// COMPONENTS
import ClientProvider from "@/components/ClientProvider"

const notoSans = Noto_Sans_TC({
  subsets: ["latin"],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: "--font-noto-sans-tc",
})
const notoSerif = Noto_Serif_TC({
  subsets: ["latin"],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: "--font-noto-serif-tc",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export async function generateStaticParams() {
  return Array.from(supportedLngs.map((lang) => ({lang: lang}))) // [{ lang: "en" }, { lang: "tc" }]
}

type LayoutProps = {
  children: React.ReactNode;
  params: any;
};

export default async function RootLayout({
  children,
  params
}: LayoutProps) {
  const paramsValue = await params;

  if (typeof window === "undefined") {
    console.log("Server", paramsValue.lang)
  } else {
    console.log("Client", paramsValue.lang)
  }
  
  return (
    <html lang={paramsValue.lang} className={`${notoSans.variable} ${notoSerif.variable} antialiased`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}