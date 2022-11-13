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

const RoomPage = () => {
  const [loggedUser, setLoggedUser] = useState<User>(null);
  const [room, setRoom] = useState<Room>(null);
  const [showConnectionDialog, setShowConnectionDialog] =
    useState<boolean>(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState<boolean>(false);

  const router = useRouter();
  const { roomId } = router.query;

  useEffect(() => {
    if (roomId) {
      const userSaved: User = JSON.parse(localStorage.getItem("roomUser"));
      console.log("userSaved");
      console.log(userSaved);
      if (!userSaved) {
        router.push("/");
        return;
      }
      setLoggedUser(userSaved);
      socket.emit("room:join", {
        roomId: roomId,
        userId: userSaved.id, //get from local storage
      });
    }
  }, [router.query]);

  useEffect(() => {
    socket.connect();

    socket.on("room:update", (room: Room) => {
      console.log("room:update");
      console.log(room);
      setRoom(room);
    });

    return () => {
      socket.off("room:update");
    };
  }, []);

  if (!loggedUser || !room) {
    return null;
  }

  return (
    <Layout title="StoryMator">
      <ConnectionDialog
        showDialog={showConnectionDialog}
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
      {room.state === "waiting" && (
        <WaitingRoom room={room} user={loggedUser} socket={socket} />
      )}
      {room.state === "voting" && (
        <VotingRoom socket={socket} room={room} user={loggedUser} />
      )}
    </Layout>
  );
};

export default RoomPage;
