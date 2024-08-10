import React from "react";
import Background from "@site/src/components/hello/background";
import Style from "./hello.module.css";
import Plants from "@site/src/components/hello/plants";
import useAvailableScreenSize from "@site/src/use-available-screen-size";

const Hello = () => {
  const [currentWidth, currentHeight] = useAvailableScreenSize();
  const logoWidth = currentWidth > currentHeight ? currentHeight : currentWidth * 0.96;
  return (
    <div>
      <Background>
        <div className={Style.layoutContainer}>
          <div className={Style.textContainer}>
            <div>
              <h1>CARRGAN.IO</h1>
              <h4>IDEAL\NOTES\MUSIC\VIDEO\PHOTO EVERY THING ABOUT ME.</h4>
            </div>
          </div>
          <div className={Style.logoContainer}>
            <Plants logoWidth={logoWidth} />
          </div>
        </div>
      </Background>
    </div>
  );
};

export default Hello;
