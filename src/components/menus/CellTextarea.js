import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeValue } from "../../features/items/itemsSlice";
import { closeMenu } from "../../features/menu/menuSlice";

const CellTextarea = () => {
  const { coordinates, initialInputValue, width, sectionId, itemId } =
    useSelector((state) => state.menu);

  const dispatch = useDispatch();
  const textareaEl = useRef(null);

  useEffect(() => {
    textareaEl.current.focus();
  }, []);

  const initialValue = initialInputValue;

  const [textValue, setTextValue] = useState(initialInputValue);

  const handleChange = (e) => {
    const newCellValue = e.target.value;
    setTextValue(newCellValue);
    dispatch(
      changeValue({ itemId, layoutIndex: sectionId, newValue: newCellValue })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(textValue);
    dispatch(closeMenu());
  };

  const cancel = () => {
    dispatch(
      changeValue({ itemId, layoutIndex: sectionId, newValue: initialValue })
    );
    dispatch(closeMenu());
  };

  return (
    <div
      className="menu flex-col"
      style={{
        left: coordinates.left,
        top: coordinates.top,
        width,
        padding: 0,
      }}
    >
      <form style={{ width: "fit-content" }} onSubmit={handleSubmit}>
        <textarea
          ref={textareaEl}
          style={{
            resize: "vertical",
            padding: "6px",
            width: `${width - 12}px`,
            height: "80px",
            border: "none",
            borderBottom: "1px solid var(--grey-contour)",
          }}
          value={textValue}
          onChange={handleChange}
        />
        <div className="flex" style={{ gap: "10px", marginLeft: "4px" }}>
          <input type="submit" value="Confirm" className="btn-main blue-main" />
          <button className="btn-secondary" onClick={cancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CellTextarea;
