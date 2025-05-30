import Settings from "@/components/pages/settings/Settings";
import { getProjectById } from "@/lib/helper/db";

export default async function Page({params}:{params:Promise<{workspace:string,project:string}>}) {
  const { workspace,project } = await params;
    const project_data = await getProjectById(workspace,project);
    if(!project_data){
      // change this
      return <div> no data available</div>
    }
  return (
    <Settings project_data={project_data}/>
  );
}