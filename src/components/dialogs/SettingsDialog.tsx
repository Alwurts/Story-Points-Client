import { Dialog } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import { XIcon } from "../icons";
import ConnectionLink from "../general/ConnectionLink";
import ColorButton from "../buttons/ColorButton";
import socket from "../../utils/socket";
import { User } from "../../types/user";
import { Room } from "../../types/room";

interface PropTypes {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  user: User;
  room: Room;
}

const SettingsDialog: React.FC<PropTypes> = ({
  showDialog,
  setShowDialog,
  user,
  room,
}) => {
  const [confirmation, setConfirmation] = useState({
    title: "Continue",
    show: false,
    onYes: null,
  });

  const resetDialog = () => {
    setShowDialog(false);
    hideConfirmation();
  };

  const hideConfirmation = () => {
    setConfirmation((confirmationNow) => {
      return { ...confirmationNow, show: false };
    });
  };

  const showConfirmation = (title: string, onYes: () => void) => {
    setConfirmation({ title: title, show: true, onYes: onYes });
  };

  const isModerator = room.moderator.id === user.id;

  return (
    <Dialog
      open={showDialog}
      onClose={() => resetDialog()}
      className="fixed inset-0 z-10 flex h-screen items-center justify-center"
    >
      <Dialog.Panel className="z-10 mx-2 flex w-full flex-col items-center border-4 border-black bg-white py-10 px-4 shadow-solid sm:w-[400px] sm:p-10">
        {!confirmation.show ? (
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
              className="mt-5 bg-blue-500 text-2xl font-bold"
              onClick={() =>
                showConfirmation("Exit room?", () =>
                  socket.emit("room:exit", {
                    roomId: room.id,
                    userId: user.id,
                  })
                )
              }
            >
              Exit the Room
            </ColorButton>
            {isModerator && (
              <ColorButton
                className="mt-5 bg-red-500 text-2xl font-bold"
                onClick={() =>
                  showConfirmation("Close Room?", () =>
                    socket.emit("room:close", {
                      roomId: room.id,
                      userId: user.id,
                    })
                  )
                }
              >
                Close the room
              </ColorButton>
            )}
          </Fragment>
        ) : (
          <ConfirmatioDialog
            title={confirmation.title}
            onYes={confirmation.onYes}
            hideConfirmation={() => hideConfirmation()}
          />
        )}
      </Dialog.Panel>
      <div className="fixed inset-0 bg-slate-500 bg-opacity-50" />
    </Dialog>
  );
};

const ConfirmatioDialog = ({ title, onYes, hideConfirmation }) => {
  return (
    <Fragment>
      <div className="flex w-full justify-center space-x-4">
        <Dialog.Title className="text-center text-4xl font-black uppercase">
          {title}
        </Dialog.Title>
      </div>
      <div className="flex space-x-5">
        <ColorButton
          className="mt-5 bg-red-500 text-2xl font-bold"
          onClick={onYes}
        >
          Yes
        </ColorButton>
        <ColorButton
          className="mt-5 bg-cyan-500 text-2xl font-bold"
          onClick={hideConfirmation}
        >
          Cancel
        </ColorButton>
      </div>
    </Fragment>
  );
};

export default SettingsDialog;
