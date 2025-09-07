import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FormFieldProps {
  id: string;
  label: string;
  type?: "input" | "textarea" | "input-with-icon";
  placeholder?: string;
  rows?: number;
  icon?: LucideIcon;
  error?: string;
  className?: string;
  register: any; // React Hook Form register
}

export function FormField({
  id,
  label,
  type = "input",
  placeholder,
  rows,
  icon: Icon,
  error,
  className,
  register,
}: FormFieldProps) {
  const hasError = !!error;
  const inputClassName = cn(
    hasError ? "border-red-500" : "",
    type === "input-with-icon" ? "pl-10" : "",
    className,
  );

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          rows={rows}
          {...register(id)}
          className={inputClassName}
        />
      ) : (
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          )}
          <Input
            id={id}
            placeholder={placeholder}
            {...register(id)}
            className={inputClassName}
          />
        </div>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
