import { configureStore } from "@reduxjs/toolkit";
import auctionReducer from "../services/auctionSlice";

export const store = configureStore({
  reducer: {
    auction: auctionReducer,
  },
});