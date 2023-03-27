import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNumberParameters } from "../../features/groups/groupsSlice";
import { closeMenu } from "../../features/menu/menuSlice";

const NumberParametersWindow = () => {
  const dispatch = useDispatch();
  const { section, coordinates, groupId } = useSelector((state) => state.menu);

  const [unitValue, setUnitValue] = useState(section.unit);
  const [incrementValue, setIncrementValue] = useState(section.increment);

  const handleUnitChange = (e) => {
    setUnitValue(e.target.value);
  };

  const handleIncrementChange = (e) => {
    const newValue = e.target.value;
    setIncrementValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      setNumberParameters({
        sectionId: section.index,
        groupId,
        unit: unitValue,
        increment: incrementValue !== "0" ? incrementValue : section.increment,
      })
    );
    dispatch(closeMenu());
  };

  return (
    <div
      className="menu flex-col"
      style={{ left: coordinates.left, top: coordinates.top }}
    >
      <h4 style={{ borderBottom: "1px solid var(--grey-contour" }}>
        {section.title}: Parameters
      </h4>
      <form
        onSubmit={handleSubmit}
        className="flex-col"
        style={{ maxWidth: "130px" }}
      >
        <label className="flex-col">
          Unit
          <input type="text" value={unitValue} onChange={handleUnitChange} />
        </label>
        <label className="flex-col">
          Increment
          <input
            type="number"
            value={incrementValue}
            onChange={handleIncrementChange}
          />
        </label>
        <div className="flex" style={{ justifyContent: "right" }}>
          {incrementValue === "0" && (
            <p style={{ color: "var(--grey-contour)" }}>Can't be equal 0</p>
          )}
        </div>
        <div className="flex" style={{ gap: "6px" }}>
          <input type="submit" value="Confirm" className="btn-main blue-main" />
          <button
            className="btn-secondary"
            onClick={() => dispatch(closeMenu())}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NumberParametersWindow;
