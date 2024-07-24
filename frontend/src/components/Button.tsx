import { MouseEventHandler } from "react";

interface IButton {
  children: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, disabled, onClick }: IButton) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="my-1 rounded border bg-green-300 px-5 py-2 text-xl font-semibold transition-all duration-200 hover:bg-green-400"
    >
      {children}
    </button>
  );
};

export default Button;
