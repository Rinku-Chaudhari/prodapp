import React from "react";

const Context = React.createContext({
  theme: "",
  font: "",
  mode: "",
  profilePic: "",
  pinnedItems: [],
  hideSidebar: false,
  setTheme: () => {},
  setFont: () => {},
  setMode: () => {},
  setHidesidebar: () => {},
  setPinnedItems: () => {},
  setProfilePic: () => {},
  username: "",
  setUsername: () => {},
});

export default Context;
