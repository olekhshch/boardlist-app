import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../features/sidebar/sidebarSlice";
import boardsReducer from "../features/boards/boardsSlice";
import groupReducer from "../features/groups/groupsSlice";
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    boards: boardsReducer,
    groups: groupReducer,
  },
});
