import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shows: [],
};

const showSlice = createSlice({
  name: "movieshows",
  initialState,
  reducers: {
    bookShow(state, action) {
      state.shows = [action.payload, ...state.shows];
    },
  },
});

export const { bookShow } = showSlice.actions;
export default showSlice.reducer;
