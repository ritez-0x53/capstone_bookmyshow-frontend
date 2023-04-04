import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  shows: [],
  status: "LOADING",
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
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { bookShow, fetchBookedShows, setStatus } = showSlice.actions;
export default showSlice.reducer;

// thunks
const fetchData = () => {
  return async function fetchDataThunk(dispatch, getState) {
    try {
      const res = await axios.get(
        "https://bookmyshow-api-riteswar.onrender.com/api/booking"
      );
      if (res) {
        const data = res.data;
        dispatch(fetchBookedShows(data));
        dispatch(setStatus("IDLE"));
      }
    } catch (error) {
      dispatch(setStatus("ERROR"));
    }
  };
};

export { fetchData };
