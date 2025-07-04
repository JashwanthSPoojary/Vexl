import { useState } from "react";

export function useEnvVars() {
  const [envVars, setEnvVars] = useState<{ key: string; value: string }[]>([]);
  const handleEnvChange = (
    index: number,
    field: "key" | "value",
    newValue: string
  ) => {
    setEnvVars((prev) => {
      const updated = [...prev];
      updated[index][field] = newValue;
      return updated;
    });
  };

  const addEnvVar = () =>
    setEnvVars((prev) => [...prev, { key: "", value: "" }]);

  const removeEnvVar = (index: number) =>
    setEnvVars((prev) => prev.filter((_, i) => i !== index));

  return {
    envVars,
    handleEnvChange,
    addEnvVar,
    removeEnvVar,
  };
}
