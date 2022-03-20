import { useState } from "react";

const useScreenSize = (): [number, number] => {
  const minWidth = 200;
  const minHeight = 500;
  // const setWidth = () => (window.innerWidth < minWidth ? minWidth : window.innerWidth);
  // const setHeight = () => (window.innerHeight < minHeight ? minHeight : window.innerHeight - 60);
  // window.innerHeight 不适合 手机Safari
  const setWidth = () =>
    document.body.clientWidth < minWidth ? minWidth : document.body.clientWidth;
  const setHeight = () =>
    document.body.clientHeight < minHeight ? minHeight : document.body.clientHeight - 60;
  const [currentSize, setCurrentSize] = useState({
    width: setWidth(),
    height: setHeight()
  });

  window.onresize = () => {
    setCurrentSize({
      width: setWidth(),
      height: setHeight()
    });
  };
  return [currentSize.width, currentSize.height];
};

export default useScreenSize;
