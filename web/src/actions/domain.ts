"use server"
import db from "@/lib/prisma";

export async function updateProjectSubdomain(
  old_name: string,
  new_name: string
) {
  const existing = await db.deployment.findFirst({
    where: { alternativeDeployUrl: new_name },
  });

  if (existing) {
    throw new Error("SUBDOMAIN_EXISTS"); 
  }

  await db.deployment.update({
    where: { deployUrl: old_name },
    data: { alternativeDeployUrl: new_name },
    select: { id: true },
  });

  return true;
}
