// Import the showSlice reducer from the shows feature slice
import showSlice from "../features/shows/showSlice";
// Import the configureStore function from Redux Toolkit to create the store
import { configureStore } from "@reduxjs/toolkit";

// Configure the Redux store, combining the showSlice reducer
const store = configureStore({
  reducer: {
    // The 'shows' key will hold the state managed by the showSlice reducer
    shows: showSlice,
  },
});

// Export the store to be used in the app's root component
export { store };
