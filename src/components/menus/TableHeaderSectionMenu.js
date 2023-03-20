import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSection } from "../../features/groups/groupsSlice";
import { removeItemSection } from "../../features/items/itemsSlice";
import { closeMenu } from "../../features/menu/menuSlice";

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

  if (subType === "main") {
    return (
      <div
        className="menu"
        style={{ left: coordinates.left, top: coordinates.top }}
      >
        <ul>
          <li>Rename</li>
          <li>Add description</li>
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
          <li>Rename</li>
          <li>Add description</li>
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
          <li>Rename</li>
          <li>Add description</li>
          <li onClick={remove}>Remove</li>
        </ul>
      </div>
    );
  }

  if (subType === "number") {
    return (
      <div
        className="menu"
        style={{ left: coordinates.left, top: coordinates.top }}
      >
        <ul>
          <li>Rename</li>
          <li>Add description</li>
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
