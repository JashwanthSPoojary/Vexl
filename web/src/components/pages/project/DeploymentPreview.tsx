import Image from "next/image";
import Link from "next/link";

export function DeploymentPreview({ subdomain }: { subdomain: string | null }) {
  const domain = process.env.NEXT_PUBLIC_DEPLOY_DOMAIN ?? "localhost:3002";
  const url = `http://${subdomain}.${domain}`;
  return (
    <div className="flex-1 bg-muted/30 rounded-lg border border-border overflow-hidden cursor-pointer hover:shadow-md transition">
      <div className="relative w-full h-64 sm:h-80 lg:h-[400px]">
        {/* change this */}
        <Link href={url} aria-label="View deployment preview" target="_blank">
          <Image
            src="https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Deployment preview"
            fill
            className="object-cover"
          />
        </Link>
      </div>
    </div>
  );
}
