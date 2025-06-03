export function parseJsonToEnvRecord(
  data: unknown
): Record<string, string> {
  const result: Record<string, string> = {};

  if (typeof data !== "object" || data === null) {
    return result;
  }

  const obj = data as Record<string, unknown>;
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      result[key] = value;
    }
  }

  return result;
}
