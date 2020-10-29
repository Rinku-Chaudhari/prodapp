import React from "react";
import "./ViewTodo.css";

import { FiTrash2 } from "react-icons/all";
import db from "../../firebase";
import firebase from "firebase/app";

const ViewTodo = ({
  title,
  description,
  content,
  contentId,
  username,
  pageName,
  pageContent,
}) => {
  const Delete = () => {
    db.collection(username)
      .doc(pageName)
      .update({
        [contentId]: firebase.firestore.FieldValue.delete(),
      });
  };

  const ToggleBox = () => {};

  const checkUncheck = (val, d) => {
    const todoIndex = content.findIndex((e) => {
      return e.value === val;
    });
    const contentIndex = pageContent.findIndex((e) => {
      return e.contentId === contentId;
    });
    const contentCopy = {
      ...pageContent[contentIndex],
    };
    contentCopy.content[todoIndex].done = !d;

    db.collection(username)
      .doc(pageName)
      .update({
        [contentId]: contentCopy,
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

        <div className="todos">
          {typeof content === "object"
            ? content?.map((todo) => {
                return (
                  <div key={new Date() * Math.random()}>
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => checkUncheck(todo.value, todo.done)}
                    />
                    <p
                      style={
                        todo.done ? { textDecoration: "line-through" } : null
                      }
                    >
                      {todo.value}
                    </p>
                  </div>
                );
              })
            : ""}
        </div>
      </section>
    </div>
  );
};

export default ViewTodo;
