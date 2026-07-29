import type { Metadata } from "next";
import { Cormorant_Garamond, Be_Vietnam_Pro, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

const displayFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
});

const bodyFont = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const koreanFont = Noto_Sans_KR({
  variable: "--font-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zen Homestay Lâm Trường | Nghỉ dưỡng & Golf Ba Vì",
  description:
    "Zen Homestay Lâm Trường - nghỉ dưỡng tại Ba Vì kết hợp chơi golf tại các sân golf lân cận: Đồng Mô, Asean Onsen, Sky Lake.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${displayFont.variable} ${bodyFont.variable} ${koreanFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
