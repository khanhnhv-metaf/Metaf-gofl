import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GolfCourseList from "@/components/GolfCourseList";

export const metadata: Metadata = {
  title: "Sân golf tại Hà Nội | Zen Homestay Lâm Trường",
  description:
    "Danh sách giới thiệu các sân golf tiêu biểu tại khu vực Hà Nội: BRG Kings Island, BRG Legend Hill, Sky Lake, Asean Onsen, Vân Trì Golf Club.",
};

export default function GolfListPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <GolfCourseList />
      </main>
      <SiteFooter />
    </div>
  );
}
