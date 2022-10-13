import { FC } from "react";
import { User } from "../../types/user";
import classNames from "../../utils/className";

const UserIcon: FC<User> = ({ userName, color }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        style={{ background: color }}
        className="h-16 w-16 rounded-full border-2 border-black shadow-solid outline-none"
      ></div>
      <span className="mt-1 pl-2 text-3xl font-black uppercase">
        {userName}
      </span>
    </div>
  );
};

export default UserIcon;
