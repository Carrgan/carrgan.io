import React from "react";
import Background from "@site/src/components/hello/background";
import Style from "./hello.module.css";
import Logo from "@site/src/components/hello/logo";

const Hello = () => {
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
            <Logo />
          </div>
        </div>
      </Background>
    </div>
  );
};

export default Hello;
