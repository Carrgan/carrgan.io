import React, { createRef, ReactNode, useMemo, useState } from "react";
import Style from "./hello.module.css";
import Start from "@site/src/components/hello/start";
import { Random } from "@site/src/components/hello/helper";
import useScreenSize from "@site/src/screenHelper";

const Background = ({ children }: { children?: ReactNode }) => {
  const container = createRef<HTMLDivElement>();
  const [currentWidth, currentHeight] = useScreenSize();

  const renderCircle = () => {
    const number = 20;
    const xPadding = 20;
    const yPadding = 40;
    const coordinates: [number, number][] = [];
    for (let i = 0; i < number * 0.8; i++) {
      currentWidth &&
        coordinates.push([
          Random(xPadding, currentWidth / 2),
          Random(yPadding, currentHeight - yPadding)
        ]);
    }
    for (let i = 0; i < number * 0.2; i++) {
      currentWidth &&
        coordinates.push([
          Random(currentWidth / 2, currentWidth - xPadding),
          Random(yPadding, currentHeight - yPadding)
        ]);
    }
    return coordinates.map((i, index) => (
      <circle
        id="Oval"
        key={`Circle-${index}`}
        stroke="#979797"
        fill="#D8D8D8"
        cx={i[0]}
        cy={i[1]}
        r={Random(2, 4)}
      />
    ));
  };
  const renderStart = () => {
    const number = currentWidth > 400 ? 10 : 5;
    const xPadding = 20;
    const yPadding = 40;
    const coordinates: [number, number][] = [];
    for (let i = 0; i < number; i++) {
      currentWidth &&
        coordinates.push([
          Random(currentWidth / 2, currentWidth - xPadding),
          Random(yPadding, currentHeight - yPadding)
        ]);
    }
    return coordinates.map((i, index) => (
      <Start
        id={`Start-${index}`}
        key={`Start-${index}`}
        fill="#D94F49"
        opacity="0.756878807"
        weight={Random(5, 15)}
        center={i}
      />
    ));
  };

  const Starts = useMemo(renderStart, [currentWidth, currentHeight]);
  const Circles = useMemo(renderCircle, [currentWidth, currentHeight]);

  return (
    <div className={Style.mainContainer} ref={container} style={{ height: currentHeight }}>
      {currentWidth && (
        <svg
          style={{ left: 0, position: "absolute", zIndex: 1 }}
          width={`${currentWidth}px`}
          height={`${currentHeight}px`}
          viewBox={`0 0 ${currentWidth} ${currentHeight}`}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g id="Background">
            <g id="Tile" fill="#111926">
              <rect id="Rectangle" x="0" y="0" width={currentWidth} height={currentHeight} />
            </g>
            {Starts}
            {Circles}
          </g>
        </svg>
      )}
      {children}
    </div>
  );
};

export default Background;
