import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";
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
  registerInput?: UseFormRegister<any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
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
  registerInput,
  className,
  error,
}) => {
  return (
    <div className="items- flex w-full flex-col">
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
          //required={required}
          {...(registerInput
            ? {
                ...registerInput(id, {
                  required: required,
                }),
              }
            : {})}
          className={classNames(
            error ? "border-red-600" : "border-black",
            "w-full flex-1 border-b-4 font-black uppercase text-cyan-400 outline-none placeholder:text-slate-300"
          )}
        />
      </div>
      <span className="mt-1 w-full text-center text-3xl font-black uppercase text-red-500">
        {error && (error.message ? error.message : "Required")}
      </span>
    </div>
  );
};

export default TextInput;
