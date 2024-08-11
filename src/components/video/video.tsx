import React, { createRef, useEffect, useState } from "react";
import Play from "@site/static/img/icon/play.svg";
import Styles from "./video.module.scss";
import { isPhone } from "@site/src/browser-helper";

const Video = ({ src, bg }: { src: string; bg: string }) => {
  const videoRef = createRef<HTMLVideoElement>();
  const [isPlay, setIsPlay] = useState(false);
  const [showControls, setShowControls] = useState(false);
  useEffect(() => {
    !isPlay && showControls && setShowControls(false);
    isPlay && setShowControls(true);
  }, [isPlay]);
  return (
    <div>
      <div
        onMouseEnter={() => isPlay && setShowControls(true)}
        onMouseOut={() => setShowControls(false)}
        className={Styles.videoContainer}
        style={{ backgroundImage: `url("${bg}")` }}
      >
        <video
          onClick={() => {
            !isPhone() && setIsPlay(false);
          }}
          onPlay={() => setIsPlay(true)}
          onPaste={() => setIsPlay(false)}
          ref={videoRef}
          className={Styles.video}
          style={{ filter: isPlay ? undefined : "brightness(60%)" }}
          controlsList="nodownload"
          width="100%"
          onContextMenu={() => false}
          src={src}
          controls={showControls}
        />
        {!isPlay && (
          <div className={Styles.playButton} onClick={() => videoRef.current?.play()}>
            <Play width={34} height={34} />
          </div>
        )}
        {/*<div className={Styles.controlBar}>*/}
        {/*  <div>*/}
        {/*    <Play width={15} height={15} />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default Video;
