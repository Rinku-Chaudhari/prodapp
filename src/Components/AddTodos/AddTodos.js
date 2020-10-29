import React, { useState, useContext } from "react";
import "./AddTodos.css";

import db from "../../firebase";
import Context from "../../Context/Context";
import { GoPlus } from "react-icons/all";

const AddTodos = ({ pageName, setInfo, setIsSuccess, close }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState([]);
  const [todo, setTodo] = useState("");
  const { username } = useContext(Context);

  const addToTodos = () => {
    const itemIndex = content.findIndex((e) => {
      return e.value === todo;
    });

    if (todo.trim() !== "") {
      if (itemIndex >= 0) {
        setInfo("Todo cannot be duplicated!");
        setIsSuccess(false);
      } else {
        setContent((prev) => [...prev, { done: false, value: todo }]);
        setTodo("");
      }
    } else {
      setInfo("Todo Cannot be empty!");
      setIsSuccess(false);
    }

    setTimeout(() => {
      setInfo("");
    }, 2000);
  };

  const addTodos = (e) => {
    e.preventDefault();
    const todoId = `todo${(new Date() * Math.random()).toFixed()}`;

    if (
      title.trim() !== "" &&
      description.trim() !== "" &&
      content.length > 0
    ) {
      db.collection(username)
        .doc(pageName)
        .update({
          [todoId]: {
            title,
            description,
            content,
            createdOn: new Date(),
          },
        })
        .then(() => {
          setIsSuccess(true);
          setInfo(`Successfully created a todolist ${title}!`);
          setTitle("");
          setTodo("");
          setContent([]);
          setDescription("");
          close();
        })
        .catch(() => {
          setIsSuccess(true);
          setInfo(`Something went wrong!`);
        });
    } else {
      setIsSuccess(false);
      setInfo("Title,Description or Todos cannot be empty!");
    }

    setTimeout(() => {
      setInfo("");
    }, 3000);
  };

  return (
    <div className="add_todos">
      <div className="form">
        <label htmlFor="note_title">Title</label>
        <input
          type="text"
          name=""
          id="note_title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="note_description">Description</label>
        <input
          type="text"
          name=""
          id="note_description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="todo">Add Todo</label>
        <section className="add_todo">
          <input
            type="text"
            id="todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button onClick={addToTodos}>
            <GoPlus />
            <p>Add Todo to Todolist</p>
          </button>
        </section>

        <section className="show_todolist">
          {content.length > 0 ? (
            content.map((e) => {
              return <li key={new Date() * Math.random()}>{e.value}</li>;
            })
          ) : (
            <p>No any todos added yet</p>
          )}
        </section>

        <button type="submit" onClick={addTodos}>
          <GoPlus />
          <p>Add Todolist</p>
        </button>
      </div>
    </div>
  );
};

export default AddTodos;
