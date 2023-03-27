import React, { useState } from "react";
import { useSelector } from "react-redux";

const ItemSelectedModal = () => {
  const { selectedItems } = useSelector((state) => state.system);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const overallCount = Object.values(selectedItems).flat().length;

  return (
    <div className="selectedItems-modal flex">
      <div className="selected-items-count">{overallCount}</div>
      <div className="flex-col">
        <p>{overallCount > 1 ? "Items" : "Item"}</p>
        <p>selected</p>
      </div>
      <div
        className="flex"
        style={{ borderRight: "1px solid var(--grey-contour)" }}
      >
        <button className="selected-items-modal-btn">Delete</button>
        <button className="selected-items-modal-btn">Archive</button>
        <button className="selected-items-modal-btn">Duplicate</button>
      </div>
      <button className="selected-items-modal-btn cross-btn">+</button>
    </div>
  );
};

export default ItemSelectedModal;
