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
    deleteItemsById: (state, { payload }) => {
      const { selectedItemIds } = payload;
      state.allItems = state.allItems.filter(
        (item) => !selectedItemIds.includes(item.id)
      );
    },
    deleteItemsByGroup: (state, { payload }) => {
      const { groupId } = payload;
      state.allItems = state.allItems.filter(
        (item) => item.groupId !== groupId
      );
    },
    duplicateItemsById: (state, { payload }) => {
      const { selectedItemIds } = payload;
      const itemsToDuplicate = state.allItems.filter((item) =>
        selectedItemIds.includes(item.id)
      );
      const newItems = itemsToDuplicate.map((item) => {
        state.lastIndex += 1;
        const newId = `i${state.lastIndex}`;
        return { ...item, id: newId };
      });
      state.allItems = [...state.allItems, ...newItems];
    },
    addSectionToItems: (state, { payload }) => {
      const { type, groupId, newIndex } = payload;
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
    },
  },
});

export default itemsSlice.reducer;

export const {
  addItem,
  deleteItemsById,
  deleteItemsByGroup,
  duplicateItemsById,
  addSectionToItems,
  changeValue,
  setItemsState,
  removeItemSection,
} = itemsSlice.actions;
