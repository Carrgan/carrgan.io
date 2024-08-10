import CodeWindow from "@site/src/components/home/code-window";
import React from "react";

const LifeIntro = () => {
  return (
    <CodeWindow enableTrail>
      <h2>
        Life
        <span style={{ fontWeight: "lighter", fontSize: 16, marginLeft: 8 }}>Carrgan.io</span>
      </h2>
      <p>生活中的瞬间都是值得一一记录的。</p>
      <p>利用这个板块来记录一些生活中的瞬间。</p>
      <p>有弹吉他的，骑摩托车的，摄影的和做饭的，有电影分享，音乐分享。</p>
      <p>
        <a href="https://space.bilibili.com/72913460">来看看我的Bilibili?</a>{" "}
        <a href="https://music.163.com/#/artist?id=12236222">来看看我的网易云?</a>{" "}
        <a href="https://weibo.com/u/3602696930?nick=Carrgan">来看看我的微博?</a>
      </p>
    </CodeWindow>
  );
};

export default LifeIntro;
