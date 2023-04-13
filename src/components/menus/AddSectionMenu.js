import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCheckboxSection,
  addGroupLayoutSection,
  addLinkSection,
  addNumberSection,
} from "../../features/groups/groupsSlice";
import { addSectionToItems } from "../../features/items/itemsSlice";
import { addStatus } from "../../features/statuses/statusesSlice";
import { closeMenu } from "../../features/menu/menuSlice";
import { TiDocumentText } from "react-icons/ti";
import {
  TbNumbers,
  TbLayoutList,
  TbFlag3Filled,
  TbCheckbox,
} from "react-icons/tb";
import { BiLinkAlt } from "react-icons/bi";
const AddSectionMenu = () => {
  const { group, coordinates } = useSelector((state) => state.menu);
  const statusesState = useSelector((state) => state.statuses);

  const dispatch = useDispatch();

  const addLayoutSection = (type) => {
    const { lastIndex } = group.groupLayout;
    if (type === "text") {
      dispatch(
        addSectionToItems({
          type,
          groupId: group.id,
          newIndex: `t${lastIndex + 1}`,
        })
      );
      dispatch(addGroupLayoutSection({ type, groupId: group.id }));
    }
    if (type === "status") {
      dispatch(addStatus(group.id));
      dispatch(
        addSectionToItems({
          type,
          groupId: group.id,
          newIndex: `t${lastIndex + 1}`,
        })
      );
      dispatch(
        addGroupLayoutSection({
          type,
          groupId: group.id,
          statusId: `s${statusesState.lastIndex + 1}`,
          newIndex: `t${lastIndex + 1}`,
        })
      );
    }
    if (type === "number") {
      dispatch(
        addSectionToItems({
          type,
          groupId: group.id,
          newIndex: `t${lastIndex + 1}`,
        })
      );
      dispatch(
        addNumberSection({ groupId: group.id, newIndex: `t${lastIndex + 1}` })
      );
    }

    if (type === "checkbox") {
      dispatch(
        addSectionToItems({
          type,
          groupId: group.id,
          newIndex: `t${lastIndex + 1}`,
        })
      );
      dispatch(addCheckboxSection({ groupId: group.id }));
    }

    if (type === "link") {
      dispatch(
        addSectionToItems({
          type,
          groupId: group.id,
          newIndex: `t${lastIndex + 1}`,
        })
      );
      dispatch(addLinkSection({ groupId: group.id }));
    }
    dispatch(closeMenu());
  };

  return (
    <div
      className="menu flex"
      style={{
        left: coordinates.left,
        top: coordinates.top,
        textTransform: "capitalize",
        gap: "6px",
      }}
    >
      <ul>
        <li
          onClick={() => addLayoutSection("text")}
          style={{ alignItems: "center", display: "flex" }}
        >
          <TiDocumentText style={{ marginRight: "4px", fontSize: "1.2em" }} />{" "}
          text
        </li>
        <li
          onClick={() => addLayoutSection("number")}
          style={{ alignItems: "center", display: "flex" }}
        >
          <TbNumbers style={{ marginRight: "4px", fontSize: "1.2em" }} /> number
        </li>
        <li
          onClick={() => addLayoutSection("status")}
          style={{ alignItems: "center", display: "flex" }}
        >
          <TbLayoutList style={{ marginRight: "4px", fontSize: "1.2em" }} />{" "}
          status
        </li>
      </ul>
      <ul>
        <li
          onClick={() => addLayoutSection("link")}
          style={{ alignItems: "center", display: "flex" }}
        >
          <BiLinkAlt style={{ marginRight: "4px", fontSize: "1.2em" }} /> Link
        </li>
        <li
          onClick={() => addLayoutSection("checkbox")}
          style={{ alignItems: "center", display: "flex" }}
        >
          <TbCheckbox style={{ marginRight: "4px", fontSize: "1.2em" }} />{" "}
          Checkbox
        </li>
      </ul>
    </div>
  );
};

export default AddSectionMenu;
