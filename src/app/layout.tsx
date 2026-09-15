import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Zen Homestay Lâm Trường | Nghỉ dưỡng & Golf Sóc Sơn",
  description:
    "Zen Homestay Lâm Trường - nghỉ dưỡng tại Sóc Sơn kết hợp chơi golf tại các sân golf lân cận: Đồng Mô, Asean Onsen, Sky Lake.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
