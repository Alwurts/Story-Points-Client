import React, { MouseEventHandler } from "react";
import { BellIcon } from "../icons";

interface PropTypes {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const NotificationButton: React.FC<PropTypes> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full p-1 text-stone-900 hover:text-white hover:bg-orange-400"
    >
      <span className="sr-only">View notifications</span>
      <BellIcon className="h-6 w-6" />
    </button>
  );
};

export default NotificationButton;
