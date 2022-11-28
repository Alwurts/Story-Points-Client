import logoSquare from "../../images/logo-square.svg";
import Image from "next/future/image";
import { FC, Fragment } from "react";

export interface LoaderConfig {
  show: boolean;
  message?: string;
}

interface LoaderProps {
  config: LoaderConfig;
}

const Loader: FC<LoaderProps> = ({ config }) => {
  const { show, message } = config;

  if (!show) return null;

  return (
    <div className="z-30">
      <div className="fixed top-0 flex h-screen w-screen items-center justify-center bg-slate-50"></div>
      <div className="fixed top-0 flex h-screen w-screen items-center justify-center bg-transparent">
        <div
          className="flex flex-col items-center justify-center"
          role="status"
        >
          <p className="text-outline -mt-1 animate-pulse text-6xl text-white  md:text-5xl">
            {message ? message : "Loading..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
