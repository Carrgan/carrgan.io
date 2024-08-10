import CodeWindow from "@site/src/components/home/code-window";
import React from "react";

const NoteIntro = () => {
  return (
    <CodeWindow enableTrail>
      <h2>
        Notes
        <span style={{ fontWeight: "lighter", fontSize: 16, marginLeft: 8 }}>Carrgan.io</span>
      </h2>
      <p>俗话说的话，好记性不如烂笔头。</p>
      <p>Note模块托管了平常学习工作中记录的 mark down 笔记，以方便随时查阅于复习。</p>
      <p>
        <a href="/notes/">来看看我都写了什么?</a>
      </p>
    </CodeWindow>
  );
};

export default NoteIntro;
