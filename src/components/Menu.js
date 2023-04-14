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
  duplicateGroup,
} from "../features/groups/groupsSlice";
import { addSectionToItems } from "../features/items/itemsSlice";
import { addStatus } from "../features/statuses/statusesSlice";
import StatusEditMenu from "./menus/StatusEditMenu";

import TableHeaderSectionMenu from "./menus/TableHeaderSectionMenu";
import SectionRenameMenu from "./menus/SectionRenameMenu";
import CellTextarea from "./menus/CellTextarea";
import NumberParametersWindow from "./menus/NumberParametersWindow";
import SectionDescription from "./menus/SectionDescription";
import MoveGroupMenu from "./menus/MoveGroupMenu";
import ItemWindow from "./menus/ItemWindow";
import AddSectionMenu from "./menus/AddSectionMenu";
import LinkEditModal from "./menus/LinkEditModal";

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
    showArchieved,
  } = useSelector((state) => state.menu);

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

    const duplicate = () => {
      dispatch(duplicateGroup({ group }));
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
            <li className="list-animation" onClick={duplicate}>
              Duplicate layout
            </li>
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
    return <AddSectionMenu />;
  }

  if (menuType === "item-window") {
    return <ItemWindow />;
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

  if (menuType === "link-edit") {
    return <LinkEditModal />;
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
