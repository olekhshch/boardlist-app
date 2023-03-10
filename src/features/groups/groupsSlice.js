import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialGroupsState";

const defaultGroupLayout = {
  lastIndex: 1,
  content: [{ index: "t1", type: "main", title: "Item", width: 280 }],
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state, { payload }) => {
      console.log(payload);
      state.lastIndex = state.lastIndex + 1;
      const id = `g${state.lastIndex}`;
      console.log(id);
      const boardId = payload.boardId;
      const title = payload.title ? payload.title : "New group";
      const groupLayout = defaultGroupLayout;
      console.log({ id, title, groupLayout });
      state.allGroups = [
        ...state.allGroups,
        { id, boardId, title, groupLayout },
      ];
    },
    renameGroup: (state, { payload }) => {
      const newGroups = state.allGroups.map((group) => {
        if (group.id === payload.id) {
          return { ...group, title: payload.title };
        }
        return group;
      });
      state.allGroups = newGroups;
    },
    addGroupLayoutSection: (state, { payload }) => {
      console.log(payload); //groupId, type
      const newGroups = state.allGroups.map((group) => {
        if (group.id === payload.groupId) {
          const { lastIndex, content } = group.groupLayout;
          const newIndex = lastIndex + 1;
          const newSection = {
            index: `t${newIndex}`,
            title: "Text field",
            type: payload.type,
            width: 140,
          };
          const newContent = [...content, newSection];
          const newLayout = {
            lastIndex: newIndex,
            content: newContent,
          };
          return { ...group, groupLayout: newLayout };
        }
        return group;
      });
      state.allGroups = newGroups;
    },
    setSectionWidth: (state, { payload }) => {
      console.log(payload);
      const { sectionId, groupId, newWidth } = payload;
      const newGroups = state.allGroups.map((group) => {
        if (group.id === groupId) {
          const newContent = group.groupLayout.content.map((section) => {
            if (section.index === sectionId) {
              return { ...section, width: newWidth };
            }
            return section;
          });
          return {
            ...group,
            groupLayout: { ...group.groupLayout, content: newContent },
          };
        }
        return group;
      });
      state.allGroups = newGroups;
    },
    toggleIsCollapsed: (state, { payload }) => {
      const groupId = payload;
      const newGroups = state.allGroups.map((group) => {
        if (group.id === groupId) {
          return { ...group, isCollapsed: !group.isCollapsed };
        }
        return group;
      });
      state.allGroups = newGroups;
    },
    collapseAll: (state, { payload }) => {
      const newGroups = state.allGroups.map((group) => {
        if (group.boardId === payload) {
          return { ...group, isCollapsed: true };
        }
        return group;
      });
      state.allGroups = newGroups;
    },
    expandAll: (state, { payload }) => {
      const newGroups = state.allGroups.map((group) => {
        if (group.boardId === payload) {
          return { ...group, isCollapsed: false };
        }
        return group;
      });
      state.allGroups = newGroups;
    },
  },
});

export default groupsSlice.reducer;

export const {
  addGroup,
  renameGroup,
  addGroupLayoutSection,
  setSectionWidth,
  toggleIsCollapsed,
  collapseAll,
  expandAll,
} = groupsSlice.actions;
