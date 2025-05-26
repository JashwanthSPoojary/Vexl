import RepositoryImport from "@/components/pages/new/RepositoryImport";
import { authOptions } from "@/lib/authoptions";
import { getServerSession } from "next-auth";
const Page = async () => {
  const session = await getServerSession(authOptions);
  const access_token = session?.user.github_access_token;
  return <RepositoryImport access_token={access_token} />;
};
export default Page;
