import React from "react";

function CenteredContainer({ children }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "80vh" }}
    >
      {children}
    </div>
  );
}

export default CenteredContainer;
