import React from "react";
import "./Alertbox.css";

import { MdClose, FcCheckmark, FcHighPriority } from "react-icons/all";

const Alertbox = ({ success, title, close }) => {
  return (
    <div className="alertbox" style={!title ? { display: "none" } : null}>
      <section>
        <div className="success" style={!success ? { display: "none" } : null}>
          <FcCheckmark />
        </div>

        <div className="failed" style={success ? { display: "none" } : null}>
          <FcHighPriority />
        </div>

        <p>{title}</p>
      </section>

      <button onClick={close} className="close_btn">
        <MdClose />
      </button>
    </div>
  );
};

export default Alertbox;
