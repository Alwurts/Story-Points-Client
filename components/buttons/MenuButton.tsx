import React from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "../icons";

interface PropTypes {
  open: boolean;
}

const MenuButton: React.FC<PropTypes> = ({ open }) => {
  return (
    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black hover:outline-none hover:ring-2 hover:ring-inset hover:ring-black">
      <span className="sr-only">Open main menu</span>
      {open ? (
        <XIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
      )}
    </Disclosure.Button>
  );
};

export default MenuButton;
