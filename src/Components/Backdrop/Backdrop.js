import React from "react";
import "./Backdrop.css";

const Backdrop = ({ show, toggler }) => {
  return (
    <div
      className="backdrop"
      style={!show ? { display: "none" } : null}
      onClick={toggler}
    ></div>
  );
};

export default Backdrop;
