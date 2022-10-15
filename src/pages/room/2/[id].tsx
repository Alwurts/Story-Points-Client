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
import HorizontalSeparator from "../../../components/general/HorizontalSeparator";
import ColorButton from "../../../components/buttons/ColorButton";
import classNames from "../../../utils/className";

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

const RoomPage = () => {
  const isCreator = true;
  const [showConnectionDialog, setShowConnectionDialog] =
    useState<boolean>(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState<boolean>(false);
  const [pointSelection, setPointSelection] = useState(null);

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
      <div className="fixed inset-0 flex h-screen flex-col items-center justify-start overflow-y-scroll">
        <div className="flex w-full flex-col items-center justify-evenly px-2 pt-8 sm:flex-row">
          <PageTitleBiOutline
            className="mb-2 flex text-4xl sm:mb-0 sm:flex-col sm:text-5xl"
            outlineClassName="text-outline-sm text-white"
          >
            Room@@JIRA 101/HBGS
          </PageTitleBiOutline>
          <UsersLoggedSmall users={sampleUserData} />
        </div>
        <HorizontalSeparator className="my-8 px-5" />
        <span className="text-outline-sm mx-2 text-center text-5xl text-white">
          {pointSelection
            ? `Your selection: ${pointSelection}`
            : "Nothing selected"}
        </span>
        <div className="mt-14 flex w-full flex-wrap justify-center gap-x-4 gap-y-4 px-4 pb-32 sm:w-11/12 sm:px-10">
          {fibonnacciPoints.map((point) => (
            <ColorButton
              onClick={(e) => {
                console.log(point);
                setPointSelection((currentState) =>
                  currentState === point ? null : point
                );
              }}
              className={classNames(
                pointSelection === point
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
    </Layout>
  );
};

export default RoomPage;
