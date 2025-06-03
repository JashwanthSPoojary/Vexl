import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface EnvVarRowProps {
  index: number;
  env: { key: string; value: string };
  onChange: (index: number, field: "key" | "value", value: string) => void;
  onRemove: (index: number) => void;
  disabled?: boolean;
}

export default function EnvVarRow({
  index,
  env,
  onChange,
  onRemove,
  disabled,
}: EnvVarRowProps) {
  return (
     <div className="flex items-center gap-2 w-full sm:w-[28rem] max-w-full">
      <Input
        placeholder="KEY"
        value={env.key}
        onChange={(e) => onChange(index, "key", e.target.value)}
        disabled={disabled}
        className="!bg-background flex-1"
      />
      <Input
        placeholder="value"
        value={env.value}
        onChange={(e) => onChange(index, "value", e.target.value)}
        disabled={disabled}
        className="!bg-background flex-1"
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => onRemove(index)}
        disabled={disabled}
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}
