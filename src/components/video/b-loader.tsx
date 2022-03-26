import React, { useState } from "react";
import clsx from "clsx";

const BLoader = ({ bv, heightQuality }: { bv: string; heightQuality?: boolean }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="full-container">
      <iframe
        className={clsx("full-content", { hide: loading })}
        // onLoad={() => setLoading(false)}
        src={
          heightQuality
            ? `//player.bilibili.com/player.html?high_quality=1&danmaku=0&bvid=${bv}&page=1`
            : `//player.bilibili.com/player.html?danmaku=0&bvid=${bv}&page=1`
        }
        scrolling="no"
        frameBorder="no"
        width="100%"
        height="200px"
        allowFullScreen={true}
      />
      {/*{loading && (*/}
      {/*  <div className="full-content loading">*/}
      {/*    <Plants logoWidth={100} speed={500} />*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

export default BLoader;
