import React, { CSSProperties } from "react";

const Meteor = ({ style, x, left }: { style?: CSSProperties; x: number; left?: boolean }) => {
  return (
    <g>
      <defs>
        <radialGradient
          cx="50%"
          cy="3.7609357%"
          fx="50%"
          fy="3.7609357%"
          r="510.393845%"
          gradientTransform="translate(0.500000,0.037609),scale(1.000000,0.060933),rotate(90.000000),translate(-0.500000,-0.037609)"
          id="radialGradient-k8snj-eejo-1"
        >
          <stop stopColor="#FFFFFF" offset="0%" />
          <stop stopColor="#FF00FE" stopOpacity="0.528025807" offset="100%" />
        </radialGradient>
        <path
          style={{ transform: left ? "rotate(225deg)" : "rotate(135deg)" }}
          d="M5,2 C6.1045695,2 7,3.11928813 7,4.5 L7,4.5 L5,67.6459129 L3.00620557,4.69839506 C3.0020944,4.63293953 3,4.5667755 3,4.5 C3,3.11928813 3.8954305,2 5,2 Z"
          id="path-k8snj-eejo-2"
        />
        <filter
          x="-124.8%"
          y="-6.1%"
          width="349.8%"
          height="208.7%"
          filterUnits="objectBoundingBox"
          id="filter-k8snj-eejo-3"
        >
          <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1" />
          <feOffset dx="0" dy="1" in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
          <feGaussianBlur stdDeviation="0.5" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
          <feColorMatrix
            values="0 0 0 0 1   0 0 0 0 0   0 0 0 0 0.946852464  0 0 0 0.5 0"
            type="matrix"
            in="shadowBlurOuter1"
          />
        </filter>
      </defs>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Combined-Shape">
          <use
            style={style}
            y={-10}
            x={x}
            rotate={30}
            fill="black"
            fillOpacity="1"
            filter="url(#filter-k8snj-eejo-3)"
            xlinkHref="#path-k8snj-eejo-2"
          />
          <use
            style={style}
            x={x}
            y={-10}
            fill="url(#radialGradient-k8snj-eejo-1)"
            fillRule="evenodd"
            xlinkHref="#path-k8snj-eejo-2"
          />
        </g>
      </g>
    </g>
  );
};

export default Meteor;
