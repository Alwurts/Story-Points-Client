import PageTitleBiOutline from "../text/PageTitleBiOutline";
import ColorButton from "../buttons/ColorButton";
import UsersLogged from "../display/UsersLogged";
import HorizontalSeparator from "../general/HorizontalSeparator";
import { RoomView } from "../../types/views";
import UserVotes from "../display/UserVotes";

const ResultRoom: React.FC<RoomView> = ({ room, user, socket }) => {
  if (!user || !room || !socket) return null;
  const isCreator = user?.id === room?.moderator.id;

  const usersVoted = Object.keys(room.votingSessionVotes).map((votedUserId) => {
    return {
      ...room.hasBeenActiveUser[votedUserId],
      vote: room.votingSessionVotes[votedUserId],
    };
  });
  return (
    <div className="fixed inset-0 flex h-screen flex-col items-center justify-start overflow-y-scroll pt-20 pb-28">
      <PageTitleBiOutline className="md:8xl mb-10 flex-col text-7xl">
        {room.topic.split(" ").join("@@")}
      </PageTitleBiOutline>
      {isCreator && (
        <ColorButton
          onClick={() => {
            socket.emit("room:finishresults", {
              roomId: room.id,
            });
          }}
          className=" bg-green-500"
        >
          Continue
        </ColorButton>
      )}
      {!isCreator && (
        <p className="text-center text-5xl font-black uppercase text-green-500">
          Waiting to continue...
        </p>
      )}
      <HorizontalSeparator className="my-14 px-3 sm:w-9/12 sm:px-10 md:w-6/12 lg:w-5/12" />
      <UserVotes users={usersVoted} />
    </div>
  );
};

export default ResultRoom;
