import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ExclamationTriangle, SaveIcon, XIcon } from "../icons";
import ConnectionLink from "../general/ConnectionLink";
import { useRouter } from "next/router";
import { returnAndRemoveQueryParams } from "../../utils/banner";

export interface BannerConfig {
  messageType: "success" | "error" | "warning";
  message: string;
  bannerOpen?: boolean;
}

const ErrorBanner: React.FC = () => {
  const [bannerConfig, setBannerConfig] = useState<BannerConfig>({
    messageType: "success",
    message: "Success",
    bannerOpen: false,
  });

  const closeBanner = () => {
    setBannerConfig((bannerConfig) => {
      return { ...bannerConfig, bannerOpen: false };
    });
  };

  const { messageType, message, bannerOpen } = bannerConfig;

  const router = useRouter();

  useEffect(() => {
    const notify = returnAndRemoveQueryParams(router, "notify");
    if (notify) {
      const { message, messageType } = JSON.parse(notify);
      setBannerConfig((bannerConfig) => {
        return {
          ...bannerConfig,
          message,
          messageType,
          bannerOpen: true,
        };
      });
    }
  }, [router, router.query]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      closeBanner();
    }, 4000);
    return () => {
      clearTimeout(timeId);
    };
  }, [bannerOpen]);

  let primaryColor;
  let primaryColorText;
  let secondaryColor;

  switch (messageType) {
    case "success":
      primaryColor = "bg-green-700";
      primaryColorText = "text-green-700";
      secondaryColor = "bg-green-800";
      break;
    case "error":
      primaryColor = "bg-red-500";
      primaryColorText = "text-red-800";
      secondaryColor = "bg-red-700";
      break;
    default:
      primaryColor = "bg-green-700";
      primaryColorText = "text-green-700";
      secondaryColor = "bg-green-800";
      break;
  }

  return (
    <Transition
      appear={true}
      as="div"
      className={`${primaryColor} fixed top-0 right-0 z-30 m-6 max-w-full rounded-lg border-2 border-black py-2 px-4 text-4xl font-semibold text-black shadow-solid`}
      show={bannerOpen}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-150"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className="flex flex-wrap items-center justify-between px-3 py-3">
        <div className="flex flex-1 items-center">
          <p className="ml-3 font-medium text-white">
            <span className="">{message}</span>
          </p>
        </div>
        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
          <button
            type="button"
            onClick={closeBanner}
            className={`-mr-1 flex rounded-md p-2 hover:${secondaryColor} focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2`}
          >
            <span className="sr-only">Dismiss</span>
            <XIcon
              className="h-10 w-10 font-black text-white"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </Transition>
  );
};

export default ErrorBanner;
