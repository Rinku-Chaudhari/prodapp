import React from "react";

const Context = React.createContext({
  theme: "",
  font: "",
  mode: "",
  pinnedItems: [],
  hideSidebar: false,
  setTheme: () => {},
  setFont: () => {},
  setMode: () => {},
  setHidesidebar: () => {},
  setPinnedItems: () => {},
  username: "",
  setUsername: () => {},
});

export default Context;
