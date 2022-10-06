import { Fragment } from "react";
import classNames from "../../utils/className";

interface UserIconProps {
  userName: string;
  color: string;
}

const UserIcon: React.FC<UserIconProps> = ({ userName, color }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={classNames(
          color,
          "h-16 w-16 rounded-full border-2 border-black shadow-solid outline-none"
        )}
      ></div>
      <span className="mt-1 pl-2 text-3xl font-black uppercase">
        {userName}
      </span>
    </div>
  );
};

export default UserIcon;
