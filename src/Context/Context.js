import React from "react";

const Context = React.createContext({
  theme: "",
  font: "",
  mode: "",
  hideSidebar: false,
  setTheme: () => {},
  setFont: () => {},
  setMode: () => {},
  setHidesidebar: () => {},
  username: "",
  setUsername: () => {},
});

export default Context;
