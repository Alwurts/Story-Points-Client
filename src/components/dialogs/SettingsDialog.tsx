import { Dialog } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import { XIcon } from "../icons";
import ConnectionLink from "../general/ConnectionLink";
import ColorButton from "../buttons/ColorButton";

interface PropTypes {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const SettingsDialog: React.FC<PropTypes> = ({ showDialog, setShowDialog }) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const resetDialog = () => {
    setShowDialog(false);
    setShowConfirmation(false);
  };

  return (
    <Dialog
      open={showDialog}
      onClose={() => resetDialog()}
      className="fixed inset-0 z-10 flex h-screen items-center justify-center"
    >
      <Dialog.Panel className="z-10 mx-2 flex w-full flex-col items-center border-4 border-black bg-white py-10 px-4 shadow-solid sm:w-[400px] sm:p-10">
        {!showConfirmation ? (
          <Fragment>
            <div className="flex w-full justify-center space-x-4">
              <Dialog.Title className="text-center text-4xl font-black uppercase">
                Settings
              </Dialog.Title>

              <button
                className="h-10 hover:text-cyan-400"
                title="Close dialog"
                onClick={() => setShowDialog(false)}
              >
                <XIcon className="h-10 w-10" />
              </button>
            </div>
            <ColorButton
              className="mt-5 bg-red-500 text-2xl font-bold"
              onClick={() => setShowConfirmation(true)}
            >
              Close Room
            </ColorButton>
          </Fragment>
        ) : (
          <Fragment>
            <div className="flex w-full justify-center space-x-4">
              <Dialog.Title className="text-center text-4xl font-black uppercase">
                Close Room?
              </Dialog.Title>
            </div>
            <div className="flex space-x-5">
              <ColorButton
                className="mt-5 bg-red-500 text-2xl font-bold"
                onClick={() => resetDialog()}
              >
                Yes
              </ColorButton>
              <ColorButton
                className="mt-5 bg-cyan-500 text-2xl font-bold"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </ColorButton>
            </div>
          </Fragment>
        )}
      </Dialog.Panel>
      <div className="fixed inset-0 bg-slate-500 bg-opacity-50" />
    </Dialog>
  );
};

export default SettingsDialog;
