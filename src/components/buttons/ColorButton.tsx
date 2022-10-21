import classNames from "../../utils/className";
import Link from "next/link";
import { ButtonHTMLAttributes, LinkHTMLAttributes } from "react";
import ArrowPath from "../icons/ArrowPath";

interface ColorButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  actionIsLoading?: boolean;
}

const ColorButton: React.FC<ColorButton> = (props) => {
  return (
    <button
      disabled={props.disabled ?? props.actionIsLoading}
      className={classNames(
        props.disabled || props.actionIsLoading
          ? "bg-slate-500"
          : "hover:bg-white active:translate-x-1 active:translate-y-1 active:shadow-solidclicked",
        props.className,
        "rounded-3xl border-2 border-black py-2 px-4 text-5xl font-medium text-black shadow-solid outline-2 outline-offset-4 outline-cyan-400"
      )}
    >
      {!props.actionIsLoading ? (
        props.children
      ) : (
        <ArrowPath className="my-1 mx-10 h-10 w-10 animate-spin" />
      )}
    </button>
  );
};

export default ColorButton;
