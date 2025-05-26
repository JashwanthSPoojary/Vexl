// app/[workspace]/[projectName]/page.tsx
import db from "@/lib/prisma";
import Link from "next/link";

type Props = {
  params: {
    workspace: string;
    projectName: string;
  };
};

export default async function ProjectPage({ params }: Props) {
  const deployment = await db.deployment.findFirst({
    where: {
      workspaceSlug: params.workspace,
      projectName: params.projectName,
    },
    orderBy: { createdAt: "desc" },
  });

  if (!deployment) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Project Not Found</h1>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">{deployment.projectName}</h1>
      <p className="text-gray-600">Status: <strong>{deployment.status}</strong></p>

      {deployment.deployUrl && deployment.status === "success" && (
        <Link
          href={deployment.deployUrl}
          target="_blank"
          className="text-blue-600 underline"
        >
          🔗 View Live Site
        </Link>
      )}
    </div>
  );
}
