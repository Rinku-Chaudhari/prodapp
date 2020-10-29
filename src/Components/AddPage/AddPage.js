import React, { useContext, useState } from "react";
import "./AddPage.css";

import { GoPlus, MdCancel } from "react-icons/all";
import db from "../../firebase";
import Context from "../../Context/Context";
import Alertbox from "../Alertbox/Alertbox";

const AddPage = () => {
  const [title, setTitle] = useState("");
  const [pageType, setPagetype] = useState("todos");
  const [isSuccess, setIssuccess] = useState(false);
  const [info, setInfo] = useState("");
  const { username } = useContext(Context);

  const clearInfo = () => {
    setInfo("");
  };

  const addPage = (e) => {
    e.preventDefault();

    if (title.trim() !== "") {
      db.collection(username)
        .doc(title)
        .set({
          type: pageType,
        })
        .then(() => {
          setTitle("");
          setInfo(`Succesfully created a page ${title}!`);
          setIssuccess(true);
        })
        .catch(() => {
          setInfo("Something went wrong!");
          setIssuccess(false);
        });
    } else {
      setInfo("Page title cannot be empty!");
      setIssuccess(false);
    }

    setTimeout(() => {
      clearInfo();
    }, 5000);
  };

  return (
    <div className="add_page">
      <form onSumbit={addPage}>
        <section>
          <div>
            <label htmlFor="title">Page Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="type">Page Type</label>
            <select
              id="type"
              onChange={(e) => setPagetype(e.target.value)}
              value={pageType}
            >
              <option value="todos">Todos</option>
              <option value="notes">Notes</option>
            </select>
          </div>
        </section>

        <section>
          <button type="submit" onClick={addPage}>
            <GoPlus />
            <p>Add</p>
          </button>

          <button>
            <MdCancel />
            <p>Cancel</p>
          </button>
        </section>
      </form>

      <section className="alert_box_">
        <Alertbox success={isSuccess} title={info} close={clearInfo} />
      </section>
    </div>
  );
};

export default AddPage;
