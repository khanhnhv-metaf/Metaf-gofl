import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GolfCourseDetail from "@/components/GolfCourseDetail";
import { translations } from "@/lib/translations";

const SLUGS = translations.vi.golfList.courses.map((c) => c.slug);

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const course = translations.vi.golfList.courses.find((c) => c.slug === slug);
  if (!course) return {};
  return {
    title: `${course.name} | Sân golf tại Hà Nội`,
    description: course.text,
  };
}

export default async function GolfCourseDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (!SLUGS.includes(slug)) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <GolfCourseDetail slug={slug} />
      </main>
      <SiteFooter />
    </div>
  );
}
