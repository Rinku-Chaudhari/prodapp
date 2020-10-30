import React, { useContext } from "react";
import "./Navbar.css";

import { BiMenu, BiCaretDown, GoSignOut } from "react-icons/all";
import Context from "../../Context/Context";
import firebase from "firebase/app";

const Navbar = () => {
  const { setHidesidebar, profilePic } = useContext(Context);

  const toggleDropdown = () => {
    const dropdown = document.querySelector(".dropdown");
    dropdown.classList.toggle("show");
  };

  const Logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.setItem("username", "");
        localStorage.setItem("profilePic", "");
        localStorage.setItem("pinned", "[]");
        localStorage.setItem("font", "arial");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="navbar">
      <section className="left">
        <button onClick={() => setHidesidebar((prev) => !prev)}>
          <BiMenu />
        </button>
      </section>

      <section className="right">
        <button onClick={toggleDropdown}>
          <img src={profilePic} alt="profile_img" />
          <BiCaretDown />
        </button>
      </section>

      <section className="dropdown">
        <button onClick={Logout}>
          <GoSignOut />
          <p>Log out</p>
        </button>
      </section>
    </div>
  );
};

export default Navbar;
