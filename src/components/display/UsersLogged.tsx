import { Fragment } from "react";
import UserIcon from "./UserIcon";

interface UsersLoggedProps {
  userName: string;
}

const UsersLogged: React.FC<any> = ({ userName }) => {
  return (
    <div className="flex w-full flex-col items-center justify-start space-y-10 md:w-8/12">
      <label className="text-outline-sm text-center text-5xl uppercase text-white">
        Users Joined:
      </label>
      <div className="grid grid-cols-2 gap-x-20 gap-y-7 md:gap-x-24">
        <UserIcon userName="You" color="bg-purple-500" />
        <UserIcon userName="Pedro" color="bg-yellow-400" />
        <UserIcon userName="Gerry" color="bg-red-500" />
        <UserIcon userName="You" color="bg-purple-500" />
        <UserIcon userName="Pedro" color="bg-yellow-400" />
        <UserIcon userName="Gerry" color="bg-red-500" />
        <UserIcon userName="You" color="bg-purple-500" />
        <UserIcon userName="Pedro" color="bg-yellow-400" />
      </div>
      {/* <span className="text-outline-sm text-6xl uppercase text-black">+5</span> */}
    </div>
  );
};

export default UsersLogged;
