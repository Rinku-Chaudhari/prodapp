import React, { useContext } from "react";
import "./Main.css";

import Navbar from "../Navbar/Navbar";
import Settings from "../Settings/Settings";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import AddPage from "../AddPage/AddPage";
import Home from "../Home/Home";
import Context from "../../Context/Context";
import PageView from "../PageView/PageView";

const Main = () => {
  const { mode } = useContext(Context);
  const indexOfSlash = mode.indexOf("/");
  let pageName = "";

  if (indexOfSlash >= 0) {
    pageName = mode.slice(indexOfSlash + 2 - 1);
  }

  return (
    <div className="main">
      <Navbar />
      <Breadcrumb
        mainRoute={indexOfSlash < 0 ? mode : mode.slice(0, indexOfSlash)}
        subRoute={pageName}
      />

      <section
        className="page_view_"
        style={indexOfSlash < 0 ? { display: "none" } : null}
      >
        <PageView />
      </section>

      <section
        className="homepage"
        style={mode !== "Pages" ? { display: "none" } : null}
      >
        <Home />
      </section>

      <section
        className="settings_page"
        style={mode !== "Settings" ? { display: "none" } : null}
      >
        <Settings />
      </section>

      <section
        className="add_page_"
        style={mode !== "Add Page" ? { display: "none" } : null}
      >
        <AddPage />
      </section>
    </div>
  );
};

export default Main;
