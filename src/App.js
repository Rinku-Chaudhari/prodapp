import React, { useState } from "react";
import "./App.css";
import Main from "./Components/Main/Main";

import Sidebar from "./Components/Sidebar/Sidebar";
import Context from "./Context/Context";

function App() {
  //settings and userData
  const THEME = localStorage.getItem("theme");
  const FONT = localStorage.getItem("font");

  const [font, setFont] = useState(FONT ? FONT : "arial");
  const [theme, setTheme] = useState(THEME ? THEME : "skyblue");
  const [mode, setMode] = useState("Pages");
  const [hideSidebar, setHidesidebar] = useState(false);
  const [username, setUsername] = useState("rinku");

  return (
    <div className={hideSidebar ? "sidebar_hidden App" : "App"}>
      <Context.Provider
        value={{
          theme,
          font,
          mode,
          hideSidebar,
          setTheme,
          setFont,
          setMode,
          setHidesidebar,
          username,
          setUsername,
        }}
      >
        <section className="sidebar_">
          <Sidebar />
        </section>

        <section className="main_">
          <Main />
        </section>
      </Context.Provider>
    </div>
  );
}

export default App;
