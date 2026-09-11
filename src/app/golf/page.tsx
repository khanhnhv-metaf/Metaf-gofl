import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GolfCourseList from "@/components/GolfCourseList";
import { getAllGolfCourses } from "@/lib/data/golf-courses";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sân golf tại Hà Nội | Zen Homestay Lâm Trường",
  description:
    "Danh sách giới thiệu các sân golf tiêu biểu tại khu vực Hà Nội: BRG Kings Island, BRG Legend Hill, Sky Lake, Asean Onsen, Vân Trì Golf Club.",
};

export default async function GolfListPage() {
  const courses = await getAllGolfCourses();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <GolfCourseList courses={courses} />
      </main>
      <SiteFooter />
    </div>
  );
}
