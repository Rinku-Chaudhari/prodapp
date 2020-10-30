import React, { useState } from "react";
import "./App.css";
import Landingpage from "./Components/Landingpage/Landingpage";
import Main from "./Components/Main/Main";

import Sidebar from "./Components/Sidebar/Sidebar";
import Context from "./Context/Context";

function App() {
  //settings and userData
  const THEME = localStorage.getItem("theme");
  const FONT = localStorage.getItem("font");
  const USERNAME = localStorage.getItem("username");
  const PROFILE_PIC = localStorage.getItem("profilePic");
  const PINNED = JSON.parse(localStorage.getItem("pinned"));

  const [font, setFont] = useState(FONT ? FONT : "arial");
  const [theme, setTheme] = useState(THEME ? THEME : "skyblue");
  const [mode, setMode] = useState("Pages");
  const [hideSidebar, setHidesidebar] = useState(false);
  const [username, setUsername] = useState(USERNAME ? USERNAME : "undefined");
  const [profilePic, setProfilePic] = useState(PROFILE_PIC ? PROFILE_PIC : "");
  const [pinnedItems, setPinnedItems] = useState(PINNED ? PINNED : []);

  return (
    <div
      className={
        hideSidebar || username === "undefined" ? "sidebar_hidden App" : "App"
      }
    >
      <Context.Provider
        value={{
          theme,
          font,
          mode,
          profilePic,
          pinnedItems,
          hideSidebar,
          setTheme,
          setFont,
          setMode,
          setHidesidebar,
          setPinnedItems,
          setProfilePic,
          username,
          setUsername,
        }}
      >
        <section
          className="landingpage_"
          style={username !== "undefined" ? { display: "none" } : null}
        >
          <Landingpage />
        </section>

        <section
          className="sidebar_"
          style={username === "undefined" ? { display: "none" } : null}
        >
          <Sidebar />
        </section>

        <section
          className="main_"
          style={username === "undefined" ? { display: "none" } : null}
        >
          <Main />
        </section>
      </Context.Provider>
    </div>
  );
}

export default App;
