import { createSlice } from "@reduxjs/toolkit";

/*
add-section
group-menu
group-theme
status-list
item-window
*/

const initialState = {
  isOpen: false,
  menuType: "",
  coordinates: {
    left: 100,
    top: 100,
  },
  statusContent: null,
  itemId: null,
  groupId: null,
  group: null,
  item: null,
  sectionIndex: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openStatusListMenu: (state, { payload }) => {
      console.log(payload);
      const { type, coordinates, statusContent, itemId, sectionIndex } =
        payload;
      state.isOpen = true;
      state.menuType = type;
      state.coordinates = coordinates;
      state.statusContent = statusContent;
      state.itemId = itemId;
      state.sectionIndex = sectionIndex;
    },
    openItemWindow: (state, { payload }) => {
      const { item } = payload;
      state.menuType = "item-window";
      state.isOpen = true;
      state.coordinates = { left: 900, top: 200 };
      state.item = item;
    },
    openGroupMenu: (state, { payload }) => {
      const { coordinates, groupId } = payload;
      state.menuType = "group-menu";
      state.groupId = groupId;
      state.coordinates = coordinates;
      state.isOpen = true;
    },
    openGroupThemePicker: (state, { payload }) => {
      state.menuType = "group-theme";
    },
    openTableSectionMenu: (state, { payload }) => {
      const { coordinates, group } = payload;
      state.menuType = "add-section";
      state.coordinates = coordinates;
      state.group = group;
      state.isOpen = true;
    },
    setMenuCoordinates: (state, { payload }) => {
      const { coordinates } = payload;
      state.coordinates = coordinates;
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
  },
});

export default menuSlice.reducer;

export const {
  openStatusListMenu,
  openItemWindow,
  openGroupMenu,
  openGroupThemePicker,
  openTableSectionMenu,
  closeMenu,
  setMenuCoordinates,
} = menuSlice.actions;
