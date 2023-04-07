import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeValue } from "../features/items/itemsSlice";
import {
  openStatusListMenu,
  openItemWindow,
  expandCellTextarea,
} from "../features/menu/menuSlice";
import { GoNote } from "react-icons/go";
import { CgExpand } from "react-icons/cg";
import { BsFillArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs";
import Notes from "./icons/Notes";

const Cell = ({
  width,
  value,
  type,
  itemId,
  sectionIndex,
  increment,
  statusId,
  theme,
  isArchieved,
  item,
  group,
}) => {
  const dispatch = useDispatch();
  const { allStatuses } = useSelector((state) => state.statuses);
  const [cellValue, setCellValue] = useState(value);

  const cellCont = useRef(null);

  useEffect(() => {
    setCellValue(value);
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "main" && cellValue === "") {
      setCellValue(value);
    }
    dispatch(
      changeValue({ newValue: cellValue, itemId, layoutIndex: sectionIndex })
    );
  };

  //not applied to main
  const handleChange = (e) => {
    const newValue = e.target.value;
    dispatch(changeValue({ newValue, itemId, layoutIndex: sectionIndex }));
  };

  if (type === "status") {
    let colour = "grey-contour";
    let cellValue = "";
    const status = allStatuses.find((status) => status.id === statusId);
    if (value !== "") {
      try {
        colour = `${value}-main`;
        cellValue = status.content[value];
      } catch (er) {
        console.log(er);
        colour = "grey-contour";
        cellValue = "";
      }
    }

    const openStatusMenu = (e) => {
      const { left, top } = e.target.getBoundingClientRect();
      dispatch(
        openStatusListMenu({
          type: "status-list",
          coordinates: { left, top },
          statusId: status.id,
          statusContent: status.content,
          itemId,
          sectionIndex,
        })
      );
    };

    return (
      <div
        className="table-section flex cell-status"
        onClick={openStatusMenu}
        style={{ width: `${width}px`, backgroundColor: `var(--${colour})` }}
      >
        {cellValue}
      </div>
    );
  }

  if (type === "number") {
    const increase = () => {
      const newValue =
        parseInt(value ? value : 0, 10) + parseInt(increment, 10);
      dispatch(changeValue({ newValue, itemId, layoutIndex: sectionIndex }));
    };

    const decrease = () => {
      const newValue =
        parseInt(value ? value : 0, 10) - parseInt(increment, 10);
      dispatch(changeValue({ newValue, itemId, layoutIndex: sectionIndex }));
    };
    return (
      <div style={{ position: "relative" }} className="cell-container">
        <form
          className="table-section flex-col"
          style={{
            width: `${width}px`,
          }}
          onSubmit={handleSubmit}
        >
          <input
            type="number"
            className="flex-grow-1"
            value={cellValue}
            onChange={handleChange}
            style={{ color: isArchieved && `var(--${theme}-grey)` }}
          />
        </form>
        <div
          className="flex cell-btn-conteiner"
          style={{ gap: "2px", marginTop: "2px", marginRight: "2px" }}
        >
          <button onClick={decrease}>
            <BsArrowDownCircleFill
              className="icon"
              style={{ fontSize: "1em" }}
            />
          </button>
          <button onClick={increase}>
            <BsFillArrowUpCircleFill
              className="icon"
              style={{ fontSize: "1em" }}
            />
          </button>
        </div>
      </div>
    );
  }

  if (type === "main") {
    const { notes } = item;
    const notesCounter = notes.length;

    const NotesBtn = () => {
      return (
        <button
          className={notesCounter > 0 ? "item-notes-btn" : "item-notes-hidden"}
          onClick={() => dispatch(openItemWindow({ item, group }))}
          style={{ margin: "3px 6px", position: "relative" }}
        >
          <Notes height="20" colour={theme} />
          {notesCounter > 0 && (
            <div
              className="notes-counter"
              style={{ backgroundColor: `var(--${theme}-main)` }}
            >
              {notesCounter}
            </div>
          )}
        </button>
      );
    };

    return (
      <div style={{ position: "relative" }}>
        <form
          className="table-section flex-col"
          style={{ width: `${width}px` }}
          onSubmit={handleSubmit}
        >
          <input
            className="flex-grow-1"
            style={{ color: isArchieved && `var(--${theme}-grey)` }}
            value={cellValue}
            onChange={(e) => setCellValue(e.target.value)}
          />
        </form>
        <div className="main-btn-conteiner">
          <NotesBtn />
        </div>
      </div>
    );
  }

  //type === 'text'

  const expand = () => {
    const { left, top } = cellCont.current.getBoundingClientRect();
    const payload = {
      width,
      initialInputValue: value,
      coordinates: { left, top },
      itemId,
      sectionId: sectionIndex,
    };

    dispatch(expandCellTextarea(payload));
  };

  return (
    <div
      style={{ position: "relative" }}
      className="cell-container"
      ref={cellCont}
    >
      <form
        className="table-section flex-col"
        style={{ width: `${width}px` }}
        onSubmit={handleSubmit}
      >
        <input
          className="flex-grow-1"
          style={{ color: isArchieved && `var(--${theme}-grey)` }}
          value={cellValue}
          onChange={handleChange}
        />
      </form>
      <div className="cell-btn-conteiner">
        <button onClick={expand}>
          <CgExpand className="icon" />
        </button>
      </div>
    </div>
  );
};

export default Cell;
