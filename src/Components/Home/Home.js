import React, { useContext, useEffect, useState } from "react";
import "./Home.css";

import Context from "../../Context/Context";
import { BiCaretRight } from "react-icons/all";
import { db } from "../../firebase";

const Home = () => {
  const [pages, setPages] = useState([]);
  const { username, setMode } = useContext(Context);

  useEffect(() => {
    db.collection(username).onSnapshot((snapshot) => {
      setPages(snapshot.docs.map((doc) => doc.id));
    });
  }, [username]);

  return (
    <div className="home">
      <h4>My Pages</h4>
      {pages.length > 0 ? (
        pages.map((page) => {
          return (
            <button key={page} onClick={() => setMode("Pages/" + page)}>
              <p>{page}</p>
              <BiCaretRight />
            </button>
          );
        })
      ) : (
        <p style={{ marginTop: "20px" }}>No any pages created yet!</p>
      )}
    </div>
  );
};

export default Home;
