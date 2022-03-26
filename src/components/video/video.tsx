import React from "react";

const Video = ({ src }: { src: string }) => {
  return <video width="100%" src={src} controls />;
};

export default Video;
