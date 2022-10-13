import { FC } from "react";
import { User, UserDisplay } from "../../types/user";
import { sampleUserData } from "../../utils/sample-data";
import ColorButton from "../buttons/ColorButton";
import UserIcon from "./UserIcon";
import UserIconSmall from "./UserIconSmall";

const UsersLoggedSmall: FC<UserDisplay> = ({ users }) => {
  return (
    <div className="flex flex-col items-start justify-start space-y-2">
      <label className="text-outline-sm ml-3 text-center text-3xl uppercase text-white">
        Users Joined:
      </label>
      <div className="flex items-center">
        {users.slice(0, 4).map((user, index) => (
          <UserIconSmall
            userName={user.userName}
            color={user.color}
            id={user.id}
          />
        ))}
        {users.length > 4 && (
          <ColorButton className="hover:bg ml-5 mb-2 flex flex-col items-center bg-green-500 px-2 py-1">
            <span className="text-center text-3xl font-black uppercase ">
              {`+${users.length - 4}`}
            </span>
            <span className="-mt-1 text-center text-lg font-black uppercase ">
              See all
            </span>
          </ColorButton>
        )}
      </div>
    </div>
  );
};

export default UsersLoggedSmall;
