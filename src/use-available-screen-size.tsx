import { useEffect, useState } from "react";

const useAvailableScreenSize = (haveNav = true): [number, number] => {
  const minWidth = 200;
  const minHeight = 500;

  const [currentSize, setCurrentSize] = useState({
    width: minWidth,
    height: minHeight
  });
  // window.innerHeight 不适合 手机Safari
  useEffect(() => {
    const onResize = () => {
      const width = document.body.clientWidth < minWidth ? minWidth : document.body.clientWidth;
      let height =
        document.body.clientHeight < minHeight ? minHeight : document.body.clientHeight - 60;
      height = haveNav ? height : height + 60;
      setCurrentSize({
        width,
        height
      });
    };

    window.onresize = onResize;

    onResize();

    return () => {
      (window as any).onresize = null;
    };
  }, []);
  return [currentSize.width, currentSize.height];
};

export default useAvailableScreenSize;
