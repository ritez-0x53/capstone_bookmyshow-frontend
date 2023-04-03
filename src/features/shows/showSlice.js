import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shows: [],
};

const showSlice = createSlice({
  name: "movieshows",
  initialState,
  reducers: {
    bookShow(state, action) {
      state.shows = [...state.shows, action.payload];
    },
    fetchBookedShows(state, action) {
      state.shows = action.payload;
    },
  },
});

export const { bookShow, fetchBookedShows } = showSlice.actions;
export default showSlice.reducer;
