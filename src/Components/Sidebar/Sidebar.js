import React, { useContext } from "react";
import "./Sidebar.css";

import { IoMdSettings, GoPlus, RiFileList2Line } from "react-icons/all";
import Context from "../../Context/Context";

const Sidebar = () => {
  const { mode, setMode, theme } = useContext(Context);

  return (
    <div className="sidebar">
      <h4>ProdApp</h4>
      <section className="buttons">
        <button
          className={mode.includes("Pages") ? "active-" + theme : null}
          onClick={() => setMode("Pages")}
        >
          <RiFileList2Line />
          <p>My Pages</p>
        </button>

        <button
          className={mode === "Settings" ? "active-" + theme : null}
          onClick={() => setMode("Settings")}
        >
          <IoMdSettings />
          <p>Settings</p>
        </button>

        <button
          className={mode === "Add Page" ? "active-" + theme : null}
          onClick={() => setMode("Add Page")}
        >
          <GoPlus />
          <p>Add Page</p>
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
