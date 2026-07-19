import Navbar from "@/components/common/Navbar";
import Hero from "@/components/common/Hero";
import Features from "@/components/common/Features";
import DashboardPreview from "@/components/common/DashboardPreview";
import HowItWorks from "@/components/common/HowItWorks";
import Cta from "@/components/common/Cta";
import Footer from "@/components/common/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <DashboardPreview />
      <HowItWorks/>
      <Cta/>
      <Footer/>
    </>
  );
}