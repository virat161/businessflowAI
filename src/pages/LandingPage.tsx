import Navbar from "@/components/common/Navbar";
import Hero from "@/components/common/Hero";
import Features from "@/components/common/Features";
import DashboardPreview from "@/components/common/DashboardPreview";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <DashboardPreview />
    </>
  );
}