import React from "react";

export enum BrowserType {
  Safari = "Safari",
  Chrome = "Chrome"
}

export const getBrowserType = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf(BrowserType.Safari) > -1 && userAgent.indexOf(BrowserType.Chrome) > -1)
    return BrowserType.Chrome;
  else if (userAgent.indexOf(BrowserType.Safari)) return BrowserType.Safari;
};

export const isPhone = () => {
  const userAgent = navigator.userAgent;
  return /mobile/i.test(userAgent);
};
