import React, { useContext } from "react";
import "./Landingpage.css";

import { FcGoogle } from "react-icons/all";
import firebase from "firebase/app";
import { auth } from "../../firebase";
import Context from "../../Context/Context";

const Landingpage = () => {
  const { setProfilePic, setUsername } = useContext(Context);
  const SignInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(auth)
      .then((res) => {
        localStorage.setItem("username", res.user.uid);
        localStorage.setItem("profilePic", res.user.photoURL);
        localStorage.setItem("pinned", "[]");
        setProfilePic(res.user.photoURL);
        setUsername(res.user.uid);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="landing_page">
      <h4>ProdApp for better productivity!</h4>
      <button onClick={SignInWithGoogle}>
        <FcGoogle />
        <p>Login with google</p>
      </button>
    </div>
  );
};

export default Landingpage;
