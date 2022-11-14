import PageTitleBiOutline from "../../components/text/PageTitleBiOutline";
import UsersLoggedSmall from "../../components/display/UsersLoggedSmall";
import { sampleUserData } from "../../utils/sample-data";
import HorizontalSeparator from "../../components/general/HorizontalSeparator";
import ColorButton from "../../components/buttons/ColorButton";
import classNames from "../../utils/className";
import { RoomView } from "../../types/views";
import { useEffect, useState } from "react";

const fibonnacciPoints = [
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "21",
  "34",
  "55",
  "89",
];

const VotingRoom: React.FC<RoomView> = ({ room, user, socket }) => {
  if (!user || !room) return null;

  const isCreator = user?.id === room?.moderator.id;
  const allUsersVoted =
    -1 ===
    Object.keys(room.votingSessionVotes).findIndex((votingUserId) => {
      const votingUserIsActive =
        -1 !==
        room.activeUsers.findIndex(
          (activeUser) => activeUser.id === votingUserId
        );
      if (votingUserIsActive) {
        return room.votingSessionVotes[votingUserId] === null;
      }
    });

  const [userSelection, setUserSelection] = useState<string>(
    room.votingSessionVotes[user.id]
  );

  useEffect(() => {
    setUserSelection(room.votingSessionVotes[user.id]);
  }, [room.votingSessionVotes[user.id]]);

  return (
    <div className="fixed inset-0 flex h-screen flex-col items-center justify-start overflow-y-scroll">
      <div className="flex w-full flex-col items-center justify-evenly px-2 pt-8 sm:flex-row">
        <PageTitleBiOutline
          className="mb-2 flex text-4xl sm:mb-0 sm:flex-col sm:text-5xl"
          outlineClassName="text-outline-sm text-white"
        >
          {room.topic.split(" ").join("@@")}
        </PageTitleBiOutline>
        <UsersLoggedSmall users={room.activeUsers} />
      </div>
      <p className="mt-10 text-center text-4xl font-black uppercase text-green-500">
        {allUsersVoted
          ? "All users voted"
          : userSelection
          ? "Waiting for other users selection..."
          : "Waiting for your selection"}
      </p>
      {isCreator && (
        <ColorButton
          onClick={() => {
            socket.emit("room:finishvoting", {
              roomId: room.id,
            });
          }}
          disabled={!allUsersVoted}
          className="mt-7 bg-green-500 text-3xl"
        >
          Show results
        </ColorButton>
      )}
      <HorizontalSeparator className="my-8 px-5" />
      <span className="text-outline-sm mx-2 text-center text-5xl text-white">
        {userSelection
          ? `Your selection: ${userSelection}`
          : "Nothing selected, please make a selection"}
      </span>
      <div className="mt-14 flex w-full flex-wrap justify-center gap-x-4 gap-y-4 px-4 pb-32 sm:w-11/12 sm:px-10">
        {fibonnacciPoints.map((point, index) => (
          <ColorButton
            key={`${index}-${point}`}
            onClick={() => {
              const newSelection = userSelection === point ? null : point;
              setUserSelection(newSelection);
              socket.emit("room:vote", {
                roomId: room.id,
                userId: user.id,
                vote: newSelection,
              });
            }}
            className={classNames(
              userSelection === point
                ? "bg-yellow-400 hover:bg-yellow-400"
                : "bg-white hover:bg-yellow-300 focus:bg-white",
              "rounded-lg focus:outline-2 focus:outline-offset-4 focus:outline-cyan-400"
            )}
          >
            {point}
          </ColorButton>
        ))}
      </div>
    </div>
  );
};

export default VotingRoom;
