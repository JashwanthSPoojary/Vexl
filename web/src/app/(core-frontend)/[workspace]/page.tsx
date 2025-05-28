import ProjectDashboard from "@/components/pages/workspace/ProjectDashboard";

export default async function Page({params}:{params:Promise<{workspace:string}>}) {
    const workspace = (await params).workspace;
    return (
        <ProjectDashboard workspace={workspace} />
    );
}