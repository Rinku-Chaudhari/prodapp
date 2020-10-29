import React, { useContext } from "react";
import "./Breadcrumb.css";

import { MdKeyboardArrowRight } from "react-icons/all";
import Context from "../../Context/Context";

const Breadcrumb = ({ mainRoute, subRoute }) => {
  const { setMode } = useContext(Context);
  return (
    <div className="breadcrumb">
      <p
        className={subRoute ? "make_link" : null}
        onClick={subRoute ? () => setMode("Pages") : null}
      >
        {mainRoute}
      </p>
      <MdKeyboardArrowRight
        style={!subRoute ? { display: "none" } : { fontSize: "16px" }}
      />
      <p>{subRoute}</p>
    </div>
  );
};

export default Breadcrumb;
