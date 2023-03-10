import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../features/sidebar/sidebarSlice";
import boardsReducer from "../features/boards/boardsSlice";
import groupReducer from "../features/groups/groupsSlice";
import itemsReducer from "../features/items/itemsSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    boards: boardsReducer,
    groups: groupReducer,
    items: itemsReducer,
  },
});
