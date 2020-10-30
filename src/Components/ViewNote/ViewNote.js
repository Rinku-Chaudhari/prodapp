import React from "react";
import "./ViewNote.css";

import { FiTrash2 } from "react-icons/all";
import { db } from "../../firebase";
import firebase from "firebase/app";

const ViewNote = ({
  username,
  title,
  description,
  content,
  contentId,
  pageName,
}) => {
  const Delete = () => {
    console.log(title);
    db.collection(username)
      .doc(pageName)
      .update({
        [contentId]: firebase.firestore.FieldValue.delete(),
      });
  };

  return (
    <div className="view_todo">
      <section>
        <section className="top">
          <h2>{title}</h2>
          <section>
            <button onClick={Delete}>
              <FiTrash2 />
            </button>
          </section>
        </section>

        <p className="des">{description}</p>
        <p>{typeof content !== "object" ? content : ""}</p>
      </section>
    </div>
  );
};

export default ViewNote;
