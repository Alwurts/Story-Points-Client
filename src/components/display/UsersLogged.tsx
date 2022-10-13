import { Fragment } from "react";
import { UserDisplay } from "../../types/user";
import UserIcon from "./UserIcon";

const UsersLogged: React.FC<UserDisplay> = ({ users }) => {
  return (
    <div className="flex w-full flex-col items-center justify-start space-y-10 md:w-8/12">
      <label className="text-outline-sm text-center text-5xl uppercase text-white">
        Users Joined:
      </label>
      <div className="grid grid-cols-2 gap-x-20 gap-y-7 md:gap-x-24">
        {users.map((user) => (
          <UserIcon userName={user.userName} color={user.color} id={user.id} />
        ))}
      </div>
      {/* <span className="text-outline-sm text-6xl uppercase text-black">+5</span> */}
    </div>
  );
};

export default UsersLogged;
