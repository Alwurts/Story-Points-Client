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

const RoomPage = () => {
  const isCreator = true;
  const [showConnectionDialog, setShowConnectionDialog] =
    useState<boolean>(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState<boolean>(false);

  const router = useRouter();
  const { roomId } = router.query;

  useEffect(() => {
    if (roomId) {
      const userSaved = JSON.parse(localStorage.getItem("roomUser"));
      socket.emit("room:join", {
        roomId: roomId,
        userId: userSaved.id, //get from local storage
      });
    }
  }, [router.query]);

  useEffect(() => {
    socket.on("room:joined", (room) => {
      console.log(room);
    });

    return () => {
      socket.off("room:joined");
    };
  }, []);

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
      <div className="fixed inset-0 flex h-screen flex-col items-center justify-start overflow-y-scroll pt-20 pb-28">
        <PageTitleBiOutline className="md:8xl mb-10 flex-col text-7xl">
          Room@@JIRA 101/HBGS
        </PageTitleBiOutline>
        {isCreator && (
          <ColorButton className=" bg-green-500">Start</ColorButton>
        )}
        {!isCreator && (
          <p className="text-center text-5xl font-black uppercase text-green-500">
            Waiting to start...
          </p>
        )}
        <HorizontalSeparator className="my-14 px-3 sm:w-9/12 sm:px-10 md:w-6/12 lg:w-5/12" />
        <UsersLogged users={sampleUserData} />
      </div>
    </Layout>
  );
};

export default RoomPage;
