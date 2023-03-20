import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialItemsState";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    lastIndex: 0,
    allItems: [],
  },
  reducers: {
    setItemsState: (state, { payload }) => {
      state.allItems = payload.allItems;
      state.lastIndex = payload.lastIndex;
    },
    addItem: (state, { payload }) => {
      const { groupId, layout, mainValue } = payload;
      state.lastIndex = state.lastIndex + 1;
      const id = `i${state.lastIndex}`;
      const content = layout.map((section) => {
        const { index, type } = section;
        if (index === "t1") {
          return { layoutIndex: section.index, value: mainValue };
        }
        if (type === "status") {
          return { layoutIndex: section.index, value: "", type };
        }
        return { layoutIndex: section.index, value: "" };
      });
      const newItem = {
        id,
        groupId,
        content,
        notes: [],
      };
      state.allItems = [...state.allItems, newItem];
    },
    addSectionToItems: (state, { payload }) => {
      const { type, groupId, newIndex } = payload;
      console.log("HERE");
      const newSection = {
        layoutIndex: newIndex,
        value: "",
        type,
      };
      const newItems = state.allItems.map((item) => {
        if (item.groupId === groupId) {
          const newContent = [...item.content, newSection];
          return { ...item, content: newContent };
        }
        return item;
      });
      state.allItems = newItems;
      console.log(state.allItems);
    },
    removeItemSection: (state, { payload }) => {
      const { groupId, sectionId } = payload;
      const newItems = state.allItems.map((item) => {
        if (item.groupId === groupId) {
          const { content } = item;
          const newContent = content.filter(
            (section) => section.layoutIndex !== sectionId
          );
          return { ...item, content: newContent };
        }
        return item;
      });
      state.allItems = newItems;
    },
    changeValue: (state, { payload }) => {
      const { newValue, itemId, layoutIndex } = payload;
      const newItems = state.allItems.map((item) => {
        if (item.id === itemId) {
          const newContent = item.content.map((section) => {
            if (section.layoutIndex === layoutIndex) {
              const newSection = { ...section, value: newValue };
              return newSection;
            }
            return section;
          });
          return { ...item, content: newContent };
        }
        return item;
      });
      state.allItems = newItems;
      console.log(state.allItems);
    },
  },
});

export default itemsSlice.reducer;

export const {
  addItem,
  addSectionToItems,
  changeValue,
  setItemsState,
  removeItemSection,
} = itemsSlice.actions;
