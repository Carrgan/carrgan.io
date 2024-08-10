import React, { ReactNode, useState } from "react";
import { a, useTrail } from "@react-spring/web";
import { useIntersection } from "@site/src/helper/use-Intersection";

interface ICodeWindow {
  enableTrail?: boolean;
  children?: ReactNode;
}

const Cirlce = ({ backgroud }: { backgroud: string }) => (
  <div style={{ height: 20, width: 20, backgroundColor: backgroud, borderRadius: "50%" }} />
);

const CodeWindow = ({ children, enableTrail }: ICodeWindow) => {
  const [open, setOpen] = useState(false);

  const items = React.Children.toArray(children);
  const trails = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    y: open ? 0 : 20,
    // height: open ? 110 : 0,
    delay: 500,
    from: { opacity: 0 }
  });

  const intersectionRef = useIntersection(
    () => setOpen(true),
    () => setOpen(false)
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }} ref={intersectionRef}>
      <div
        style={{
          height: 40,
          backgroundColor: "#2B2B2B",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            width: 78,
            marginLeft: 20
          }}
        >
          <Cirlce backgroud={"#FF605C"} />
          <Cirlce backgroud={"#FFBD44"} />
          <Cirlce backgroud={"#00CA4E"} />
        </div>
      </div>
      <div
        style={{
          padding: 24,
          backgroundColor: "#0D1117",
          flex: "1",
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15
        }}
      >
        {enableTrail
          ? trails.map((props, index) => {
              return (
                <a.div style={props} key={"content" + index}>
                  {items[index]}
                </a.div>
              );
            })
          : children}
      </div>
    </div>
  );
};

export default CodeWindow;
