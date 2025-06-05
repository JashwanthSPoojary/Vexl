import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDeploymentBySubdomain(subdomain: string) {
  return prisma.deployment.findFirst({
    where: { alternativeDeployUrl: subdomain },
    select: { deployUrl: true },
  });
}

export default prisma;
