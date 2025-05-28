import { ProjectViewSwitcher } from "@/components/pages/project/ProjectViewSwitcher";

export default async function ProjectLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ workspace: string; project: string }>;
}>) {
  const { workspace, project } = await params;
  return (
    <div className="flex flex-col h-full bg-background px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <ProjectViewSwitcher workspace={workspace} project={project} />
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </div>
  );
}
