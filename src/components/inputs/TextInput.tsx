import classNames from "../../utils/className";

interface FormBuilderRow {
  id: string;
  title: string;
  type?: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

const TextInput: React.FC<FormBuilderRow> = ({
  id,
  title,
  required,
  readOnly,
  type,
  disabled,
  defaultValue,
  placeholder,

  className,
}) => {
  return (
    <div
      className={classNames(
        className,
        "flex w-full flex-col items-center justify-center space-x-0 space-y-3 text-5xl font-black uppercase md:flex-row md:space-x-4 md:space-y-0 lg:text-5xl xl:text-6xl"
      )}
    >
      <label htmlFor={id} className="text-outline-sm text-white">
        {title}:
      </label>

      <input
        type={type !== "number" ? type : null}
        name={id}
        id={id}
        readOnly={readOnly}
        autoComplete={id}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full flex-1 border-b-4 border-black font-black uppercase text-cyan-400 outline-none placeholder:text-slate-300"
      />
    </div>
  );
};

export default TextInput;
