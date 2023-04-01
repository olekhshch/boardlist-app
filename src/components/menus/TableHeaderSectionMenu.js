import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSection } from "../../features/groups/groupsSlice";
import { removeItemSection } from "../../features/items/itemsSlice";
import {
  closeMenu,
  openNumberParameters,
  openSectionDescriptionWindow,
  openSectionRename,
} from "../../features/menu/menuSlice";

const TableHeaderSectionMenu = () => {
  const { subType, coordinates, groupId, sectionId } = useSelector(
    (state) => state.menu
  );

  const dispatch = useDispatch();

  const remove = () => {
    dispatch(removeSection({ groupId, sectionId }));
    dispatch(removeItemSection({ groupId, sectionId }));
    dispatch(closeMenu());
  };

  const rename = () => {
    dispatch(openSectionRename());
  };

  const openAddDescription = (e) => {
    const { left, top } = e.target.getBoundingClientRect();
    dispatch(openSectionDescriptionWindow({ coordinates: { left, top } }));
  };

  if (subType === "main") {
    return (
      <div
        className="menu"
        style={{ left: coordinates.left, top: coordinates.top }}
      >
        <ul>
          <li onClick={rename}>Rename</li>
          <li onClick={openAddDescription}>Add description</li>
        </ul>
      </div>
    );
  }

  if (subType === "text") {
    return (
      <div
        className="menu"
        style={{ left: coordinates.left, top: coordinates.top }}
      >
        <ul>
          <li onClick={rename}>Rename</li>
          <li onClick={openAddDescription}>Add description</li>
          <li onClick={remove}>Remove</li>
        </ul>
      </div>
    );
  }

  if (subType === "status") {
    return (
      <div
        className="menu"
        style={{ left: coordinates.left, top: coordinates.top }}
      >
        <ul>
          <li style={{ borderBottom: "1px solid var(--grey-contour" }}>
            Filter...
          </li>
          <li onClick={rename}>Rename</li>
          <li onClick={openAddDescription}>Add description</li>
          <li onClick={remove}>Remove</li>
        </ul>
      </div>
    );
  }

  if (subType === "number") {
    const openParameters = () => {
      const newCoordinates = {
        left: coordinates.left + 10,
        top: coordinates.top - 10,
      };
      dispatch(openNumberParameters({ coordinates: newCoordinates }));
    };

    return (
      <div
        className="menu"
        style={{ left: coordinates.left, top: coordinates.top }}
      >
        <ul>
          <li
            onClick={openParameters}
            style={{ borderBottom: "1px solid var(--grey-contour" }}
          >
            Set parameters...
          </li>
          <li onClick={rename}>Rename</li>
          <li onClick={openAddDescription}>Add description</li>
          <li onClick={remove}>Remove</li>
        </ul>
      </div>
    );
  }

  return (
    <div
      className="menu"
      style={{ left: coordinates.left, top: coordinates.top }}
    >
      TableHeaderSectionMenu
    </div>
  );
};

export default TableHeaderSectionMenu;
