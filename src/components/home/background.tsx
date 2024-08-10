import React, { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { IClintSize } from "@site/src/interface";
import { Random } from "@site/src/components/hello/helper";
import { animated, useSpring, useSprings } from "@react-spring/web";
import { getCryptoRandomInt } from "@site/src/helper/crypto-random-int";
import { poissonDiskSampling } from "@site/src/helper/poisson-disk-sampling";
import Star from "@site/src/components/hello/start";
import Meteor from "@site/src/components/hello/meteor";
import useAvailableScreenSize from "@site/src/use-available-screen-size";

const Background = () => {
  const [clintSize, setClintSize] = useState<IClintSize>({ width: 0, height: 0 });
  const [viewWidth] = useAvailableScreenSize();
  const [containerObserverCleaner, setContainerObserverCleaner] = useState<Function>();

  const containerRef = useCallback((div: HTMLDivElement) => {
    if (div) {
      const onResize = () => {
        setClintSize({ width: div.offsetWidth, height: div.offsetHeight });
      };
      const resizeObserver = new ResizeObserver(onResize);
      setContainerObserverCleaner(() => resizeObserver.unobserve(div));
      resizeObserver.observe(div);
    }
  }, []);

  useEffect(() => {
    return () => containerObserverCleaner && containerObserverCleaner();
  }, []);

  const circlesPoints = useMemo(() => {
    return clintSize.width === 0
      ? []
      : poissonDiskSampling(clintSize.width, clintSize.height, 80, 0.5);
  }, [clintSize]);

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
  const renderStart = () => {
    const number = 60;
    const xPadding = 20;
    const yPadding = 40;
    const coordinates: [number, number][] = [];
    const width = clintSize.width;
    const height = clintSize.height;
    for (let i = 0; i < number * 0.8; i++) {
      width && coordinates.push([Random(xPadding, width / 2), Random(yPadding, height - yPadding)]);
    }
    for (let i = 0; i < number * 0.2; i++) {
      width &&
        coordinates.push([
          Random(width / 2, width - xPadding),
          Random(yPadding, height - yPadding)
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

  const shurikenCount = useMemo(() => {
    return clintSize.width > 400 ? 20 : 10;
  }, [clintSize]);

  const [shurikenSprints] = useSprings(shurikenCount, () => {
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

  const renderShuriken = () => {
    const width = clintSize.width;
    const height = clintSize.height;
    const number = width > 400 ? 10 : 5;
    const xPadding = 20;
    const yPadding = 40;
    const coordinates: [number, number][] = [];
    for (let i = 0; i < number; i++) {
      width &&
        coordinates.push([
          Random(width / 2, width - xPadding),
          Random(yPadding, height - yPadding)
        ]);
    }

    return shurikenSprints.map((props, index) => (
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

  const [meteor, setMeteor] = useState<ReactNode>();

  const meteorTime = [1500, 3000];

  const meteorTranslate = useMemo(() => {
    return (viewWidth > viewWidth ? viewWidth : viewWidth) + 70;
  }, [viewWidth, viewWidth]);
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
      const x = Random(0, viewWidth);
      if (x > viewWidth / 2) {
        setMeteor(() => (
          <animated.g style={meteorSpringLeft}>
            <Meteor x={x} left key="left" />
          </animated.g>
        ));
      } else {
        setMeteor(() => (
          <animated.g style={meteorSpring}>
            <Meteor x={x} key={"right"} />
          </animated.g>
        ));
      }
    }, getCryptoRandomInt(meteorTime[0], meteorTime[1]));
    return () => {
      clearTimeout(timeOut);
    };
  }, [viewWidth, meteor, meteorSpring, meteorSpringLeft]);

  const Starts = useMemo(renderStart, [clintSize]);
  const Shuriken = useMemo(renderShuriken, [clintSize]);

  return (
    <div style={{ height: "100%" }} ref={containerRef}>
      <svg
        style={{ left: 0, position: "absolute", zIndex: 1 }}
        width={`${clintSize.width}px`}
        height={`${clintSize.height}px`}
        viewBox={`0 0 ${clintSize.width} ${clintSize.height}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g id="Background">
          {meteor}
          {Starts}
          {Shuriken}
        </g>
      </svg>
    </div>
  );
};

export default Background;
