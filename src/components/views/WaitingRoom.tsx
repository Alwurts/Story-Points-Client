import Layout from "../../components/Layout";
import PageTitleBiOutline from "../../components/text/PageTitleBiOutline";
import ColorButton from "../../components/buttons/ColorButton";
import UsersLogged from "../../components/display/UsersLogged";
import HorizontalSeparator from "../../components/general/HorizontalSeparator";
import { useEffect, useState } from "react";
import ConnectionDialog from "../../components/dialogs/ConnectionDialog";
import SettingsDialog from "../../components/dialogs/SettingsDialog";
import CornerActions from "../../components/buttons/CornerActions";
import { sampleUserData } from "../../utils/sample-data";
import { useRouter } from "next/router";
import socket from "../../utils/socket";
import { RoomView } from "../../types/views";

const WaitingRoom: React.FC<RoomView> = ({ room, user, socket }) => {
  if (!user || !room || !socket) return null;
  const isCreator = user?.id === room?.moderator.id;
  return (
    <div className="fixed inset-0 flex h-screen flex-col items-center justify-start overflow-y-scroll pt-20 pb-28">
      <PageTitleBiOutline className="md:8xl mb-10 flex-col text-7xl">
        {room.topic.split(" ").join("@@")}
      </PageTitleBiOutline>
      {isCreator && (
        <ColorButton
          onClick={() => {
            console.log("room:startvoting");
            socket.emit("room:startvoting", {
              roomId: room.id,
            });
          }}
          className=" bg-green-500"
        >
          Start
        </ColorButton>
      )}
      {!isCreator && (
        <p className="text-center text-5xl font-black uppercase text-green-500">
          Waiting to start...
        </p>
      )}
      <HorizontalSeparator className="my-14 px-3 sm:w-9/12 sm:px-10 md:w-6/12 lg:w-5/12" />
      <UsersLogged users={room.activeUsers} />
    </div>
  );
};

export default WaitingRoom;
