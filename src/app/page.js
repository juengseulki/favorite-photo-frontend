import HeroSection from "@/features/landing/components/HeroSection";
import PointSection from "@/features/landing/components/PointSection";
import NotificationSection from "@/features/landing/components/NotificationSection";
import RandomBoxSection from "@/features/landing/components/RandomBoxSection";
import CTASection from "@/features/landing/components/CTASection";

export default function HomePage() {
  return (
    <main className="bg-black">
      <HeroSection />
      <PointSection />
      <NotificationSection />
      <RandomBoxSection />
      <CTASection />
    </main>
  );
}
