// src/pages/AuctionListPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuctions } from "../services/auctionSlice";
import Navbar from "../components/common/Navbar";

const AuctionListPage = () => {
  const dispatch = useDispatch();
  const { auctions, loading } = useSelector((state) => state.auction);

  useEffect(() => {
    dispatch(fetchAuctions());
  }, [dispatch]);

  if (loading) return <h2 className="p-4 text-red-600 bg-gray-200">Sorry, Couldn't load auctions.</h2>;

  return (
    <div className="min-h-screen ">
      <div className="dark:bg-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Auction List */}
      <div className="max-w-5xl mx-auto mt-20 px-4">
        <h1 className="text-2xl font-bold mb-6">Auctions</h1>

        <div className="space-y-4">
          {auctions.map((auction) => (
            <div
              key={auction.auctionId}
              className="border rounded-lg bg-white shadow-sm p-4"
            >
              <p><span className="font-semibold">Auction ID:</span> {auction.auctionId}</p>
              <p><span className="font-semibold">Consumer Name:</span> {auction.rfqName}</p>
              <p><span className="font-semibold">Start Time:</span> {auction.bidStartTime}</p>
              <p><span className="font-semibold">Close Time:</span> {auction.bidCloseTime}</p>
              <p><span className="font-semibold">Forced Close Time:</span> {auction.forcedCloseTime}</p>
              <p><span className="font-semibold">Status:</span> {auction.status}</p>
              <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => window.location.href = `/auctions/${auction.auctionId}`}
              >
                join auction
              </button>
              <button
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => window.location.href = `/auctions/${auction.auctionId}/bids`}
              >
                View Bids
              </button>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default AuctionListPage;
