import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeValue } from "../features/items/itemsSlice";
import { openMenu } from "../features/menu/menuSlice";

const Cell = ({ width, value, type, itemId, sectionIndex, statusId }) => {
  const dispatch = useDispatch();
  const { allStatuses } = useSelector((state) => state.statuses);
  const [cellValue, setCellValue] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "main" && cellValue === "") {
      setCellValue(value);
    }
    dispatch(
      changeValue({ newValue: cellValue, itemId, layoutIndex: sectionIndex })
    );
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
        openMenu({
          type: "status-list",
          coordinates: { left, top },
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

  return (
    <form
      className="table-section flex-col"
      style={{ width: `${width}px` }}
      onSubmit={handleSubmit}
    >
      <input
        className="flex-grow-1"
        value={cellValue}
        onChange={(e) => setCellValue(e.target.value)}
      />
    </form>
  );
};

export default Cell;
