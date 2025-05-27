import ClientPage from "@/components/pages/deployments/ClientPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const build_id = (await params).id;

  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full max-w-4xl space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold mb-1">Build Logs</h1>
          <p className="text-muted-foreground text-sm mb-4">
            Live streaming logs from your deployment
          </p>

          <Link href="/" >
            <Button className="cursor-pointer">
              Continue to Dashboard
            </Button>
          </Link>
        </div>

        <ClientPage buildId={build_id} />
      </div>
    </div>
  );
}
