import type { Metadata } from "next";
import { Oswald, Noto_Sans_Georgian, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";
import { Header } from "@/components/Header";

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  variable: "--font-noto-georgian",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Extreme Sports Hub Machakhela | Zipline, Karting & Adventure in Batumi",
  description: "Experience extreme adventures in Machakhela Valley, near Batumi. Zipline canyon flights, mountain karting, rope treetop parks, off-road ATV tours, and climbing. Safe thrill in Adjara, Georgia.",
  keywords: "zipline batumi, extreme sports batumi, adventure park batumi, маджахела экстрим, zipline machakhela, karting batumi, კვადროციკლები ბათუმი, ზიპლაინი ბათუმი, ექსტრემალური გართობა ბათუმი",
  openGraph: {
    title: "Extreme Sports Hub Machakhela | Batumi, Georgia",
    description: "Zipline canyon flights, mountain karting, rope treetop parks, off-road ATV tours, and climbing in Machakhela Valley.",
    url: "https://machakhela.ge",
    siteName: "Machakhela Hub",
    locale: "ka_GE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka" className={`${oswald.variable} ${notoGeorgian.variable} ${inter.variable}`}>
      <body className="antialiased text-text-offwhite bg-forest-deep">
        <LanguageProvider>
          <Header />
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
