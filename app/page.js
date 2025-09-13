import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import StaffSection from "./components/StaffSection";
import NewsSectionDynamic from "./components/NewsSection-Dynamic";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen text-slate-900 bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))]">
      <NavBar />
      <HeroSection />
      <NewsSectionDynamic />
      <ServicesSection />
      <AboutSection />
      <StaffSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
