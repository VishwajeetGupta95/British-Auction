const TopBidderCard = ({ topBid }) => {
  if (!topBid) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🥇 L1 (Lowest Bid)
        </h2>
        <p className="text-gray-600 dark:text-gray-400">No bids placed yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-green-500 dark:border-green-600">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span>🥇</span> L1 (Lowest Bid)
      </h2>

      <div className="space-y-4">
        {/* Bid Amount - Highlighted */}
        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 border-l-4 border-green-600">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Bid Amount
          </p>
          <p className="text-4xl font-bold text-green-600 dark:text-green-400">
            ${parseFloat(topBid.bidAmount).toFixed(2)}
          </p>
        </div>

        {/* Supplier Information */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Supplier ID</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {topBid.supplierId}
            </p>
          </div>

          {topBid.companyName && (
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Company Name</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {topBid.companyName}
              </p>
            </div>
          )}

          {topBid.validity && (
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Validity</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {topBid.validity}
              </p>
            </div>
          )}
        </div>

        {/* Charges Breakdown */}
        {(topBid.originCharges || topBid.destinationCharges || topBid.freightCharges) && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2 border-t border-gray-200 dark:border-gray-600">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
              Charges Breakdown
            </p>
            {topBid.freightCharges && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Freight</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${parseFloat(topBid.freightCharges).toFixed(2)}
                </span>
              </div>
            )}
            {topBid.originCharges && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Origin</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${parseFloat(topBid.originCharges).toFixed(2)}
                </span>
              </div>
            )}
            {topBid.destinationCharges && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Destination</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${parseFloat(topBid.destinationCharges).toFixed(2)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBidderCard;
