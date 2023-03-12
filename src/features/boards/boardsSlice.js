import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBoards: [
    { id: "b1", title: "Tasks", description: "To do lists" },
    { id: "b3", title: "Dishes", description: "Checked and to be checked" },
  ],
  lastIndex: 3,
  activeBoardId: "b3",
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, { payload }) => {
      state.lastIndex += 1;
      let id = `b${state.lastIndex}`;
      const newBoard = { id, title: payload, description: "" };
      state.allBoards = [...state.allBoards, newBoard];
    },
    setActiveBoard: (state, { payload }) => {
      state.activeBoardId = payload;
    },
    setBoardName: (state, { payload }) => {
      const newBoards = state.allBoards.map((board) => {
        if (board.id === state.activeBoardId) {
          return { ...board, title: payload.newTitle };
        }
        return board;
      });
      state.allBoards = newBoards;
    },
    setBoardDescription: (state, { payload }) => {
      const newBoards = state.allBoards.map((board) => {
        if (board.id === payload.id) {
          return { ...board, description: payload.newDescription };
        }
        return board;
      });
      state.allBoards = newBoards;
    },
  },
});

export default boardsSlice.reducer;

export const { addBoard, setActiveBoard, setBoardName, setBoardDescription } =
  boardsSlice.actions;
