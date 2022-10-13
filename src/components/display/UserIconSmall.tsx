import { Fragment } from "react";
import { User } from "../../types/user";
import classNames from "../../utils/className";

const UserIconSmall: React.FC<User> = ({ userName, color }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        style={{ background: color }}
        className="h-8 w-8 rounded-full border-2 border-black shadow-solid outline-none"
      ></div>
      <span className="mt-2 pl-2 text-lg font-black uppercase">{userName}</span>
    </div>
  );
};

export default UserIconSmall;
