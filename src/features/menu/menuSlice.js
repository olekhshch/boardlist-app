import { createSlice } from "@reduxjs/toolkit";

/*
add-section
group-menu
group-theme
group-move
status-list
link-edit
item-window

section-settings [main, text, status, number, priority]
section-rename
section-description

cell-textarea
number-parameters
*/

const initialState = {
  isOpen: false,
  menuType: "",
  subType: "",
  coordinates: {
    left: 100,
    top: 100,
  },
  width: 60,
  statusId: null,
  statusContent: null,
  itemId: null,
  groupId: null,
  group: null,
  sectionId: null,
  item: null,
  sectionIndex: null,
  section: null,
  initialInputValue: "",
  link: null,
  value: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openStatusListMenu: (state, { payload }) => {
      console.log(payload);
      const {
        type,
        coordinates,
        statusContent,
        statusId,
        itemId,
        sectionIndex,
      } = payload;
      state.isOpen = true;
      state.menuType = type;
      state.coordinates = coordinates;
      state.statusId = statusId;
      state.statusContent = statusContent;
      state.itemId = itemId;
      state.sectionIndex = sectionIndex;
    },
    openStatusEditMenu: (state, { payload }) => {
      state.menuType = "status-edit";
      state.isOpen = true;
    },
    openItemWindow: (state, { payload }) => {
      const { item, group } = payload;
      if (state.menuType !== "item-window") {
        state.coordinates = { left: 260, top: 120 };
      }
      state.menuType = "item-window";
      state.isOpen = true;
      state.item = item;
      if (group) {
        state.group = group;
      }
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
    openGroupMoveMenu: (state, { payload }) => {
      const { coordinates } = payload;
      state.coordinates = coordinates;
      state.menuType = "group-move";
      state.isOpen = true;
    },
    openTableSectionMenu: (state, { payload }) => {
      const { coordinates, group } = payload;
      state.menuType = "add-section";
      state.coordinates = coordinates;
      state.group = group;
      state.isOpen = true;
    },
    openSectionSettingsMenu: (state, { payload }) => {
      const {
        menuType,
        subType,
        coordinates,
        groupId,
        sectionId,
        section,
        initialInputValue,
      } = payload;

      state.menuType = menuType;
      state.subType = subType;
      state.coordinates = coordinates;
      state.groupId = groupId;
      state.sectionId = sectionId;
      state.section = section;
      state.initialInputValue = initialInputValue;
      state.isOpen = true;
    },
    openSectionRename: (state, { payload }) => {
      state.menuType = "section-rename";
    },
    expandCellTextarea: (state, { payload }) => {
      const { coordinates, width, sectionId, initialInputValue, itemId } =
        payload;
      console.log(payload);
      state.menuType = "cell-textarea";
      state.itemId = itemId;
      state.sectionId = sectionId;
      state.coordinates = coordinates;
      state.width = width;
      state.initialInputValue = initialInputValue;
      state.isOpen = true;
    },
    openNumberParameters: (state, { payload }) => {
      const { coordinates } = payload;
      state.menuType = "number-parameters";
      state.coordinates = coordinates;
    },
    openLinkEditMenu: (state, { payload }) => {
      const { link, value, itemId, coordinates, sectionId } = payload;
      state.link = link;
      state.value = value;
      state.itemId = itemId;
      state.sectionId = sectionId;
      state.coordinates = coordinates;
      state.menuType = "link-edit";
      state.isOpen = true;
    },
    openSectionDescriptionWindow: (state, { payload }) => {
      const { coordinates, section, groupId } = payload;
      state.menuType = "section-description";
      state.coordinates = coordinates;
      if (groupId) {
        state.groupId = groupId;
      }
      if (section) {
        state.section = section;
      }
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
  openStatusEditMenu,
  openItemWindow,
  openGroupMenu,
  openGroupThemePicker,
  openGroupMoveMenu,
  openTableSectionMenu,
  openSectionSettingsMenu,
  openSectionRename,
  expandCellTextarea,
  openNumberParameters,
  openLinkEditMenu,
  openSectionDescriptionWindow,
  closeMenu,
  setMenuCoordinates,
} = menuSlice.actions;
