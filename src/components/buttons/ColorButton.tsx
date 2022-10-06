import classNames from "../../utils/className";
import Link from "next/link";
import { ButtonHTMLAttributes, LinkHTMLAttributes } from "react";

const ColorButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button
      {...props}
      className={classNames(
        props.className,
        "rounded-3xl border-2 border-black py-2 px-4 text-5xl font-medium text-black shadow-solid outline-none hover:bg-white active:translate-x-1 active:translate-y-1 active:shadow-solidclicked"
      )}
    >
      {props.children}
    </button>
  );
};

export default ColorButton;
