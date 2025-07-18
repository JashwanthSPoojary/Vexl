import { Globe, LayoutGrid, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";


export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <LayoutGrid className="fill-white"/>
          <span className="text-lg font-semibold">Vexl</span>
        </div>

        <Link
          href="/login"
          className="px-5 py-2 rounded-xl border border-current text-sm font-medium hover:opacity-80 transition"
        >
          Get Started
        </Link>
        <div className="flex flex-col items-center md:items-end gap-1 text-sm">
          <span className="font-medium">Built by Jashwanth S</span>
          <div className="flex gap-4 mt-1 text-lg">
            <Link
              href="https://x.com/JashwantPoojary"
              target="_blank"
              aria-label="Twitter"
            >
              <Twitter />
            </Link>
            <Link
              href="mailto:jaswanthspoojary@gmail.com"
              target="_blank"
              aria-label="Email"
            >
              <Mail />
            </Link>
            <Link
              href="https://jashwanth.me"
              target="_blank"
              aria-label="Portfolio"
            >
              <Globe />
            </Link>
            <Link
              href="https://www.linkedin.com/in/jashwanth-s-poojary/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
