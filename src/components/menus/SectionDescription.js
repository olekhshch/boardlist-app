import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Description from "../icons/Description";
import { setSectionDescription } from "../../features/groups/groupsSlice";

const SectionDescription = () => {
  const dispatch = useDispatch();
  const { coordinates, section, groupId } = useSelector((state) => state.menu);
  const [description, setDescription] = useState(section.description ?? "");

  const handleChange = (e) => {
    setDescription(e.target.value);
    dispatch(
      setSectionDescription({
        description: e.target.value,
        groupId,
        sectionId: section.index,
      })
    );
  };
  return (
    <section
      className="menu flex"
      style={{
        width: "240px",
        left: coordinates.left - 120,
        top: coordinates.top + 8,
        animation: "menuOpen 0.6s",
      }}
    >
      <div style={{ margin: "4px 4px 0 2px" }}>
        <Description />
      </div>
      <form className="flex-col flex-grow-1">
        <label style={{ color: "var(--grey-contour)" }}>
          Column description
        </label>
        <textarea
          style={{
            resize: "none",
            width: "100%",
            height: "90px",
            border: "none",
          }}
          value={description}
          onChange={handleChange}
        />
      </form>
    </section>
  );
};

export default SectionDescription;
