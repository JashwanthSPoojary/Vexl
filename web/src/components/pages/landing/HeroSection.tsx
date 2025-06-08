import Link from "next/link";
import { RainbowButton } from "@/components/magicui/rainbow-button";

export default function HeroSection() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto text-center sm:text-left">
        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight font-mono">
          Deploy React<br />
          Projects Instantly<br />
          with Vexl
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto sm:mx-0">
          Ship production-grade React apps with one click. Automatic builds,{" "}
          <span className="underline underline-offset-4 decoration-white/30">
            global CDN
          </span>
          ,{" "}
          <span className="underline underline-offset-4 decoration-white/30">
            GitHub integration
          </span>
          , and{" "}
          <span className="underline underline-offset-4 decoration-white/30">
            custom domains
          </span>
          —all powered by Vexl.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center sm:justify-start">
          <Link href="/login">
            <RainbowButton>Deploy Your App</RainbowButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
