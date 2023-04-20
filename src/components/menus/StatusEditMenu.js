import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { changeStatusContent } from "../../features/statuses/statusesSlice";
import { closeMenu } from "../../features/menu/menuSlice";

const StatusEditMenu = () => {
  const { coordinates, statusContent, statusId } = useSelector(
    (state) => state.menu
  );
  const { allParameters } = useSelector((state) => state.statuses);

  const dispatch = useDispatch();

  const [choosenStatuses, setChoosenStatuses] = useState(
    Object.entries(statusContent)
  );

  const choosenColours = Object.keys(statusContent);

  let other = allParameters.filter(
    (colour) => !choosenColours.includes(colour)
  );

  const [otherStatuses, setOtherStatuses] = useState(other);

  const handleChange = (e) => {
    const newValue = e.target.value;
    const targetColour = e.target.dataset.colourValue;
    const newChoosenStatuses = choosenStatuses.map(([colour, value]) => {
      if (colour === targetColour) {
        return [colour, newValue];
      }
      return [colour, value];
    });
    setChoosenStatuses(newChoosenStatuses);
  };

  const confirmChange = () => {
    const newContent = Object.fromEntries(choosenStatuses);
    dispatch(changeStatusContent({ statusId, newContent }));
    dispatch(closeMenu());
  };

  const addColour = (e) => {
    console.log(e.target);
    const newColour = e.target.dataset.colour;
    const newEntry = [newColour, ""];
    setChoosenStatuses([...choosenStatuses, newEntry]);
    setOtherStatuses(otherStatuses.filter((colour) => colour !== newColour));
  };

  const removeColour = (e) => {
    e.preventDefault();
    const targetColour = e.target.dataset.colourValue;
    if (targetColour) {
      setChoosenStatuses(
        choosenStatuses.filter(([colour, value]) => colour !== targetColour)
      );
      setOtherStatuses([...otherStatuses, targetColour]);
    }
  };

  return (
    <div
      className="menu flex-col"
      style={{ left: coordinates.left, top: coordinates.top }}
    >
      <div className="flex" style={{ gap: "14px" }}>
        <div className="flex-col">
          {choosenStatuses.map(([colour, value]) => {
            return (
              <div
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                key={colour}
                data-colour-value={colour}
                className="table-section flex-col cell-status status-form"
                style={{
                  width: `170px`,
                  backgroundColor:
                    colour === "default"
                      ? "var(--grey-contour)"
                      : `var(--${colour}-main)`,
                  justifyContent: "center",
                  cursor: "auto",
                  border: "none",
                }}
              >
                <div
                  className="flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <input
                    value={value}
                    onChange={handleChange}
                    onSubmit={(e) => e.preventDefault()}
                    data-colour-value={colour}
                    className="status-edit-input"
                  />
                  {colour !== "default" && (
                    <button
                      onSubmit={(e) => e.preventDefault()}
                      onClick={removeColour}
                      data-colour-value={colour}
                      style={{
                        background: "none",
                        border: "none",
                        marginRight: "6px",
                        cursor: "pointer",
                      }}
                    >
                      <RxCross2 data-colour-value={colour} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-col">
          {otherStatuses.map((colour) => {
            return (
              <div
                key={colour}
                className="cell-status table-section flex"
                data-colour={colour}
                onClick={addColour}
                style={{
                  backgroundColor: `var(--${colour}-main)`,
                  border: "none",
                  alignItems: "center",
                }}
              >
                <span
                  data-colour={colour}
                  className="visible-hover"
                  style={{ color: "white" }}
                >
                  Add
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex" style={{ gap: "12px" }}>
        <button className="btn-main blue-main" onClick={confirmChange}>
          Confirm
        </button>
        <button className="btn-secondary">Cancel</button>
      </div>
    </div>
  );
};

export default StatusEditMenu;
