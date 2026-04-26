// src/websocket/useAuctionSocket.js

import { useEffect } from "react";
import { connectSocket } from "./socket";
import { useDispatch } from "react-redux";
import { updateFromSocket } from "../store/auctionSlice";

export const useAuctionSocket = (auctionId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    connectSocket((data) => {
      dispatch(updateFromSocket(data));
    });
  }, [auctionId, dispatch]);
};