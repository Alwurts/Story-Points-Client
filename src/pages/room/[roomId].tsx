import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import ConnectionDialog from "../../components/dialogs/ConnectionDialog";
import SettingsDialog from "../../components/dialogs/SettingsDialog";
import CornerActions from "../../components/buttons/CornerActions";
import { useRouter } from "next/router";
import socket from "../../utils/socket";
import WaitingRoom from "../../components/views/WaitingRoom";
import { User } from "../../types/user";
import { Room } from "../../types/room";
import VotingRoom from "../../components/views/VotingRoom";
import axios from "axios";
import ResultRoom from "../../components/views/ResultRoom";

const RoomPage = () => {
  const [loggedUser, setLoggedUser] = useState<User>(null);
  const [room, setRoom] = useState<Room>(null);
  const [showConnectionDialog, setShowConnectionDialog] =
    useState<boolean>(true);
  const [showSettingsDialog, setShowSettingsDialog] = useState<boolean>(false);

  const router = useRouter();
  const { roomId } = router.query;

  useEffect(() => {
    if (roomId) {
      const validateRoom = async (roomToValidate) => {
        const { data: roomReturned }: { data: Room } = await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + "/api/room/validateroom",
          {
            roomId: roomToValidate,
          }
        );
        if (!roomReturned || roomReturned.state === "inactive") {
          router.push("/roomerror");
          return;
        }

        const userSaved: User = JSON.parse(localStorage.getItem("roomUser"));
        if (!userSaved) {
          router.push(`/joinroom/${roomId}`);
          return;
        }

        setLoggedUser(userSaved);
        socket.emit("room:join", {
          roomId: roomId,
          userId: userSaved.id, //get from local storage
        });
      };
      validateRoom(roomId);
    }
  }, [roomId]);

  useEffect(() => {
    if (room && room.moderator.id !== loggedUser.id) {
      setShowConnectionDialog(false);
    }
  }, [room]);

  useEffect(() => {
    socket.connect();

    socket.on("room:update", (receivedRoom: Room) => {
      setRoom(receivedRoom);
    });

    socket.on("room:redirect", (redirectUrl) => {
      router.push(redirectUrl);
    });

    return () => {
      socket.off("room:update");
      socket.off("room:redirect");
    };
  }, []);

  if (!loggedUser || !room) {
    return null;
  }

  const userIsVoting = room.votingSessionVotes[loggedUser.id] !== undefined;

  return (
    <Layout title="StoryMator">
      <ConnectionDialog
        showDialog={showConnectionDialog}
        roomId={room.id}
        setShowDialog={setShowConnectionDialog}
      />
      <SettingsDialog
        showDialog={showSettingsDialog}
        setShowDialog={setShowSettingsDialog}
      />
      <CornerActions
        shareAction={() => setShowConnectionDialog(true)}
        settingsAction={() => setShowSettingsDialog(true)}
      />
      {(room.state === "waiting" || !userIsVoting) && (
        <WaitingRoom room={room} user={loggedUser} socket={socket} />
      )}
      {room.state === "voting" && userIsVoting && (
        <VotingRoom socket={socket} room={room} user={loggedUser} />
      )}
      {room.state === "results" && userIsVoting && (
        <ResultRoom socket={socket} room={room} user={loggedUser} />
      )}
    </Layout>
  );
};

export default RoomPage;
