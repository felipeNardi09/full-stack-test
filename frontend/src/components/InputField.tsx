import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";

interface IInput {
  labelText: string;
  name: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  options?: FieldOptions;
  error?:
    | string
    | FieldError
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}
interface FieldOptions {
  required: boolean;
}

const InputField = ({
  labelText,
  type,
  register,
  name,
  options,
  error,
}: IInput) => {
  return (
    <div>
      <label className="mb-1 block text-xl font-semibold text-gray-900">
        <span>{labelText}</span>
      </label>
      <input
        {...register(name, options)}
        className="text-md block w-full rounded-lg border border-black bg-slate-100 p-2.5 text-gray-900"
        type={type}
      />
      {error && <p>{error as string}</p>}
    </div>
  );
};

export default InputField;
