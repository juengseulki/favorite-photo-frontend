import HeroSection from "@/features/landing/components/HeroSection";
import PointSection from "@/features/landing/components/PointSection";
import NotificationSection from "@/features/landing/components/NotificationSection";
import RandomBoxSection from "@/features/landing/components/RandomBoxSection";
import CTASection from "@/features/landing/components/CTASection";
import LandingRedirect from "@/components/common/LandingRedirect";

export default function HomePage() {
  return (
    <main className="bg-black">
      <LandingRedirect />
      <HeroSection />
      <PointSection />
      <NotificationSection />
      <RandomBoxSection />
      <CTASection />
    </main>
  );
}
