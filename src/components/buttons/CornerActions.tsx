import Layout from "../../components/Layout";
import ColorButtonLink from "../../components/buttons/ColorButtonLink";
import PageTitleBiOutline from "../../components/text/PageTitleBiOutline";
import ColorButton from "../../components/buttons/ColorButton";
import UserIcon from "../../components/display/UserIcon";
import UsersLogged from "../../components/display/UsersLogged";
import HorizontalSeparator from "../../components/general/HorizontalSeparator";
import { Dialog } from "@headlessui/react";
import { useRef, useState } from "react";
import { CogIcon, ShareIcon, XIcon } from "../../components/icons";
import useAutosizeTextArea from "../../components/hooks/useAutoSizeTextArea";
import ConnectionLink from "../../components/general/ConnectionLink";
import ConnectionDialog from "../../components/dialogs/ConnectionDialog";
import SettingsDialog from "../../components/dialogs/SettingsDialog";

interface PropTypes {
  shareAction: () => void;
  settingsAction: () => void;
}

const CornerActions: React.FC<PropTypes> = ({
  settingsAction,
  shareAction,
}) => {
  return (
    <div className="fixed bottom-5 right-5 z-10 flex space-x-2 border-2 border-black bg-white p-2 shadow-solid lg:right-10">
      <button className="hover:text-cyan-400" onClick={() => shareAction()}>
        <ShareIcon className="h-12 md:h-14 lg:h-16" />
      </button>
      <button className="hover:text-cyan-400" onClick={() => settingsAction()}>
        <CogIcon className="h-12 md:h-14 lg:h-16" />
      </button>
    </div>
  );
};

export default CornerActions;
