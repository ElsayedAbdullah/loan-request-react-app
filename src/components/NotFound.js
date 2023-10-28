import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>404 not found page</h1>
      <p>This url is not found</p>
      <Link to={"/"}>return to Homepage</Link>
    </div>
  );
}

export default NotFound;
