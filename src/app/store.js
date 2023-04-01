import showSlice from "../features/shows/showSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    shows: showSlice,
  },
});

export { store };
