import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputValue: "",
  isOpen: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setInputValue: (state, { payload }) => {
      state.inputValue = payload;
    },
    toggleIsOpen: (state) => {
      console.log("toggled sb");
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setInputValue, toggleIsOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;
