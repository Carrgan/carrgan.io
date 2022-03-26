import React, { createRef, ReactNode, useEffect, useMemo, useState } from "react";
import Style from "./hello.module.css";
import Start from "@site/src/components/hello/start";
import { Random } from "@site/src/components/hello/helper";
import useScreenSize from "@site/src/screenHelper";
import Meteor from "@site/src/components/hello/meteor";
import Anime from "react-anime";

const Background = ({ children }: { children?: ReactNode }) => {
  const container = createRef<HTMLDivElement>();
  const [currentWidth, currentHeight] = useScreenSize();
  const [meteor, setMeteor] = useState<ReactNode>();

  const meteorTime = [1500, 8000];

  useEffect(() => {
    const translate = (currentWidth > currentHeight ? currentHeight : currentWidth) + 70;
    const timeOut = setTimeout(() => {
      const x = Random(0, currentWidth);
      setMeteor(undefined);
      if (x > currentWidth / 2) {
        setMeteor(
          <Anime
            component={"g"}
            easing={"linear"}
            svg
            translateX={-translate}
            duration={1500}
            translateY={translate}
          >
            <Meteor x={x} left={true} />
          </Anime>
        );
      } else {
        setMeteor(
          <Anime
            component={"g"}
            easing={"linear"}
            svg
            translateX={translate}
            duration={1500}
            translateY={translate}
          >
            <Meteor x={x} />
          </Anime>
        );
      }
    }, Random(meteorTime[0], meteorTime[1]));
    return () => {
      clearTimeout(timeOut);
    };
  }, [currentWidth, meteor]);

  const renderCircle = () => {
    const number = 60;
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
      <Anime
        key={`Circle-${index}-${i[0]}-${i[1]}`}
        easing="cubicBezier(.5, .05, .1, .3)"
        direction="alternate"
        svg
        opacity={[0, 1]}
        loop={true}
        delay={Random(0, 5) * 1000}
        duration={Random(2, 5) * 1000}
        component={"g"}
      >
        <circle id="Oval" fill="#ffff" cx={i[0]} cy={i[1]} r={Random(2, 4)} />
      </Anime>
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
      <Anime
        key={`Start-${index}`}
        easing="linear"
        direction="alternate"
        svg
        opacity={[0.8, 1]}
        loop={true}
        duration={Random(1, 3) * 1000}
        component={"g"}
      >
        <Start
          id={`Start-${index}`}
          fill="#D94F49"
          opacity="0.756878807"
          weight={Random(5, 15)}
          center={i}
        />
      </Anime>
    ));
  };

  // Touch Screen scroll bug ifx
  // const Starts = isPhone()
  //   ? useMemo(renderCircle, [])
  //   : useMemo(renderStart, [currentWidth, currentHeight]);
  // const Circles = isPhone()
  //   ? useMemo(renderCircle, [])
  //   : useMemo(renderCircle, [currentWidth, currentHeight]);

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
            {meteor}
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
