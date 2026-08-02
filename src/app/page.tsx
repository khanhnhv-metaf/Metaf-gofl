import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Destination from "@/components/Destination";
import GolfCourses from "@/components/GolfCourses";
import Packages from "@/components/Packages";
import Faq from "@/components/Faq";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <AboutUs />
        <Destination />
        <GolfCourses />
        <Packages />
        <Faq />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
