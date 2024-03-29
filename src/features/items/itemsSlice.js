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
      const rawCreationDate = Date.now();
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
        rawCreationDate,
        content,
        isArchieved: false,
        notes: [],
      };
      state.allItems = [...state.allItems, newItem];
    },
    archieveItemsById: (state, { payload }) => {
      const { itemIds } = payload;
      state.allItems = state.allItems.map((item) => {
        if (itemIds.includes(item.id)) {
          return { ...item, isArchieved: true };
        }
        return item;
      });
    },
    unarchieveItemsById: (state, { payload }) => {
      const { itemIds } = payload;
      state.allItems = state.allItems.map((item) => {
        if (itemIds.includes(item.id)) {
          return { ...item, isArchieved: false };
        }
        return item;
      });
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
      //N|A for Link section
      const { type, groupId, newIndex } = payload;
      const newSection = {
        layoutIndex: newIndex,
        value: type === "status" ? "default" : "",
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
    setLinkValue: (state, { payload }) => {
      const { newValue, newLink, itemId, layoutIndex } = payload;
      const newItems = state.allItems.map((item) => {
        if (item.id === itemId) {
          const newContent = item.content.map((section) => {
            if (section.layoutIndex === layoutIndex) {
              const newSection = { ...section, value: newValue, link: newLink };
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
    addNote: (state, { payload }) => {
      const { itemId, content, title } = payload;
      const creationDate = Date.now();
      const newItems = state.allItems.map((item) => {
        if (item.id === itemId) {
          const newNote = {
            title,
            content,
            creationDate,
            isPinned: false,
          };
          return { ...item, notes: [...item.notes, newNote] };
        }
        return item;
      });
      state.allItems = newItems;
    },
    pinNote: (state, { payload }) => {
      const { itemId, noteCreationDate } = payload;
      const newItems = state.allItems.map((item) => {
        if (item.id === itemId) {
          const { notes } = item;
          const newNotes = notes.map((note) => {
            if (note.creationDate == noteCreationDate) {
              return { ...note, isPinned: true };
            }
            return note;
          });
          return { ...item, notes: newNotes };
        }
        return item;
      });
      state.allItems = newItems;
    },
    unpinNote: (state, { payload }) => {
      const { itemId, noteCreationDate } = payload;
      const newItems = state.allItems.map((item) => {
        if (item.id === itemId) {
          const { notes } = item;
          const newNotes = notes.map((note) => {
            if (note.creationDate == noteCreationDate) {
              return { ...note, isPinned: false };
            }
            return note;
          });
          return { ...item, notes: newNotes };
        }
        return item;
      });
      state.allItems = newItems;
    },
    editNote: (state, { payload }) => {
      const { itemId, noteCreationDate, newContent, newTitle } = payload;
      const newItems = state.allItems.map((item) => {
        if (item.id === itemId) {
          const { notes } = item;
          const newNotes = notes.map((note) => {
            if (note.creationDate == noteCreationDate) {
              return { ...note, content: newContent, title: newTitle };
            }
            return note;
          });
          return { ...item, notes: newNotes };
        }
        return item;
      });
      state.allItems = newItems;
    },
    deleteNote: (state, { payload }) => {
      const { itemId, noteCreationDate } = payload;
      const newItems = state.allItems.map((item) => {
        if (item.id === itemId) {
          const { notes } = item;
          const newNotes = notes.filter(
            (note) => note.creationDate !== noteCreationDate
          );
          return { ...item, notes: newNotes };
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
  archieveItemsById,
  unarchieveItemsById,
  deleteItemsById,
  deleteItemsByGroup,
  duplicateItemsById,
  addSectionToItems,
  changeValue,
  setLinkValue,
  setItemsState,
  removeItemSection,
  addNote,
  pinNote,
  unpinNote,
  editNote,
  deleteNote,
} = itemsSlice.actions;
