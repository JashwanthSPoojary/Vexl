import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormField({
  id,
  label,
  value,
  disabled = false,
  onChange,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-zinc-400">
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="bg-zinc-900 border-zinc-800 text-zinc-300"
      />
    </div>
  );
}
