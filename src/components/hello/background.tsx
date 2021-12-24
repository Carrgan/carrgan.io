import React, { createRef, useEffect, useState } from "react";
import Style from "./hello.module.css";

const Background = () => {
  const container = createRef<HTMLDivElement>();
  const [currentWidth, setCurrentWidth] = useState<undefined | number>();
  useEffect(() => {
    container.current &&
      currentWidth === undefined &&
      new ResizeObserver(([e]) => setCurrentWidth(e.target.clientWidth)).observe(container.current);
  }, [container, container.current?.offsetHeight]);
  return (
    <div className={Style.container} ref={container}>
      {currentWidth && (
        <svg
          width={currentWidth + "px"}
          height="1000px"
          viewBox={`0 0 ${currentWidth} 1000`}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g id="Background">
            <g id="Tile" fill="#111926">
              <rect id="Rectangle" x="0" y="0" width={currentWidth} height="1000" />
            </g>
            <polygon
              onClick={() => console.log("123")}
              id="Star1111"
              fill="#D94F49"
              opacity="0.756878807"
              transform="translate(1771.000000, 560.000000) scale(-1, 1) translate(-1771.000000, -560.000000) "
              points="1771 564.781851 1756.85786 574.142136 1766.21815 560 1756.85786 545.857864 1771 555.218149 1785.14214 545.857864 1775.78185 560 1785.14214 574.142136"
            />
            <polygon
              id="Star"
              fill="#D94F49"
              opacity="0.756878807"
              transform="translate(1210.000000, 224.000000) scale(-1, 1) translate(-1210.000000, -224.000000) "
              points="1210 228.781851 1195.85786 238.142136 1205.21815 224 1195.85786 209.857864 1210 219.218149 1224.14214 209.857864 1214.78185 224 1224.14214 238.142136"
            />
            <polygon
              id="Star"
              fill="#D94F49"
              opacity="0.756878807"
              transform="translate(1308.000000, 96.000000) scale(-1, 1) translate(-1308.000000, -96.000000) "
              points="1308 100.781851 1293.85786 110.142136 1303.21815 96 1293.85786 81.8578644 1308 91.2181486 1322.14214 81.8578644 1312.78185 96 1322.14214 110.142136"
            />
            <polygon
              id="Star"
              fill="#D94F49"
              opacity="0.756878807"
              transform="translate(1382.000000, 699.000000) scale(-1, 1) translate(-1382.000000, -699.000000) "
              points="1382 706.41187 1360.07969 720.92031 1374.58813 699 1360.07969 677.07969 1382 691.58813 1403.92031 677.07969 1389.41187 699 1403.92031 720.92031"
            />
            <polygon
              id="Star"
              fill="#D94F49"
              opacity="0.756878807"
              transform="translate(1621.000000, 159.000000) scale(-1, 1) translate(-1621.000000, -159.000000) "
              points="1621 165.252326 1603.32233 176.67767 1614.74767 159 1603.32233 141.32233 1621 152.747674 1638.67767 141.32233 1627.25233 159 1638.67767 176.67767"
            />
            <polygon
              id="Star"
              fill="#D94F49"
              opacity="0.756878807"
              transform="translate(1065.000000, 473.000000) scale(-1, 1) translate(-1065.000000, -473.000000) "
              points="1065 479.252326 1047.32233 490.67767 1058.74767 473 1047.32233 455.32233 1065 466.747674 1082.67767 455.32233 1071.25233 473 1082.67767 490.67767"
            />
            <circle id="Oval" stroke="#979797" fill="#D8D8D8" cx="587" cy="176" r="7.5" />
            <circle id="Oval" stroke="#979797" fill="#D8D8D8" cx="1418" cy="138" r="4.5" />
            <circle id="Oval" stroke="#979797" fill="#D8D8D8" cx="188.5" cy="77.5" r="5" />
            <circle id="Oval" stroke="#979797" fill="#D8D8D8" cx="774" cy="777" r="6.5" />
            <circle
              id="Oval"
              stroke="#979797"
              fill="#D8D8D8"
              transform="translate(376.000000, 638.000000) scale(-1, 1) translate(-376.000000, -638.000000) "
              cx="376"
              cy="638"
              r="10.5"
            />
            <circle id="Oval" stroke="#979797" fill="#D8D8D8" cx="1072" cy="70" r="6.5" />
          </g>
        </svg>
      )}
    </div>
  );
};

export default Background;
