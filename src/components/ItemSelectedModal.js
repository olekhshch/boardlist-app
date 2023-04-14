import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  archieveItemsById,
  deleteItemsById,
  duplicateItemsById,
  unarchieveItemsById,
} from "../features/items/itemsSlice";
import { resetSelectedItems } from "../features/system/systemSlice";

const ItemSelectedModal = () => {
  const { selectedItems } = useSelector((state) => state.system);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();

  const allSelected = Object.values(selectedItems).flat();
  const overallCount = allSelected.length;

  const undoSelection = () => {
    dispatch(resetSelectedItems());
    const allCheckboxes = document.querySelectorAll("input[type='checkbox']");
    allCheckboxes.forEach((input) => {
      if (input.checked) {
        input.checked = false;
      }
    });
  };

  const deleteSelected = () => {
    dispatch(deleteItemsById({ selectedItemIds: allSelected }));
    dispatch(resetSelectedItems());
  };

  const duplicateSelected = () => {
    dispatch(duplicateItemsById({ selectedItemIds: allSelected }));
  };

  const archieveSelected = () => {
    dispatch(archieveItemsById({ itemIds: allSelected }));
    dispatch(resetSelectedItems());
    const allCheckboxes = document.querySelectorAll("input[type='checkbox']");
    allCheckboxes.forEach((input) => {
      if (input.checked) {
        input.checked = false;
      }
    });
  };

  const unarchieveSelected = () => {
    dispatch(unarchieveItemsById({ itemIds: allSelected }));
    dispatch(resetSelectedItems());
  };

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
        <button className="selected-items-modal-btn" onClick={deleteSelected}>
          Delete
        </button>
        <button className="selected-items-modal-btn" onClick={archieveSelected}>
          Archive
        </button>
        <button
          className="selected-items-modal-btn"
          onClick={unarchieveSelected}
        >
          Unarchive
        </button>
        <button
          className="selected-items-modal-btn"
          onClick={duplicateSelected}
        >
          Duplicate
        </button>
      </div>
      <button
        onClick={undoSelection}
        className="selected-items-modal-btn cross-btn"
      >
        +
      </button>
    </div>
  );
};

export default ItemSelectedModal;
