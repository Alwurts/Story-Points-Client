import { useState } from "react";
import useAutosizeTextArea from "../hooks/useAutoSizeTextArea";
import { CheckIcon, LinkIcon } from "../icons";
import { Transition } from "@headlessui/react";

interface TitleProps {
  className?: string;
  connectionLink: string;
}

const ConnectionLink: React.FC<TitleProps> = ({
  className,
  connectionLink,
}) => {
  const [linkValue, setLinkValue] = useState<string>(connectionLink);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);

  let linkCopiedTimer;

  const copyLinkToClipboard = (linkValue: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(linkValue);
      setLinkCopied(true);
      if (!linkCopiedTimer) {
        linkCopiedTimer = setTimeout(() => {
          setLinkCopied(false);
          clearTimeout(this);
        }, 1600);
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center space-x-2 ">
      <span className="mr-12 select-all break-all text-center outline-none">
        {linkValue}
      </span>
      <button
        className="absolute right-0"
        onClick={() => copyLinkToClipboard(linkValue)}
        title="Copy Link"
      >
        {linkCopied && <CheckIcon className="h-10 w-10 hover:text-cyan-400" />}
        <Transition
          show={!linkCopied}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <LinkIcon className="h-10 w-10 hover:text-cyan-400" />
        </Transition>
      </button>
    </div>
  );
};

export default ConnectionLink;
