import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import { Ripple } from "@/components/magicui/ripple";
import HeroVideoDialogDemoTopInBottomOut from "./HeroVideoDialogDemoTopInBottomOut";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { Particles } from "@/components/magicui/particles";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { Globe } from "@/components/magicui/globe";
import Footer from "./Footer";
import HostingFeatureGrid from "./HostingFeatureGrid";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full bg-[var(--vexl-black)] text-[var(--vexl-white)] antialiased">
      <Particles className="absolute inset-0 z-0" />
      <Navbar />
      <ScrollProgress className="top-[70px]" />

      <div className="relative w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-[190px]">
        <Ripple />
        <HeroSection />
      </div>
      <div className="relative w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-[190px]">
        <HeroVideoDialogDemoTopInBottomOut />
      </div>
      <div className="relative w-full max-w-[1680px] mx-auto rounded-3xl p-10 overflow-hidden">
        <VelocityScroll
          defaultVelocity={1}
          className="bg-[var(--vexl-black)] text-[var(--vexl-white)]"
        >
          From GitHub to Live — Instantly
        </VelocityScroll>
      </div>
      <div className="relative w-full max-w-[1380px] mx-auto px-12 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-[190px]">
        <HostingFeatureGrid/>
      </div>
      <div className="pt-24 relative w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-[190px]">
        <Footer />
      </div>
      <div className="relative h-[300px] w-full max-w-[1680px] mx-auto rounded-3xl p-10 overflow-hidden">
        <Globe />
      </div>
    </div>
  );
}
