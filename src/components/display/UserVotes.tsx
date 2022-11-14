import { Fragment } from "react";
import { UserDisplay } from "../../types/user";
import ColorButton from "../buttons/ColorButton";
import UserIcon from "./UserIcon";

const UserVotes: React.FC<UserDisplay> = ({ users }) => {
  return (
    <div className="flex w-full flex-col items-center justify-start space-y-10 md:w-8/12">
      <label className="text-outline-sm text-center text-5xl uppercase text-white">
        Votes:
      </label>
      <div className="grid grid-cols-2 gap-x-10 gap-y-7 sm:gap-x-20 md:gap-x-24">
        {users.map((user, index) => (
          <div
            key={`${index}-${user.id}`}
            className="flex items-start space-x-6 outline-2 outline-offset-4 outline-cyan-400 focus:outline-2 focus:outline-offset-4 focus:outline-cyan-400 "
          >
            <UserIcon
              userName={user.userName}
              color={user.color}
              id={user.id}
            />
            <p
              className="rounded-lg border-2 border-black py-2 px-4 text-4xl font-semibold text-black shadow-solid"
              style={{ background: user.color }}
            >
              {user.vote}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserVotes;
