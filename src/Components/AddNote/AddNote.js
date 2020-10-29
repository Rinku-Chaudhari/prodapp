import React, { useContext, useState } from "react";
import "./AddNote.css";

import { GoPlus } from "react-icons/all";
import db from "../../firebase";
import Context from "../../Context/Context";

const AddNote = ({ pageName, setIsSuccess, setInfo, close }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const { username } = useContext(Context);

  const addNote = (e) => {
    e.preventDefault();
    const noteId = `note${(new Date() * Math.random()).toFixed()}`;

    if (
      title.trim() !== "" &&
      description.trim() !== "" &&
      content.trim() !== ""
    ) {
      db.collection(username)
        .doc(pageName)
        .update({
          [noteId]: {
            title,
            description,
            content,
            createdOn: new Date(),
          },
        })
        .then(() => {
          setIsSuccess(true);
          setInfo(`Successfully created a note ${title}!`);
          setTitle("");
          setContent("");
          setDescription("");
          close();
        })
        .catch(() => {
          setIsSuccess(true);
          setInfo(`Something went wrong!`);
        });
    } else {
      setIsSuccess(false);
      setInfo("Title,Description and Content cannot be empty!");
    }

    setTimeout(() => {
      setInfo("");
    }, 3000);
  };

  return (
    <div className="add_note">
      <form onSubmit={addNote}>
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
        <label htmlFor="note_content">Content</label>
        <textarea
          id="note_content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">
          <GoPlus />
          <p>Add</p>
        </button>
      </form>
    </div>
  );
};

export default AddNote;
