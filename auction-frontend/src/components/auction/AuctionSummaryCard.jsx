const AuctionSummaryCard = ({ auction, bids }) => {
  const lowestBid = bids && bids.length > 0 ? bids[0] : null;
  const totalBids = bids ? bids.length : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Auction Summary
      </h2>

      <div className="space-y-6">
        {/* Total Bids */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Total Bids Placed
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalBids}
          </p>
        </div>

        {/* Lowest Bid */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border-l-4 border-blue-600">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Current Lowest Bid
          </p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {lowestBid ? `$${parseFloat(lowestBid.bidAmount).toFixed(2)}` : "N/A"}
          </p>
          {lowestBid && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              by {lowestBid.supplierId}
            </p>
          )}
        </div>

        {/* Auction Status */}
        {auction && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Status
            </p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                auction.status === "ACTIVE"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : auction.status === "CLOSED"
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400"
                  : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
              }`}
            >
              {auction.status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionSummaryCard;
