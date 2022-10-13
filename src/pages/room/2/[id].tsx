import Layout from "../../../components/Layout";
import PageTitleBiOutline from "../../../components/text/PageTitleBiOutline";
import { useState } from "react";
import ConnectionDialog from "../../../components/dialogs/ConnectionDialog";
import SettingsDialog from "../../../components/dialogs/SettingsDialog";
import VerticalSeparator from "../../../components/general/VerticalSeparator";
import CornerActions from "../../../components/buttons/CornerActions";
import UsersLoggedSmall from "../../../components/display/UsersLoggedSmall";
import { uuidv4 } from "../../../utils/crypto";
import { getRandomTailwindColor } from "../../../utils/colorGenerator";
import { sampleUserData } from "../../../utils/sample-data";

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
      <div className="fixed inset-0 flex h-screen flex-col items-stretch justify-start">
        <div className="flex items-center justify-evenly pt-10">
          <PageTitleBiOutline
            className="flex-col text-5xl"
            outlineClassName="text-outline-sm text-white"
          >
            Room@@JIRA 101/HBGS
          </PageTitleBiOutline>
          <UsersLoggedSmall users={sampleUserData} />
        </div>
      </div>
    </Layout>
  );
};

export default RoomPage;
