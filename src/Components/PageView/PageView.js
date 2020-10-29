import React, { useContext, useEffect, useState } from "react";
import "./PageView.css";

import Context from "../../Context/Context";
import db from "../../firebase";
import { TiPin, FiTrash2, GoPlus } from "react-icons/all";
import DeleteModal from "../DeleteModal/DeleteModal";
import Alertbox from "../Alertbox/Alertbox";
import ViewNote from "../ViewNote/ViewNote";
import AddNote from "../AddNote/AddNote";
import ViewTodo from "../ViewTodo/ViewTodo";
import AddTodos from "../AddTodos/AddTodos";

const PageView = () => {
  const [pageContent, setPageContent] = useState([]);
  const [pageType, setPageType] = useState("");
  const [info, setInfo] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { username, mode, pinnedItems, setPinnedItems } = useContext(Context);
  const indexOfSlash = mode.indexOf("/");

  const toggleDeleteModal = () => {
    const deleteModal = document.querySelector(".delete_modal_");
    deleteModal.classList.toggle("show");
  };

  const clearInfo = () => {
    setInfo("");
  };

  useEffect(() => {
    db.collection(username)
      .doc(mode.slice(indexOfSlash + 2 - 1))
      .onSnapshot((doc) => {
        if (doc.exists) {
          const entries = Object.entries(doc.data());
          const finalData = [];

          if (doc.data().type === "notes") {
            for (let e in entries) {
              finalData.push({
                contentId: entries[e][0],
                title: entries[e][1].title,
                content: entries[e][1].content,
                description: entries[e][1].description,
                createdOn: entries[e][1].createdOn,
              });
            }
          } else {
            for (let e in entries) {
              finalData.push({
                contentId: entries[e][0],
                title: entries[e][1].title,
                content: entries[e][1].content,
                description: entries[e][1].description,
                createdOn: entries[e][1].createdOn,
              });
            }
          }
          setPageType(doc.data()?.type);

          const filteredFinalData = finalData.filter((data) => {
            return data.contentId !== "type";
          });

          setPageContent(filteredFinalData);
        }
      });
  }, [mode]);

  const pinUnpin = () => {
    if (!pinnedItems.includes(mode.slice(indexOfSlash + 2 - 1))) {
      const newPinnedItems = [...pinnedItems, mode.slice(indexOfSlash + 2 - 1)];
      setPinnedItems(newPinnedItems);
      localStorage.setItem("pinned", JSON.stringify(newPinnedItems));
      setInfo("Successfully pinned");
      setIsSuccess(true);
    } else {
      const filteredPinnnedItems = pinnedItems.filter((item) => {
        return item !== mode.slice(indexOfSlash + 2 - 1);
      });
      setPinnedItems(filteredPinnnedItems);
      localStorage.setItem("pinned", JSON.stringify(filteredPinnnedItems));
      setInfo("Successfully unpinned");
      setIsSuccess(true);
    }
    setTimeout(() => {
      setInfo("");
    }, 3000);
  };

  const toggleAddNoteSection = () => {
    const addNoteSection = document.querySelector(".add_note_");
    addNoteSection.classList.toggle("show");
  };

  const toggleAddTodosSection = () => {
    const addTodosSection = document.querySelector(".add_todos_");
    addTodosSection.classList.toggle("show");
  };

  const alignedPageContents = pageContent.sort((a, b) => {
    return b.createdOn - a.createdOn;
  });

  return (
    <div className="page_view">
      <section className="top_bar">
        <button
          style={pageType !== "todos" ? { display: "none" } : null}
          onClick={toggleAddTodosSection}
        >
          <GoPlus />
          <p>New Todolist</p>
        </button>
        <button
          style={pageType !== "notes" ? { display: "none" } : null}
          onClick={toggleAddNoteSection}
        >
          <GoPlus />
          <p>New Note</p>
        </button>
        <button
          style={
            pinnedItems.includes(mode.slice(indexOfSlash + 2 - 1))
              ? { display: "none" }
              : null
          }
          onClick={pinUnpin}
        >
          <TiPin />
          <p>Pin at sidebar</p>
        </button>
        <button
          style={
            !pinnedItems.includes(mode.slice(indexOfSlash + 2 - 1))
              ? { display: "none" }
              : {
                  background: "coral",
                  color: "white",
                  border: "Solid 1px coral",
                }
          }
          onClick={pinUnpin}
        >
          <TiPin />
          <p>Unpin from sidebar</p>
        </button>

        <button onClick={toggleDeleteModal}>
          <FiTrash2 />
          <p>Delete Page</p>
        </button>
      </section>

      <section className="add_note_">
        <AddNote
          pageName={mode.slice(indexOfSlash + 2 - 1)}
          setIsSuccess={setIsSuccess}
          setInfo={setInfo}
          close={toggleAddNoteSection}
        />
      </section>

      <section className="add_todos_">
        <AddTodos
          pageName={mode.slice(indexOfSlash + 2 - 1)}
          setIsSuccess={setIsSuccess}
          setInfo={setInfo}
          close={toggleAddTodosSection}
        />
      </section>

      <section className="content">
        {pageType === "notes" ? (
          alignedPageContents.length > 0 ? (
            alignedPageContents.map((content) => {
              return (
                <ViewNote
                  key={content.contentId}
                  title={content.title}
                  description={content.description}
                  content={content.content}
                  contentId={content.contentId}
                  pageName={mode.slice(indexOfSlash + 2 - 1)}
                  username={username}
                />
              );
            })
          ) : (
            <p>Start adding notes to see them here!</p>
          )
        ) : alignedPageContents.length > 0 ? (
          alignedPageContents.map((todo) => {
            return (
              <ViewTodo
                key={todo.contentId}
                title={todo.title}
                description={todo.description}
                content={todo.content}
                contentId={todo.contentId}
                pageName={mode.slice(indexOfSlash + 2 - 1)}
                username={username}
                pageContent={pageContent}
              />
            );
          })
        ) : (
          <p>Start adding todos to see them here</p>
        )}
      </section>

      <section className="delete_modal_">
        <DeleteModal
          setIsSuccess={setIsSuccess}
          setInfo={setInfo}
          title={mode.slice(indexOfSlash + 2 - 1)}
          close={toggleDeleteModal}
        />
      </section>

      <section className="alertbox__">
        <Alertbox success={isSuccess} title={info} close={clearInfo} />
      </section>
    </div>
  );
};

export default PageView;
