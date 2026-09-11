import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GolfCourseDetail from "@/components/GolfCourseDetail";
import {
  getAllGolfCourseSlugs,
  getGolfCourseBySlug,
} from "@/lib/data/golf-courses";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllGolfCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const course = await getGolfCourseBySlug(slug);
  if (!course) return {};
  return {
    title: `${course.name_vi} | Sân golf tại Hà Nội`,
    description: course.text_vi,
  };
}

export default async function GolfCourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getGolfCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <GolfCourseDetail course={course} />
      </main>
      <SiteFooter />
    </div>
  );
}
