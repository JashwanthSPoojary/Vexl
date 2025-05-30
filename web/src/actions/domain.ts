"use server";
import db from "@/lib/prisma";

export async function isDomainUnique(name: string) {
  const existing = await db.deployment.findFirst({
    where: { alternativeDeployUrl: name },
    select: { id: true },
  });
  return !existing;
}
export async function updateProjectSubdomain(
  old_name: string,
  new_name: string
) {
  try {
    await db.deployment.update({
      where: { deployUrl: old_name },
      data: { alternativeDeployUrl: new_name },
      select: { id: true },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
