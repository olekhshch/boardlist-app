import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openItemWindow,
  setMenuCoordinates,
} from "../../features/menu/menuSlice";
import {
  addNote,
  deleteNote,
  editNote,
  pinNote,
  unpinNote,
} from "../../features/items/itemsSlice";
import { BsFillPinAngleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";

const ItemWindow = () => {
  const { item, coordinates, group } = useSelector((state) => state.menu);
  const itemId = item.id;
  const { allItems } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const { allStatuses } = useSelector((state) => state.statuses);
  const { content } = group.groupLayout;
  const itemContent = item.content;

  useEffect(() => {
    const refreshedItem = allItems.find((item) => item.id === itemId);
    dispatch(openItemWindow({ item: refreshedItem }));
  }, [allItems]);

  const ItemDetailsList = () => {
    return (
      <ul className="item-window-details flex-col">
        {content.map(({ index, title, type, statusId }) => {
          if (type === "main") {
            return;
          }
          const { value } = itemContent.find(
            (section) => section.layoutIndex === index
          );

          const Value = ({ itemValue, type }) => {
            if (type === "text") {
              return (
                <div className="item-window-value">
                  <input style={{ width: "100%" }} value={itemValue} />
                </div>
              );
            }
            if (type === "number") {
              return (
                <div className="item-window-value">
                  <input
                    type="number"
                    style={{ width: "100%" }}
                    value={itemValue}
                  />
                </div>
              );
            }
            if (type === "status") {
              const status = allStatuses.find((st) => st.id === statusId);
              const cellValue = status.content[itemValue];
              return (
                <div
                  className="item-window-value"
                  style={{
                    backgroundColor: `var(--${itemValue}-main)`,
                    color: "white",
                    justifyContent: "center",
                  }}
                >
                  {cellValue}
                </div>
              );
            }
            return <div className="item-window-value">{itemValue}</div>;
          };

          return (
            <li key={index}>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <label>{title}</label>
                <Value type={type} itemValue={value} />
              </form>
            </li>
          );
        })}
      </ul>
    );
  };

  const mainValue = item.content.find(
    (section) => section.layoutIndex === "t1"
  ).value;

  const { notes } = item;
  const notesCount = notes.length;

  const pinnedNotes = notes
    .filter((note) => note.isPinned)
    .sort((a, b) => a.creationDate);
  const otherNotes = notes.filter((note) => !note.isPinned);

  const dragWindow = (e) => {
    const oldX = e.clientX;
    const oldY = e.clientY;
    console.log(oldX + "_:_" + oldY);
    const mousemove = (ev) => {
      const dX = ev.clientX - oldX;
      const dY = ev.clientY - oldY;
      dispatch(
        setMenuCoordinates({
          coordinates: {
            left: coordinates.left + dX,
            top: coordinates.top + dY,
          },
        })
      );

      window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", mousemove);
      });
    };
    window.addEventListener("mousemove", mousemove);
  };

  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");

  const handleNewNoteSubmit = (e) => {
    e.preventDefault();
    if (newNoteContent.trim() !== "") {
      dispatch(
        addNote({
          itemId: item.id,
          title: newNoteTitle,
          content: newNoteContent,
        })
      );
      dispatch(openItemWindow({ item }));
      setNewNoteContent("");
      setNewNoteTitle("");
    }
  };

  return (
    <div
      className="item-window flex"
      style={{ left: coordinates.left, top: coordinates.top }}
    >
      <section className="flex-col">
        <div className="item-window-header" onMouseDown={dragWindow}>
          <p>{group.title} &gt; </p>
          <h2>{mainValue}</h2>
        </div>
        <div
          className="flex"
          style={{
            marginTop: "20px",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <ItemDetailsList />
        </div>
      </section>
      <div
        style={{ width: "1px", backgroundColor: "var(--grey-contour)" }}
      ></div>
      <section className="flex-col">
        <div className="item-window-header" onMouseDown={dragWindow}>
          <p
            style={{
              paddingLeft: "6px",
              borderBottom: "1px solid var(--grey-contour)",
            }}
          >
            Notes {notesCount > 0 && `(${notesCount})`}
          </p>
        </div>
        <div
          className="flex-col"
          style={{ margin: "10px 10px", width: "400px", overflow: "auto" }}
        >
          <form style={{ width: "380px" }} onSubmit={handleNewNoteSubmit}>
            <div className="item-window-add-note">
              <input
                name="note-title"
                placeholder="Note's title (optional)"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
              />
              <textarea
                placeholder="Write a note..."
                onChange={(e) => setNewNoteContent(e.target.value)}
                value={newNoteContent}
              />
            </div>
            <div className="flex" style={{ justifyContent: "right" }}>
              <input
                type="submit"
                value="Submit"
                className="btn-main blue-main"
              />
            </div>
          </form>
          <div className="notes-conteiner">
            {pinnedNotes.map((note) => (
              <Note note={note} key={note.creationDate} itemId={itemId} />
            ))}
            {otherNotes.map((note) => (
              <Note note={note} key={note.creationDate} itemId={itemId} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Note = ({ note, itemId }) => {
  const { creationDate, title, content, isPinned } = note;
  const noteDate = new Date(creationDate).toLocaleDateString("pl-PL");
  const dispatch = useDispatch();

  const [isEditMode, setIsEditMode] = useState(false);
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteContent, setNoteContent] = useState(content);

  useEffect(() => {
    setNoteContent(content);
    setNoteTitle(title);
  }, [isEditMode]);

  const pin = () => {
    dispatch(pinNote({ itemId, noteCreationDate: creationDate }));
  };
  const unpin = () => {
    dispatch(unpinNote({ itemId, noteCreationDate: creationDate }));
  };
  const remove = () => {
    dispatch(deleteNote({ itemId, noteCreationDate: creationDate }));
  };

  if (isEditMode) {
    const handleSubmit = (e) => {
      e.preventDefault();
      if (noteContent.trim() !== "") {
        dispatch(
          editNote({
            itemId,
            noteCreationDate: creationDate,
            newTitle: noteTitle,
            newContent: noteContent,
          })
        );
        setIsEditMode(false);
      }
    };

    return (
      <div>
        <form style={{ width: "95%" }} onSubmit={handleSubmit}>
          <div className="item-window-add-note">
            <input
              name="note-title"
              placeholder="Note's title (optional)"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <textarea
              placeholder="Can't be empty"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
          </div>
          <div
            className="flex"
            style={{ gap: "10px", justifyContent: "right" }}
          >
            <button
              onClick={() => setIsEditMode(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <input
              type="submit"
              value="Confirm changes"
              className="btn-main blue-main"
              style={{ width: "140px", fontSize: "1em" }}
            />
          </div>
        </form>
      </div>
    );
  }

  return (
    <article className="item-note flex">
      <div className="flex-col flex-grow-1">
        <div
          className="flex flex-grow-1"
          style={{ justifyContent: "space-between" }}
        >
          <h3>
            {isPinned && <BsFillPinAngleFill style={{ marginRight: "4px" }} />}
            {title}
          </h3>
          <span className="note-date">{noteDate}</span>
        </div>
        <div>{content}</div>
      </div>
      <div className="flex-col">
        <button
          className="icon-btn"
          title={isPinned ? "Unpin" : "Pin"}
          onClick={isPinned ? unpin : pin}
        >
          <BsFillPinAngleFill />
        </button>
        <button
          className="icon-btn"
          title="Edit"
          onClick={() => setIsEditMode(true)}
        >
          <FiEdit />
        </button>
        <button className="icon-btn" title="Delete" onClick={remove}>
          <FaTrashAlt />
        </button>
      </div>
    </article>
  );
};

export default ItemWindow;
