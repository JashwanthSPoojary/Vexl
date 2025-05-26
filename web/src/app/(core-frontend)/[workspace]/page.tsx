import ProjectDashboard from "@/components/pages/workspace/ProjectDashboard";

export default async function Page({params}:{params:Promise<{workspace:string}>}) {
    
    return (
        <ProjectDashboard />
    );
}