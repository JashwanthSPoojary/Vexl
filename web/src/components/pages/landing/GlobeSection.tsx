"use client"
import dynamic from "next/dynamic";

const Globe = dynamic(() =>
  import("@/components/magicui/globe").then(mod => mod.Globe)
);
export default function GLobeSection() {
    return <Globe/>
}