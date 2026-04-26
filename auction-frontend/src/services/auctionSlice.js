import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import api from "../services/api";

// 🔥 LIST PAGE
export const fetchAuctions = createAsyncThunk(
  "auction/fetchAuctions",
  async () => {
    const res = await api.get("/auctions/active");
    return res.data;
  }
);

// 🔥 DETAILS PAGE
export const fetchAuctionDetails = createAsyncThunk(
  "auction/fetchDetails",
  async (id) => {
    const res = await api.get(`/auctions/${id}/details`);
    return res.data;
  }
);

// 🔥 EVENTS
export const fetchAuctionEvents = createAsyncThunk(
  "auction/fetchEvents",
  async (id) => {
    const res = await api.get(`/auctions/${id}/events`);
    return res.data;
  }
);

const auctionSlice = createSlice({
  name: "auction",
  initialState: {
    auctions: [],
    auction: null,
    bids: [],
    events: [],
    loading: false,
    error: null,
  },
  reducers: {
  addBidRealtime: (state, action) => {
    state.bids.push(action.payload);
  },

  updateCloseTime: (state, action) => {
    if (state.auction) {
      state.auction.bidCloseTime = action.payload;
    }
  },

  setAuctionStatus: (state, action) => {
    if (state.auction) {
      state.auction.status = action.payload;
    }
  },

  addEventRealtime: (state, action) => {
    state.events.unshift(action.payload);
  },
},

  extraReducers: (builder) => {
    builder

      // LIST
      .addCase(fetchAuctions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuctions.fulfilled, (state, action) => {
        state.loading = false;
        state.auctions = action.payload;
      })

      // DETAILS
      .addCase(fetchAuctionDetails.fulfilled, (state, action) => {
        state.auction = action.payload.auction;
        state.bids = action.payload.bids;
      })

      // EVENTS
      .addCase(fetchAuctionEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      });
  },
});

export const {
  addBidRealtime,
  updateCloseTime,
  setAuctionStatus,
  addEventRealtime,
} = auctionSlice.actions;

export const selectAuctionDetails = createSelector(
  (state) => state.auction.auction,
  (state) => state.auction.bids,
  (state) => state.auction.loading,
  (state) => state.auction.error,
  (auction, bids, loading, error) => ({
    auction,
    bids,
    loading,
    error,
  })
);

export default auctionSlice.reducer;