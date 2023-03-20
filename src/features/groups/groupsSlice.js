import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialGroupsState";

const defaultGroupLayout = {
  lastIndex: 1,
  content: [{ index: "t1", type: "main", title: "Item", width: 280 }],
};

const groupsSlice = createSlice({
  name: "groups",
  initialState: {
    lastIndex: 1,
    allGroups: [
      {
        id: "g1",
        boardId: "b1",
        title: "Initial group",
        isCollapsed: false,
        theme: "blue",
        groupLayout: defaultGroupLayout,
      },
    ],
  },
  reducers: {
    setGroupsState: (state, { payload }) => {
      const { allGroups, lastIndex } = payload;
      state.allGroups = allGroups;
      state.lastIndex = lastIndex;
    },
    addGroup: (state, { payload }) => {
      state.lastIndex = state.lastIndex + 1;
      const id = `g${state.lastIndex}`;
      const boardId = payload.boardId;
      const title = payload.title ? payload.title : "New group";
      const groupLayout = defaultGroupLayout;
      const theme = "blue";
      state.allGroups = [
        ...state.allGroups,
        { id, boardId, title, theme, groupLayout },
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
      console.log(payload); //groupId, type, statusId
      const newGroups = state.allGroups.map((group) => {
        if (group.id === payload.groupId) {
          const { lastIndex, content } = group.groupLayout;
          const newIndex = lastIndex + 1;
          let newSection;
          if (payload.type === "text") {
            newSection = {
              index: `t${newIndex}`,
              title: "Text field",
              type: payload.type,
              width: 160,
            };
          }
          if (payload.type === "status") {
            newSection = {
              index: `t${newIndex}`,
              title: "Status",
              type: payload.type,
              statusId: payload.statusId,
              width: 120,
            };
          }
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
    addNumberSection: (state, { payload }) => {
      const { groupId } = payload;
      const newGroups = state.allGroups.map((group) => {
        if (group.id === groupId) {
          const { lastIndex, content } = group.groupLayout;
          const newLastIndex = lastIndex + 1;
          const newSection = {
            index: `t${newLastIndex}`,
            type: "number",
            increment: 1,
            unit: "",
            title: "Number",
            width: 120,
          };
          const newContent = [...content, newSection];
          const newLayout = { lastIndex: newLastIndex, content: newContent };
          return { ...group, groupLayout: newLayout };
        }
        return group;
      });
      state.allGroups = newGroups;
    },
    setSectionWidth: (state, { payload }) => {
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
    removeSection: (state, { payload }) => {
      const { groupId, sectionId } = payload;
      const newGroups = state.allGroups.map((group) => {
        if (group.id === groupId) {
          const { lastIndex, content } = group.groupLayout;
          const newContent = content.filter(
            (section) => section.index !== sectionId
          );
          const newLayout = { lastIndex, content: newContent };
          return { ...group, groupLayout: newLayout };
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
    setTheme: (state, { payload }) => {
      const { groupId, theme } = payload;
      const newGroups = state.allGroups.map((group) => {
        if (group.id === groupId) {
          return { ...group, theme };
        }
        return group;
      });
      state.allGroups = newGroups;
    },
  },
});

export default groupsSlice.reducer;

export const {
  setGroupsState,
  addGroup,
  renameGroup,
  addGroupLayoutSection,
  addNumberSection,
  setSectionWidth,
  removeSection,
  toggleIsCollapsed,
  collapseAll,
  expandAll,
  setTheme,
} = groupsSlice.actions;
