import React, { createRef, ReactNode, useEffect, useMemo, useState } from "react";
import Style from "./hello.module.css";
import { Random } from "@site/src/components/hello/helper";
import useScreenSize from "@site/src/screenHelper";
import { animated, useSpring, useSprings } from "@react-spring/web";
import { poissonDiskSampling } from "@site/src/helper/poisson-disk-sampling";
import Star from "@site/src/components/hello/start";
import { getCryptoRandomInt } from "@site/src/helper/crypto-random-int";
import Meteor from "@site/src/components/hello/meteor";

const Background = ({ children }: { children?: ReactNode }) => {
  const container = createRef<HTMLDivElement>();
  const [currentWidth, currentHeight] = useScreenSize();
  const [meteor, setMeteor] = useState<ReactNode>();

  const meteorTime = [1500, 5000];

  const meteorTranslate = useMemo(() => {
    return (currentWidth > currentHeight ? currentHeight : currentWidth) + 70;
  }, [currentWidth, currentHeight]);
  const meteorSpring = useSpring({
    from: { translateX: 0, translateY: 0 },
    to: { translateX: meteorTranslate, translateY: meteorTranslate },
    reset: true,
    config: {
      duration: 1500
    }
  });
  const meteorSpringLeft = useSpring({
    from: { translateX: 0, translateY: 0 },
    to: { translateX: -meteorTranslate, translateY: meteorTranslate },
    reset: true,
    config: {
      duration: 1500
    }
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      const x = Random(0, currentWidth);
      setMeteor(undefined);
      if (x > currentWidth / 2) {
        setMeteor(
          <animated.g style={meteorSpringLeft}>
            <Meteor x={x} left={true} />
          </animated.g>
        );
      } else {
        setMeteor(
          <animated.g style={meteorSpring}>
            <Meteor x={x} />
          </animated.g>
        );
      }
    }, getCryptoRandomInt(meteorTime[0], meteorTime[1]));
    return () => {
      clearTimeout(timeOut);
    };
  }, [currentWidth, meteor, meteorSpring, meteorSpringLeft]);

  const circlesPoints = useMemo(() => {
    return poissonDiskSampling(currentWidth, currentHeight, 80, 0.5);
  }, [currentWidth, currentHeight]);

  const [circlesSprings] = useSprings(circlesPoints.length, () => {
    const defaultOpacity = getCryptoRandomInt(100, 500) / 1000;
    const defaultOpacity2 = getCryptoRandomInt(900, 1000) / 1000;
    return {
      loop: true,
      from: { opacity: defaultOpacity },
      to: [{ opacity: defaultOpacity2 }, { opacity: defaultOpacity }],
      delay: getCryptoRandomInt(0, 20000),
      config: {
        friction: Math.random(),
        damping: Math.random(),
        mass: 4,
        duration: getCryptoRandomInt(1000, 3000)
      }
    };
  });

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

    return circlesSprings.map((props, index) => {
      return (
        <animated.g style={props} key={`start-${index}`}>
          <circle
            id="Oval"
            fill="#ffff"
            cx={circlesPoints[index].x}
            cy={circlesPoints[index].y}
            r={getCryptoRandomInt(1, 6)}
          />
        </animated.g>
      );
    });
  };

  const StarCount = useMemo(() => {
    return currentWidth > 400 ? 10 : 5;
  }, [currentWidth]);

  const [starSprints] = useSprings(StarCount, () => {
    return {
      loop: true,
      from: { opacity: 0.5 },
      to: [{ opacity: 1 }, { opacity: 0.5 }],
      delay: Random(0, 20) * 1000,
      config: {
        friction: Math.random(),
        damping: Math.random(),
        mass: 4,
        duration: (Random(1, 2) * 1000) / 2
      }
    };
  });

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

    return starSprints.map((props, index) => (
      <animated.g style={props} key={`start-${index}`}>
        <Star
          id={`Star-${index}`}
          fill="#D94F49"
          opacity="0.756878807"
          weight={Random(5, 15)}
          center={coordinates[index]}
        />
      </animated.g>
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
