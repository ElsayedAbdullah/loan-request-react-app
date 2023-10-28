import React from "react";
import { Outlet } from "react-router-dom";

function PostLayout() {
  return (
    <div>
      <header style={{ background: "green" }}>Header</header>
      <Outlet />
      <header style={{ background: "brown" }}>Footer</header>
    </div>
  );
}

export default PostLayout;
