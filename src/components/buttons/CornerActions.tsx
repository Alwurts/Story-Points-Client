import { CogIcon, ShareIcon, XIcon } from "../../components/icons";

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
        <ShareIcon className="h-12 md:h-14" />
      </button>
      <button className="hover:text-cyan-400" onClick={() => settingsAction()}>
        <CogIcon className="h-12 md:h-14" />
      </button>
    </div>
  );
};

export default CornerActions;
