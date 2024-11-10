import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for shows
const initialState = {
  shows: [],
  status: "LOADING",
};

// Create a slice for managing shows
const showSlice = createSlice({
  name: "movieshows",
  initialState,
  reducers: {
    // Add a new show
    bookShow(state, action) {
      state.shows.push(action.payload);
    },
    // Set fetched shows
    fetchBookedShows(state, action) {
      state.shows = action.payload;
    },
    // Update fetch status
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

// Export actions and reducer
export const { bookShow, fetchBookedShows, setStatus } = showSlice.actions;
export default showSlice.reducer;

// Thunk to fetch shows data
const fetchData = () => async (dispatch) => {
  try {
    const res = await axios.get("https://bookmyshow-api-riteswar.onrender.com/api/booking");
    dispatch(fetchBookedShows(res.data));
    dispatch(setStatus("IDLE"));
  } catch {
    dispatch(setStatus("ERROR"));
  }
};

export { fetchData };
