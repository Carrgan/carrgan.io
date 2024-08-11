import React, { useMemo } from "react";
import { BrowserType, getBrowserType } from "@site/src/browser-helper";
import { animated, easings, useSpring } from "@react-spring/web";

const Plants = ({ logoWidth, speed }: { logoWidth: number; speed?: number }) => {
  const isSafari = useMemo(() => getBrowserType() === BrowserType.Safari, []);
  const renderShadow = () => (isSafari ? undefined : "url(#filter-wwl4--iet0-1)");

  const smailPlantSpring = useSpring({
    loop: true,
    reset: true,
    from: { translateX: 0, translateY: 0 },
    to: [
      { translateX: 10, translateY: 25 },
      { translateX: 0, translateY: 0 }
    ],
    config: {
      duration: speed ? speed : 3000,
      easing: easings.easeInOutCubic
    }
  });

  const plantSpring = useSpring({
    loop: true,
    reset: true,
    from: { translateY: 0 },
    to: [{ translateY: 10 }, { translateY: 0 }],
    config: {
      duration: speed ? speed : 3000,
      easing: easings.easeInOutBack
    }
  });

  const plantHaloSpring = useSpring({
    loop: true,
    reset: true,
    from: { translateX: 0, translateY: 0 },
    to: [
      { translateX: 2.5, translateY: 5 },
      { translateX: 0, translateY: 0 }
    ],
    config: {
      duration: speed ? speed : 3000,
      easing: easings.easeInOutBack
    }
  });

  return (
    <div>
      <svg
        width={logoWidth}
        height={logoWidth * 0.9}
        viewBox="0 0 488 323"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <filter
            x="-7.2%"
            y="-10.4%"
            width="114.4%"
            height="120.7%"
            filterUnits="objectBoundingBox"
            id="filter-wwl4--iet0-1"
          >
            <feOffset dx="11" dy="16" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur
              stdDeviation="2"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            ></feGaussianBlur>
            <feColorMatrix
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
              type="matrix"
              in="shadowBlurOuter1"
              result="shadowMatrixOuter1"
            ></feColorMatrix>
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
          <linearGradient
            x1="92.3534567%"
            y1="76.7271903%"
            x2="-71.796929%"
            y2="-15.9873076%"
            id="linearGradient-wwl4--iet0-2"
          >
            <stop stopColor="#FFFFFF" offset="0%"></stop>
            <stop stopColor="#000000" offset="100%"></stop>
          </linearGradient>
          <path
            d="M0,8.35548211 C0,5.37035589 1.59254574,2.61198548 4.17774086,1.11942235 C6.76293598,-0.373140783 9.94802774,-0.373140783 12.5332229,1.11942235 C15.118418,2.61198548 16.7109637,5.37035589 16.7109637,8.35548211 C16.7109637,11.3406083 15.118418,14.0989788 12.5332229,15.591542 C9.94802776,17.0841051 6.76293596,17.0841051 4.17774083,15.591542 C1.59254569,14.0989788 0,11.3406083 0,8.35548211"
            id="path-wwl4--iet0-3"
          ></path>
          <filter
            x="-26.9%"
            y="-26.9%"
            width="153.9%"
            height="153.9%"
            filterUnits="objectBoundingBox"
            id="filter-wwl4--iet0-4"
          >
            <feGaussianBlur
              stdDeviation="1.5"
              in="SourceAlpha"
              result="shadowBlurInner1"
            ></feGaussianBlur>
            <feOffset dx="-6" dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
            <feComposite
              in="shadowOffsetInner1"
              in2="SourceAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
              result="shadowInnerInner1"
            ></feComposite>
            <feColorMatrix
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
              type="matrix"
              in="shadowInnerInner1"
            ></feColorMatrix>
          </filter>
          <path
            d="M0,9.56810605 C0,4.28378699 4.28378699,0 9.56810605,0 C14.8524251,0 19.1362121,4.28378699 19.1362121,9.56810605 C19.1362121,14.8524251 14.8524251,19.1362121 9.56810605,19.1362121 C4.28378699,19.1362121 0,14.8524251 0,9.56810605"
            id="path-wwl4--iet0-5"
          ></path>
          <filter
            x="-20.9%"
            y="-20.9%"
            width="141.8%"
            height="141.8%"
            filterUnits="objectBoundingBox"
            id="filter-wwl4--iet0-6"
          >
            <feGaussianBlur
              stdDeviation="1.5"
              in="SourceAlpha"
              result="shadowBlurInner1"
            ></feGaussianBlur>
            <feOffset dx="-5" dy="-1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
            <feComposite
              in="shadowOffsetInner1"
              in2="SourceAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
              result="shadowInnerInner1"
            ></feComposite>
            <feColorMatrix
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
              type="matrix"
              in="shadowInnerInner1"
            ></feColorMatrix>
          </filter>
          <linearGradient
            x1="34.8558794%"
            y1="65.3383619%"
            x2="87.8001057%"
            y2="11.23037%"
            id="linearGradient-wwl4--iet0-7"
          >
            <stop stopColor="#D1104C" offset="0%"></stop>
            <stop stopColor="#CB4042" offset="40.4401777%"></stop>
            <stop stopColor="#F15F1D" offset="72.2224267%"></stop>
            <stop stopColor="#F0A987" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="1">
          <g id="logo" transform="translate(-34.000000, -37.373332)" filter={renderShadow()}>
            <animated.g style={smailPlantSpring}>
              <g id="Smail-Plant" transform="translate(47.623353, 38.248013)">
                <g id="Plant" fill="url(#linearGradient-wwl4--iet0-2)" opacity="1">
                  <path
                    d="M0,40 C0,17.90861 17.90861,0 40,0 C62.09139,0 80,17.90861 80,40 C80,62.09139 62.09139,80 40,80 C17.90861,80 0,62.09139 0,40"
                    id="path-1"
                  ></path>
                </g>
                <g id="Oval" transform="translate(40.000000, 14.285714)" fillRule="nonzero">
                  <g id="path-4">
                    <use fill="#D8D8D8" xlinkHref="#path-wwl4--iet0-3"></use>
                    <use
                      fill="black"
                      fillOpacity="1"
                      filter="url(#filter-wwl4--iet0-4)"
                      xlinkHref="#path-wwl4--iet0-3"
                    ></use>
                  </g>
                </g>
                <g id="path-6" transform="translate(17.142857, 40.000000)">
                  <use
                    fill="#D8D8D8"
                    fillRule="evenodd"
                    xlinkHref="#path-wwl4--iet0-5"
                    // style={{
                    //   animation: runAnimation(`small-plant 6s infinite`)
                    // }}
                  ></use>
                  <use
                    fill="black"
                    fillOpacity="1"
                    filter="url(#filter-wwl4--iet0-6)"
                    xlinkHref="#path-wwl4--iet0-5"
                  ></use>
                </g>
              </g>
            </animated.g>
            <g
              id="Big-Plant"
              transform="translate(270.563284, 188.373332) rotate(-9.000000) translate(-270.563284, -188.373332) translate(20.563294, 37.248011)"
            >
              <g
                id="Plant"
                transform="translate(89.946710, 0.000000)"
                fill="url(#linearGradient-wwl4--iet0-7)"
              >
                <animated.g style={plantSpring}>
                  <path
                    d="M0,151.125321 C0,67.6611109 70.6307247,0 157.758139,0 C244.885553,0 315.516278,67.6611109 315.516278,151.125321 C315.516278,234.589531 244.885553,302.250642 157.758139,302.250642 C70.6307247,302.250642 0,234.589531 0,151.125321"
                    id="path-9"
                  ></path>
                </animated.g>
              </g>
              <g
                id="Halo"
                transform="translate(249.999990, 166.105397) rotate(-7.000000) translate(-249.999990, -166.105397) translate(5.243299, 108.111501)"
                fill="#FBD689"
              >
                <animated.g style={plantHaloSpring}>
                  <path
                    d="M411.246418,5.68434189e-14 C459.38925,12.222307 489.513384,29.678792 489.513384,49.05923 C489.513384,86.022853 379.93208,115.987791 244.756692,115.987791 C109.581304,115.987791 -1.13686838e-13,86.022853 -1.13686838e-13,49.05923 C-1.13686838e-13,31.206768 25.56134,14.986845 67.2219984,2.986845 C52.3296001,12.026267 44.0145537,22.130178 44.3788873,32.563328 C45.5184621,65.19648 131.139833,88.693172 235.619571,85.044659 C340.099309,81.396146 423.873063,51.984046 422.733489,19.350894 C422.494178,12.497932 418.52922,6.047888 411.446354,0.167541 L411.246418,5.68434189e-14 Z"
                    id="path-11"
                  ></path>
                </animated.g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Plants;
