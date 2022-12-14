import classNames from "../../utils/className";
import Link from "next/link";
import { LinkHTMLAttributes } from "react";

const ColorButtonLink: React.FC<LinkHTMLAttributes<any>> = (props) => {
  return (
    <Link href={props.href}>
      <a
        {...props}
        className={classNames(
          props.className,
          "rounded-3xl border-2 border-black py-2 px-4 text-5xl font-medium text-black shadow-solid outline-2 outline-offset-4 outline-cyan-400 hover:bg-white active:translate-x-1 active:translate-y-1 active:shadow-solidclicked"
        )}
      >
        {props.children}
      </a>
    </Link>
  );
};

export default ColorButtonLink;
