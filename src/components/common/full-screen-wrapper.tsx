import React from "react";

const FullScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        height: "95vh",
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      {children}
    </div>
  );
};

export default FullScreenWrapper;
