import { z } from "zod";

export const deployFormSchema = z.object({
  name: z
    .string()
    .min(2, "Project name is required")
    .regex(/^[a-zA-Z0-9-_]+$/, "Only letters, numbers, dashes, and underscores allowed"),
  envVars: z
    .array(
      z.object({
        key: z.string().min(1, "Key is required"),
        value: z.string(),
      })
    )
    .optional(),
});
export const subdomainSchema = z
  .string()
  .min(3, "Subdomain must be at least 3 characters")
  .max(63, "Subdomain must be less than 63 characters")
  .regex(
    /^[a-z0-9]+(?:[-][a-z0-9]+)*$/,
    "Only lowercase letters, numbers, and hyphens (no leading or trailing hyphen)"
);

