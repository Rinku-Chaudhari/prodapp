import React, { useContext } from "react";
import "./Navbar.css";

import { BiMenu, BiCaretDown } from "react-icons/all";
import Context from "../../Context/Context";

const Navbar = () => {
  const { setHidesidebar } = useContext(Context);

  return (
    <div className="navbar">
      <section className="left">
        <button onClick={() => setHidesidebar((prev) => !prev)}>
          <BiMenu />
        </button>
      </section>

      <section className="right">
        <button>
          <img src="https://bit.ly/31DRHAA" alt="profile_img" />
          <BiCaretDown />
        </button>
      </section>
    </div>
  );
};

export default Navbar;
