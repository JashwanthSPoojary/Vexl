import { subdomainSchema } from "@/lib/schemas/deploy-form";
import { useState } from "react";

export function useDomainEditor(
  initial: string,
  onUpdate?: (newDomain: string) => Promise<void>
) {
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState(initial);
  const [edited, setEdited] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEdit = () => {
    setIsEditing(true);
    setEdited(current);
    setError(null);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEdited(current);
    setError(null);
  };

  const save = async () => {
  const trimmed = edited.trim();
  if (trimmed === current) return cancelEdit();
  const result = subdomainSchema.safeParse(trimmed);
  if (!result.success) {
    setError(result.error.errors[0].message);
    return;
  }
  setLoading(true);
  setError(null);
  try {
    await onUpdate?.(trimmed);
    setCurrent(trimmed);
    cancelEdit();
  } catch (e: any) {
    const message = e?.message;
    if (message === "SUBDOMAIN_EXISTS") {
      setError("This subdomain is already in use.");
    } else {
      setError("Failed to update subdomain.");
    }
  } finally {
    setLoading(false);
  }
};


  return {
    isEditing,
    current,
    edited,
    error,
    loading,
    canSave: !!edited.trim() && !loading,
    setEdited,
    startEdit,
    cancelEdit,
    save,
  };
}
