import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeValue, deleteItemsByGroup } from "../features/items/itemsSlice";
import {
  closeMenu,
  setMenuCoordinates,
  openGroupThemePicker,
  openStatusEditMenu,
  openGroupMoveMenu,
} from "../features/menu/menuSlice";
import {
  toggleIsCollapsed,
  setTheme,
  addGroupLayoutSection,
  addNumberSection,
  deleteGroup,
} from "../features/groups/groupsSlice";
import { addSectionToItems } from "../features/items/itemsSlice";
import { addStatus } from "../features/statuses/statusesSlice";
import StatusEditMenu from "./menus/StatusEditMenu";

import { TiDocumentText } from "react-icons/ti";
import { TbNumbers, TbLayoutList, TbFlag3Filled } from "react-icons/tb";
import TableHeaderSectionMenu from "./menus/TableHeaderSectionMenu";
import SectionRenameMenu from "./menus/SectionRenameMenu";
import CellTextarea from "./menus/CellTextarea";
import NumberParametersWindow from "./menus/NumberParametersWindow";
import SectionDescription from "./menus/SectionDescription";
import MoveGroupMenu from "./menus/MoveGroupMenu";

const Menu = () => {
  const {
    coordinates,
    menuType,
    statusContent,
    itemId,
    groupId,
    group,
    sectionIndex,
    item,
  } = useSelector((state) => state.menu);

  const statusesState = useSelector((state) => state.statuses);
  const dispatch = useDispatch();

  console.log(menuType);
  useEffect(() => {
    const closeMenuEvent = () => {
      dispatch(closeMenu());
      window.removeEventListener("click", closeMenuEvent);
    };

    document.getElementById("board").addEventListener("click", closeMenuEvent);
  }, []);

  if (menuType === "group-menu") {
    const collapseGroup = () => {
      dispatch(toggleIsCollapsed(groupId));
      dispatch(closeMenu());
    };

    const openThemeMenu = () => {
      dispatch(openGroupThemePicker());
    };

    const removeGroup = () => {
      dispatch(deleteItemsByGroup({ groupId }));
      dispatch(deleteGroup({ groupId }));
      dispatch(closeMenu());
    };

    const handleMoveClick = (e) => {
      const { left, width, top } = e.target.getBoundingClientRect();
      dispatch(
        openGroupMoveMenu({
          coordinates: { left: left + 0.5 * width, top: top - 100 },
        })
      );
    };

    return (
      <>
        <div
          className="menu"
          style={{ left: coordinates.left, top: coordinates.top }}
        >
          <ul>
            <li className="list-animation" onClick={collapseGroup}>
              Collapse
            </li>
            <li className="list-animation" onClick={openThemeMenu}>
              Change colour...
            </li>
            <li className="list-animation">Duplicate</li>
            <li className="list-animation" onClick={handleMoveClick}>
              Move to...
            </li>
            <li className="list-animation">Rename</li>
            <li className="list-animation" onClick={removeGroup}>
              Delete
            </li>
          </ul>
        </div>
      </>
    );
  }

  if (menuType === "group-move") {
    return <MoveGroupMenu />;
  }

  if (menuType === "section-description") {
    return <SectionDescription />;
  }
  if (menuType === "group-theme") {
    const setGroupTheme = (e) => {
      const themeValue = e.target.dataset.theme;
      dispatch(setTheme({ groupId, theme: themeValue }));
    };

    return (
      <div
        className="menu flex-col"
        style={{ left: coordinates.left, top: coordinates.top, gap: "6px" }}
      >
        <div className="flex" style={{ gap: "6px" }}>
          <div
            className="theme-picker blue-main"
            data-theme="blue"
            onClick={setGroupTheme}
          ></div>
          <div
            className="theme-picker green-main"
            data-theme="green"
            onClick={setGroupTheme}
          ></div>
          <div
            className="theme-picker red-main"
            data-theme="red"
            onClick={setGroupTheme}
          ></div>
          <div
            className="theme-picker yellow-main"
            data-theme="yellow"
            onClick={setGroupTheme}
          ></div>
        </div>
        <div className="flex" style={{ gap: "6px" }}>
          <div
            className="theme-picker"
            style={{ backgroundColor: "var(--pink-main)" }}
            data-theme="pink"
            onClick={setGroupTheme}
          ></div>
          <div
            className="theme-picker"
            style={{ backgroundColor: "var(--orange-main)" }}
            data-theme="orange"
            onClick={setGroupTheme}
          ></div>
          <div
            className="theme-picker"
            style={{ backgroundColor: "var(--turquoise-main)" }}
            data-theme="turquoise"
            onClick={setGroupTheme}
          ></div>
          <div
            className="theme-picker"
            style={{ backgroundColor: "var(--violet-main)" }}
            data-theme="violet"
            onClick={setGroupTheme}
          ></div>
        </div>
      </div>
    );
  }

  if (menuType === "status-edit") {
    return <StatusEditMenu />;
  }

  if (menuType === "add-section") {
    const addLayoutSection = (type) => {
      const { lastIndex } = group.groupLayout;
      if (type === "text") {
        dispatch(
          addSectionToItems({
            type,
            groupId: group.id,
            newIndex: `t${lastIndex + 1}`,
          })
        );
        dispatch(addGroupLayoutSection({ type, groupId: group.id }));
      }
      if (type === "status") {
        dispatch(addStatus(group.id));
        dispatch(
          addSectionToItems({
            type,
            groupId: group.id,
            newIndex: `t${lastIndex + 1}`,
          })
        );
        dispatch(
          addGroupLayoutSection({
            type,
            groupId: group.id,
            statusId: `s${statusesState.lastIndex + 1}`,
            newIndex: `t${lastIndex + 1}`,
          })
        );
      }
      if (type === "number") {
        dispatch(
          addSectionToItems({
            type,
            groupId: group.id,
            newIndex: `t${lastIndex + 1}`,
          })
        );
        dispatch(
          addNumberSection({ groupId: group.id, newIndex: `t${lastIndex + 1}` })
        );
      }
      dispatch(closeMenu());
    };

    return (
      <div
        className="menu"
        style={{
          left: coordinates.left,
          top: coordinates.top,
          textTransform: "capitalize",
        }}
      >
        <ul>
          <li
            onClick={() => addLayoutSection("text")}
            style={{ alignItems: "center", display: "flex" }}
          >
            <TiDocumentText style={{ marginRight: "4px", fontSize: "1.2em" }} />{" "}
            text
          </li>
          <li
            onClick={() => addLayoutSection("number")}
            style={{ alignItems: "center", display: "flex" }}
          >
            <TbNumbers style={{ marginRight: "4px", fontSize: "1.2em" }} />{" "}
            number
          </li>
          <li
            onClick={() => addLayoutSection("status")}
            style={{ alignItems: "center", display: "flex" }}
          >
            <TbLayoutList style={{ marginRight: "4px", fontSize: "1.2em" }} />{" "}
            status
          </li>
          <li
            onClick={() => addLayoutSection("priority")}
            style={{ alignItems: "center", display: "flex" }}
          >
            <TbFlag3Filled style={{ marginRight: "4px", fontSize: "1.2em" }} />{" "}
            priority
          </li>
        </ul>
      </div>
    );
  }
  if (menuType === "item-window") {
    const mainValue = item.content.find(
      (section) => section.layoutIndex === "t1"
    ).value;

    const { notes } = item;
    const notesCount = notes.length;
    const counterText = () => {
      if (notesCount === 0) {
        return "No notes";
      }
      if (notesCount === 1) {
        return "1 note";
      }

      return `${notesCount} notes`;
    };
    const pinnedNotes = notes.filter((note) => note.isPinned);
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

    return (
      <div
        className="item-window flex-col"
        style={{ left: coordinates.left, top: coordinates.top }}
      >
        <section className="item-window-header" onMouseDown={dragWindow}>
          <h4>{mainValue}</h4>
          <p>{counterText()}</p>
        </section>
        <form className="flex-col new-note-form">
          <input placeholder="Name" />
          <textarea placeholder="New note" />
          <div className="flex" style={{ justifyContent: "right" }}>
            <input type="submit" value="Add" className="btn-main blue-main" />
          </div>
        </form>
        <section className="item-notes flex-col">
          {pinnedNotes.map((note) => {
            const { header, content } = note;
            return (
              <article className="note">
                <h4>Pinned: {header}</h4>
                <p>{content}</p>
              </article>
            );
          })}
          {otherNotes.map((note) => {
            const { header, content } = note;
            return (
              <article className="note">
                <h4>{header}</h4>
                <p>{content}</p>
              </article>
            );
          })}
        </section>
      </div>
    );
  }

  if (menuType === "section-settings") {
    return <TableHeaderSectionMenu />;
  }

  if (menuType === "section-rename") {
    return <SectionRenameMenu />;
  }

  if (menuType === "cell-textarea") {
    return <CellTextarea />;
  }

  if (menuType === "number-parameters") {
    return <NumberParametersWindow />;
  }

  if (menuType === "status-list") {
    const setStatus = (e) => {
      const newValue = e.target.dataset.colourValue;
      dispatch(changeValue({ newValue, itemId, layoutIndex: sectionIndex }));
      dispatch(closeMenu());
    };

    const openEditMenu = () => {
      dispatch(openStatusEditMenu());
    };

    return (
      <div
        className="board-menu flex-col"
        style={{ left: coordinates.left, top: coordinates.top }}
      >
        <div className="status-list flex-col">
          {Object.entries(statusContent).map(([colour, value]) => {
            return (
              <div
                key={colour}
                onClick={setStatus}
                data-colour-value={colour}
                className="table-section flex cell-status"
                style={{
                  width: `150px`,
                  backgroundColor: `var(--${colour}-main)`,
                }}
              >
                {value}
              </div>
            );
          })}
        </div>
        <button className="btn-secondary" onClick={openEditMenu}>
          Edit
        </button>
      </div>
    );
  }
};

export default Menu;
