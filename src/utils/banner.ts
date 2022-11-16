import { NextRouter } from "next/router";
import { BannerConfig } from "../components/dialogs/ErrorBanner";

export const notifyAndRouterPush = (
  router: NextRouter,
  link: string,
  message: BannerConfig
) => {
  const encodedMessage = messageToJson(message);
  router.push(link + "?notify=" + encodedMessage);
};

export const notifySameRoute = (router: NextRouter, message: BannerConfig) => {
  const encodedMessage = messageToJson(message);
  router.replace({
    query: {
      ...router.query,
      notify: encodedMessage,
    },
  });
};

export const messageToJson = (message: BannerConfig) => {
  return JSON.stringify(message);
};

export const returnAndRemoveQueryParams = (router, paramToRemove) => {
  const { pathname, query } = router;
  let paramRemoved = query[paramToRemove];
  if (paramRemoved) {
    const params = new URLSearchParams(query);
    params.delete(paramToRemove);
    router.replace({ pathname, query: params.toString() }, undefined, {
      shallow: true,
    });
    //paramRemoved = JSON.parse(paramRemoved);
  }
  return paramRemoved;
};
