import React from "react";

const Start = ({
  id,
  fill = "#D94F49",
  opacity = "0.756878807",
  weight = 15,
  center = [1000, 500]
}: {
  id: string;
  fill?: string;
  opacity?: string;
  weight?: number;
  center?: [number, number];
}) => {
  return (
    <polygon
      id={id}
      fill={fill}
      opacity={opacity}
      points={`
      ${center[0]} ${center[1] + weight * 0.35}
      ${center[0] + weight} ${center[1] + weight}
      ${center[0] + weight * 0.35} ${center[1]}
      ${center[0] + weight} ${center[1] - weight}
      ${center[0]} ${center[1] - weight * 0.35}
      ${center[0] - weight} ${center[1] - weight}
      ${center[0] - weight * 0.35} ${center[1]}
      ${center[0] - weight} ${center[1] + weight}
      `}
    />
  );
};

export default Start;
