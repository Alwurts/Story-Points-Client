import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { XIcon } from "../../components/icons";
import ConnectionLink from "../../components/general/ConnectionLink";

interface PropTypes {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const ConnectionDialog: React.FC<PropTypes> = ({
  showDialog,
  setShowDialog,
}) => {
  return (
    <Dialog
      open={showDialog}
      onClose={() => setShowDialog(false)}
      className="fixed inset-0 z-10 flex h-screen items-center justify-center"
    >
      <Dialog.Panel className="z-10 mx-2 flex w-full flex-col items-center border-4 border-black bg-white py-10 px-4 shadow-solid sm:w-auto sm:p-10">
        <div className="flex w-full justify-center space-x-2">
          <Dialog.Title className="text-center text-4xl font-black uppercase">
            Share Room
          </Dialog.Title>

          <button
            className="h-10 hover:text-cyan-400"
            title="Close dialog"
            onClick={() => setShowDialog(false)}
          >
            <XIcon className="h-10 w-10" />
          </button>
        </div>
        <Dialog.Description className="mt-3 text-center font-medium uppercase">
          Copy and share this link to allow others to join
        </Dialog.Description>
        <div className="mt-3 flex w-full flex-col items-center justify-center text-xl sm:text-2xl">
          <p className="font-bold">Invite link: </p>
          <ConnectionLink connectionLink="storymator.alwurts.com/room/1dsaw" />
        </div>
      </Dialog.Panel>
      <div className="fixed inset-0 bg-slate-500 bg-opacity-50" />
    </Dialog>
  );
};

export default ConnectionDialog;
