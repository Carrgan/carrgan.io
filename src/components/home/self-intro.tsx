import CodeWindow from "@site/src/components/home/code-window";
import React from "react";

const SelfIntro = () => {
  return (
    <CodeWindow enableTrail>
      <p>Hi again, 欢迎来到Carrgan Universe，坐下来歇会儿吧。</p>
      <p>作为一个成熟的程序员，肯定是要有自己的live博客。</p>
      <p>本博客建于2022年，经过两年的修缮，初见雏形。</p>
      <p>
        2024年，用 <code>react-spring</code> 对博客首页进行了一次重构后，便有现在首页。
      </p>
    </CodeWindow>
  );
};

export default SelfIntro;
