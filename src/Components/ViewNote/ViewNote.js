import React, { useState } from "react";
import "./ViewNote.css";

import { FiTrash2, GrEdit, TiDeleteOutline } from "react-icons/all";
import db from "../../firebase";

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

  const ToggleBox = () => {
    const deleteConfirmBox = document.querySelector(".delete_confirmation");
    deleteConfirmBox.classList.toggle("show");
  };

  return (
    <div className="view_note">
      <section>
        <section className="top">
          <h2>{title}</h2>
          <section>
            <button>
              <GrEdit />
            </button>
            <button onClick={Delete}>
              <FiTrash2 />
            </button>
          </section>
        </section>

        <p className="des">{description}</p>
        <p>{content}</p>
      </section>

      <section className="delete_confirmation">
        <p>Do you surely want to delete {title}?</p>
        <section>
          <button onClick={Delete}>
            <FiTrash2 />
            <p style={{ color: "red" }}>Delete</p>
          </button>
          <button onClick={ToggleBox}>
            <TiDeleteOutline />
            <p>Cancel</p>
          </button>
        </section>
      </section>
    </div>
  );
};

export default ViewNote;
