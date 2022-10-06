import Layout from "../../../components/Layout";
import ColorButtonLink from "../../../components/buttons/ColorButtonLink";
import PageTitleBiOutline from "../../../components/text/PageTitleBiOutline";
import ColorButton from "../../../components/buttons/ColorButton";
import UserIcon from "../../../components/display/UserIcon";
import UsersLogged from "../../../components/display/UsersLogged";
import HorizontalSeparator from "../../../components/general/HorizontalSeparator";
import { Dialog } from "@headlessui/react";
import { useRef, useState } from "react";
import { CogIcon, ShareIcon, XIcon } from "../../../components/icons";
import useAutosizeTextArea from "../../../components/hooks/useAutoSizeTextArea";
import ConnectionLink from "../../../components/general/ConnectionLink";
import ConnectionDialog from "../../../components/dialogs/ConnectionDialog";
import SettingsDialog from "../../../components/dialogs/SettingsDialog";
import VerticalSeparator from "../../../components/general/VerticalSeparator";
import CornerActions from "../../../components/buttons/CornerActions";

const RoomPage = () => {
  const isCreator = true;
  const [showConnectionDialog, setShowConnectionDialog] =
    useState<boolean>(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState<boolean>(false);

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
      <div className="fixed inset-0 flex h-screen flex-col items-center justify-start overflow-y-scroll py-20">
        <PageTitleBiOutline className="md:8xl mb-10 flex-col text-7xl">
          Room@@JIRA 101/HBGS
        </PageTitleBiOutline>

        <VerticalSeparator className="my-14" />
        <UsersLogged />
      </div>
    </Layout>
  );
};

export default RoomPage;
