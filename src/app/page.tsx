import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Destination from "@/components/Destination";
import GolfCourses from "@/components/GolfCourses";
import Packages from "@/components/Packages";
import Faq from "@/components/Faq";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";
import { getFeaturedGolfCourses } from "@/lib/data/golf-courses";
import { getAllPackages } from "@/lib/data/packages";

export const revalidate = 3600;

export default async function Home() {
  const [courses, packages] = await Promise.all([
    getFeaturedGolfCourses(),
    getAllPackages(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <AboutUs />
        <Destination />
        <GolfCourses courses={courses} />
        <Packages items={packages} />
        <Faq />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
