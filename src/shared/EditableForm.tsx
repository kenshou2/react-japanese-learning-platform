import CtaButton from "./CtaButton";

export interface FieldConfig<T> {
  key: keyof T;
  label: string;
  type?: string;
  disabled?: boolean;
}

interface EditableFormProps<T> {
  data: T;
  config: FieldConfig<T>[];
  editable: boolean;
  onChange: (updated: T) => void;
  onSubmit: () => void;
  className?: string;
}

export default function EditableForm<T extends Record<string, any>>({
  data,
  config,
  editable,
  onChange,
  onSubmit,
  className,
}: EditableFormProps<T>) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof T
  ) => {
    const { value } = e.target;
    onChange({ ...data, [key]: value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();        
      }}
      className={`flex flex-col gap-5 items-start w-[200px] sm:w-[300px] ${className ?? ""}`}
    >
      {config.map(({ key, label, type = "text", disabled }) => (
        <div key={String(key)} className="w-full flex flex-col gap-2">
          <label htmlFor={`${String(key)}-input`} className="text-2xl font-semibold">{label}</label>          
          <input
            type={type}
            id={`${String(key)}-input`}
            name={String(key)}
            value={data[key] as string}
            onChange={(e) => handleChange(e, key)}
            disabled={!editable || disabled}
            className={`${editable ? 'outline-2 outline-sakura' : 'bg-neutral-300 dark:bg-neutral-600'} w-full px-3 py-2 rounded-md`}
          />          
        </div>
      ))}      
        {editable ? (
            <CtaButton type="submit" borderRadius="7" customStyle={"self-end"}>Save</CtaButton>
        ) : (
            <CtaButton
            type="button"
            onClick={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            borderRadius="7" customStyle={"self-end"}>
            Update
            </CtaButton>
        )}      
    </form>
  );
}