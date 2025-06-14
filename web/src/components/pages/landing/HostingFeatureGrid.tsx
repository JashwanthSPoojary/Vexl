"use client"
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Cloud, Lock, GitBranch, ServerCrash, Rocket } from "lucide-react";

export default function HostingFeatureGrid() {
  return (
    <BentoGrid className="lg:grid-rows-3 pt-14">
  {/* Top half of "Isolated Build Containers" */}
  <BentoCard
    name="Isolated Containers"
    description="Each deployment runs in its own clean Docker container."
    Icon={ServerCrash}
    background={<div className="h-full w-full" />} // optional background
    className="lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3 bg-[var(--vexl-black)] text-[var(--vexl-white)] border border-[var(--vexl-white)]"
  />

  {/* Bottom half of "Isolated Build Containers" */}
  <BentoCard
    name="Reproducible & Sandboxed"
    description="No side effects between builds. Fully reproducible and isolated."
    Icon={ServerCrash}
    background={<div className="h-full w-full" />} // optional background
    className="lg:row-start-2 lg:row-end-4 lg:col-start-2 lg:col-end-3 bg-[var(--vexl-black)] text-[var(--vexl-white)] border border-[var(--vexl-white)]"
  />

  {/* Other Cards (unchanged) */}
  <BentoCard
    name="Live Build Logs"
    description="Build logs are streamed in real-time from the container to your dashboard via Server-Sent Events."
    Icon={GitBranch}
    background={<div className="h-full w-full" />}
    className="lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 bg-[var(--vexl-black)] text-[var(--vexl-white)] border border-[var(--vexl-white)]"
  />

  <BentoCard
    name="Redis Job Queue"
    description="All build jobs are managed in a Redis queue. Handles concurrency and retries automatically under load."
    Icon={Rocket}
    background={<div className="h-full w-full" />}
    className="lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4 bg-[var(--vexl-black)] text-[var(--vexl-white)] border border-[var(--vexl-white)]"
  />

  <BentoCard
    name="Auto HTTPS with Let's Encrypt"
    description="Every custom domain is automatically secured with SSL. No extra steps."
    Icon={Lock}
    background={<div className="h-full w-full" />}
    className="lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2 bg-[var(--vexl-black)] text-[var(--vexl-white)] border border-[var(--vexl-white)]"
  />

  <BentoCard
    name="Global CDN & Object Storage"
    description="Your build outputs are pushed to DigitalOcean Spaces and served globally via an Edge CDN. Fast, reliable, and instantly accessible with zero config."
    Icon={Cloud}
    background={<div className="h-full w-full" />}
    className="lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4 bg-[var(--vexl-black)] text-[var(--vexl-white)] border border-[var(--vexl-white)]"
  />
</BentoGrid>

  );
}
