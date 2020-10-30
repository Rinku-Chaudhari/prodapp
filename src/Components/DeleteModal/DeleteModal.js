import React, { useContext } from "react";
import "./DeleteModal.css";

import { FiTrash2, TiDeleteOutline } from "react-icons/all";
import { db } from "../../firebase";
import Context from "../../Context/Context";

const DeleteModal = ({ title, setInfo, setIsSuccess, close }) => {
  const { username, setMode, pinnedItems, setPinnedItems } = useContext(
    Context
  );

  const Delete = () => {
    close();
    db.collection(username)
      .doc(title)
      .delete()
      .then(() => {
        setInfo("Page deleted Successfully!");
        setIsSuccess(true);
        const filteredPinnnedItems = pinnedItems.filter((item) => {
          return item !== title;
        });
        setPinnedItems(filteredPinnnedItems);
        localStorage.setItem("pinned", JSON.stringify(filteredPinnnedItems));

        setTimeout(() => {
          setMode("Pages");
          setInfo("");
        }, 2000);
      })
      .catch(() => {
        setInfo("Something went wrong!");
        setIsSuccess(false);
      });
  };

  return (
    <div className="delete_modal">
      <p>Do you surely want to delete {title}?</p>
      <section>
        <button onClick={Delete}>
          <FiTrash2 />
          <p style={{ color: "red" }}>Delete</p>
        </button>
        <button onClick={close}>
          <TiDeleteOutline />
          <p>Cancel</p>
        </button>
      </section>
    </div>
  );
};

export default DeleteModal;
