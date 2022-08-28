/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import classNames from "../utils/className";
import ProfileDropdown from "./buttons/ProfileDropdown";
import NotificationButton from "./buttons/NotificationButton";
import MenuButton from "./buttons/MenuButton";
import logoSquare from "../images/logo-square.svg";
import logoLarge from "../images/logo-large.png";
import Image from "next/future/image";
import { useRouter } from "next/router";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t-2 bg-slate-50 py-5">
      <div className="flex items-center justify-center">
        <Image
          className="block h-8 w-auto"
          src={logoSquare}
          alt="Picture of the author"
        />
      </div>
    </footer>
  );
};
export default Footer;
