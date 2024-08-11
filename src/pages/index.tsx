import React, { lazy, Suspense, useMemo, useRef, useState } from "react";
import PageWrapper from "@site/src/components/common/page-wrapper";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import Style from "@site/src/pages/index.module.scss";
import useScreenSize from "@site/src/use-available-screen-size";

import { animated, useSpring } from "@react-spring/web";

import Keyboard from "@site/static/img/home/keyboard.png";
import Earth from "@site/static/img/home/earth.png";
import SkeletonFullLoading from "@site/src/components/common/skeleton-full-loading";

const Background = lazy(() => import("@site/src/components/home/background"));
const Plants = lazy(() => import("@site/src/components/home/plants"));
const BubbleDialog = lazy(() => import("@site/src/components/home/bubble-dialog"));
const SpaceCat = lazy(() => import("@site/src/components/home/space-cat"));
const Guitar = lazy(() => import("@site/src/components/home/guitar"));
const LifeIntro = lazy(() => import("@site/src/components/home/life-intro"));
const Sitellite = lazy(() => import("@site/src/components/home/sitellite"));
const SelfIntro = lazy(() => import("@site/src/components/home/self-intro"));
const NoteIntro = lazy(() => import("@site/src/components/home/note-intro"));

const DEFAULT_HELLO = "Hi there, know more about Carrgan Universe? Click here !!";
export default function Home(): JSX.Element {
  const [currentWidth, currentHeight] = useScreenSize();
  const logoWidth = currentWidth > currentHeight ? currentHeight : currentWidth;
  const parallax = useRef<IParallax>(null!);
  const [bubbleText, setBubbleText] = useState(DEFAULT_HELLO);
  const [showHere, setShowHere] = useState(false);

  const isSmallScreen = useMemo(() => {
    return currentWidth < 767;
  }, [currentWidth]);

  const handleBubbleClick = () => {
    if (parallax.current) {
      if (parallax.current.offset === 0) {
        parallax.current.scrollTo(1);
        return;
      }
      if (parallax.current.offset === 1) {
        parallax.current.scrollTo(0);
        setBubbleText(DEFAULT_HELLO);
        return;
      }
    }
  };

  const handelPageChange = (page: number) => () => {
    if (parallax.current) {
      if (isSmallScreen) {
        if (parallax.current.offset === page) {
          parallax.current.scrollTo(page - 1);
          return;
        }
        if (parallax.current.offset === page - 1) {
          parallax.current.scrollTo(page);
          return;
        }
      }
      parallax.current.scrollTo(page);
    }
  };

  const handelScroll = () => {
    if (parallax.current) {
      if (parallax.current.offset === 1) {
        setBubbleText("Back first page click here, next page click the Earth ⬇⬇⬇⬇");
        return;
      }
      if (parallax.current.offset === 2) {
        setShowHere(true);
        return;
      }
      showHere && setShowHere(false);
    }
  };

  const helloDialogSpring = useSpring({
    position: "absolute",
    left: "max(260px, 23%)",
    top: "20%",
    opacity: 1,
    x: 0,
    y: 0,
    delay: 200,
    from: {
      x: -5,
      y: 20,
      opacity: 0
    },
    config: {
      duration: 800
    }
  });
  return (
    <PageWrapper noFooter>
      <Parallax
        enabled={false}
        className={Style.homeWrapper}
        pages={4}
        ref={parallax}
        style={{ backgroundColor: "#111926", height: currentHeight }}
        onScrollCapture={handelScroll}
      >
        <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: "#87BCDE" }} />
        <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: "#805E73" }} />
        <ParallaxLayer offset={3} speed={1} style={{ backgroundColor: "#87BCDE" }} />
        <Suspense fallback={<SkeletonFullLoading />}>
          <ParallaxLayer offset={0} speed={0} factor={4}>
            <Background />
          </ParallaxLayer>
        </Suspense>
        <Suspense fallback={<SkeletonFullLoading />}>
          <ParallaxLayer
            offset={isSmallScreen ? 0.43 : 0.3}
            speed={-0.3}
            style={{ marginLeft: "6%" }}
          >
            <div className={Style.textContainer}>
              <div>
                <h1>CARRGAN.IO</h1>
                <h4>EVERY THING ABOUT ME.</h4>
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer
            offset={isSmallScreen ? -0.2 : 0}
            speed={-0.1}
            style={{ marginLeft: "45%" }}
          >
            <Plants logoWidth={logoWidth * 1.1} />
          </ParallaxLayer>
          <ParallaxLayer
            offset={0.65}
            speed={isSmallScreen ? -0.35 : -0.45}
            style={{ marginLeft: "5%" }}
          >
            <div className={Style.spaceCatWrapper} onClick={() => parallax.current?.scrollTo(1)}>
              <BubbleDialog
                onClick={e => {
                  e.stopPropagation();
                  handleBubbleClick();
                }}
                spring={helloDialogSpring}
                text={bubbleText}
              />
              <animated.div>
                <SpaceCat></SpaceCat>
              </animated.div>
            </div>
          </ParallaxLayer>
        </Suspense>
        <Suspense fallback={<SkeletonFullLoading />}>
          <ParallaxLayer
            offset={isSmallScreen ? 1.2 : 1.2}
            speed={0.5}
            className={Style.textWindowParallax}
          >
            <div>
              <SelfIntro />
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={1.8} speed={-0.1} style={{ marginLeft: "70%" }}>
            {!isSmallScreen && <Sitellite size={0.6} />}
          </ParallaxLayer>

          <ParallaxLayer
            offset={isSmallScreen ? 1.85 : 1.8}
            speed={isSmallScreen ? 0 : -0.4}
            style={{ marginLeft: "10%" }}
          >
            <div className={Style.theEarth}>
              <img
                style={{ cursor: "pointer", minWidth: "400px" }}
                onClick={handelPageChange(2)}
                src={Earth}
                width={"30%"}
                height={"auto"}
              />
            </div>
          </ParallaxLayer>
        </Suspense>
        <Suspense fallback={<SkeletonFullLoading />}>
          <ParallaxLayer
            className={Style.textWindowParallax}
            offset={isSmallScreen ? 2.3 : 2.2}
            speed={0.5}
          >
            <div>
              <NoteIntro />
            </div>
          </ParallaxLayer>
          <ParallaxLayer
            offset={2.85}
            speed={isSmallScreen ? -0.08 : -0.4}
            style={{ marginLeft: "30%" }}
          >
            {showHere && <div>Click here next page.</div>}
            <img
              style={{ cursor: "pointer", width: "14%", height: "auto", minWidth: "200px" }}
              onClick={handelPageChange(3)}
              src={Keyboard}
            />
          </ParallaxLayer>
        </Suspense>
        <Suspense fallback={<SkeletonFullLoading />}>
          <ParallaxLayer
            offset={isSmallScreen ? 3.3 : 3.2}
            speed={1}
            style={{ marginLeft: "10%", width: 1 }}
          >
            <Guitar />
          </ParallaxLayer>
          <ParallaxLayer
            className={Style.textWindowParallax}
            offset={isSmallScreen ? 3.2 : 3.2}
            speed={0.5}
          >
            <div>
              <LifeIntro />
            </div>
          </ParallaxLayer>
        </Suspense>
      </Parallax>
    </PageWrapper>
  );
}
