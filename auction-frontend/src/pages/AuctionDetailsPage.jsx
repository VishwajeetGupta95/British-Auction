import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAuctionDetails, selectAuctionDetails, addBidRealtime, updateCloseTime, setAuctionStatus, addEventRealtime, fetchAuctionEvents } from "../services/auctionSlice";
import { connectSocket, disconnectSocket } from "../websocket/socket";
import Navbar from "../components/common/Navbar";
import AuctionTimer from "../components/auction/AuctionTimer";
import AuctionSummaryCard from "../components/auction/AuctionSummaryCard";
import TopBidderCard from "../components/auction/TopBidderCard";
import RankingList from "../components/auction/RankingList";
import PlaceBidForm from "../components/auction/PlaceBidForm";

const AuctionDetailsPage = () => {
  const { auctionId } = useParams();
  const dispatch = useDispatch();

  const { auction, bids, loading, error } = useSelector(selectAuctionDetails);
  const topBid = bids && bids.length > 0 ? bids[0] : null;

  useEffect(() => {
    // Initial load
    dispatch(fetchAuctionDetails(auctionId));
    dispatch(fetchAuctionEvents(auctionId));

    // Connect websocket
    connectSocket(auctionId, (msg) => {
      console.log("WS EVENT:", msg);

      switch (msg.type) {
        case "NEW_BID":
          dispatch(addBidRealtime(msg.data));
          break;

        case "AUCTION_EXTENDED":
          dispatch(updateCloseTime(msg.data.newCloseTime));
          dispatch(addEventRealtime({
            eventType: "EXTENSION",
            description: "Auction extended",
            timestamp: new Date().toISOString(),
          }));
          break;

        case "AUCTION_CLOSED":
          dispatch(setAuctionStatus("CLOSED"));
          break;

        case "FORCE_CLOSED":
          dispatch(setAuctionStatus("FORCE_CLOSED"));
          break;

        default:
          break;
      }
    });

    // Cleanup
    return () => {
      disconnectSocket();
    };
  }, [auctionId, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
            Loading auction details...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="pt-20 px-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Error</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="pt-20 px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Auction not found
          </h2>
        </div>
      </div>
    );
  }

  const handleBidSubmit = async (bidData) => {
    console.log("Bid submitted:", bidData);
    // TODO: Dispatch action to submit bid via API
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Main Content */}
      <main className="pt-20 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {auction.rfqName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Auction ID: {auctionId}
            </p>
          </div>

          {/* Main Layout: 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT SIDE - Auction Insights Panel */}
            <div className="space-y-8">
              {/* Auction Summary Card */}
              <AuctionSummaryCard auction={auction} bids={bids} />

              {/* Top Bidder Card (L1) */}
              <TopBidderCard topBid={topBid} />

              {/* Ranking List */}
              <RankingList bids={bids} title="📋 Ranking List (L1-L100)" />
            </div>

            {/* RIGHT SIDE - Action Panel */}
            <div className="space-y-8">
              {/* Auction Timer */}
              <AuctionTimer
                bidCloseTime={auction.bidCloseTime}
                forcedCloseTime={auction.forcedCloseTime}
                status={auction.status}
              />

              {/* Place Bid Form */}
              {auction.status === "ACTIVE" && (
                <PlaceBidForm auctionId={auctionId} onBidSubmit={handleBidSubmit} />
              )}

              {/* Auction Closed Message */}
              {auction.status !== "ACTIVE" && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 text-center">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ✅ Auction {auction.status}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    No more bids can be placed for this auction.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuctionDetailsPage;