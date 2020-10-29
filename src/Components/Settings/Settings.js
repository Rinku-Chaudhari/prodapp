import React, { useContext } from "react";
import "./Settings.css";

import Context from "../../Context/Context";

const Settings = () => {
  const { theme, font, setTheme, setFont } = useContext(Context);

  const SET_THEME = (color) => {
    setTheme(color);
    localStorage.setItem("theme", color);
  };

  const SET_FONT = (f) => {
    setFont(f);
    localStorage.setItem("font", f);
  };

  return (
    <div className="settings">
      <section className="theme">
        <h4>Theme</h4>
        <button
          style={theme === "skyblue" ? { color: "tomato" } : null}
          onClick={() => SET_THEME("skyblue")}
        >
          <img src="https://bit.ly/3mgKnTk" alt="skyblue" />
          <p>Skyblue</p>
        </button>

        <button
          style={theme === "coral" ? { color:"tomato" } : null}
          onClick={() => SET_THEME("coral")}
        >
          <img src="https://bit.ly/3juM0Ls" alt="coral" />
          <p>Coral</p>
        </button>
      </section>

      <section className="font">
        <h4>Font</h4>
        <button
          style={font === "arial" ? { color:"tomato" } : null}
          onClick={() => SET_FONT("arial")}
        >
          <img src="https://bit.ly/3kxUJ0A" alt="default" />
          <p>Default</p>
        </button>

        <button>
          <img src="https://bit.ly/3kxUJ0A" alt="pro" />
          <p>Pro</p>
        </button>
      </section>
    </div>
  );
};

export default Settings;
