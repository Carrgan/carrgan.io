import React from "react";

interface ILayout {
  leftMenu?: JSX.Element;
  children: React.ReactElement;
  rightMenu?: JSX.Element;
}

const MainLayout = ({ leftMenu, children, rightMenu }: ILayout) => {
  return (
    <div className="main-wrapper mainWrapper_PEsc">
      <div className="container margin-vert--lg">
        <div className="row">
          <aside className="col col--3">{leftMenu}</aside>
          <main className="col col--7">{children}</main>
          <div className="col col--2">{rightMenu}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
