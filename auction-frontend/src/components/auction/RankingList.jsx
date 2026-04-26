import { formatCurrency, formatDate } from '../../utils/helpers';

export default function RankingList({ bids = [], title = 'Ranking List' }) {
  if (!bids || bids.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No bids yet</p>
      </div>
    );
  }

  const displayBids = bids.slice(0, 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Showing {displayBids.length} bids
        </p>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {displayBids.map((bid, index) => (
            <div
              key={bid.id || index}
              className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                index === 0 ? 'bg-green-50 dark:bg-green-900/20' : ''
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Rank Badge */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                    index === 0
                      ? 'bg-gradient-to-br from-green-500 to-green-600'
                      : index === 1
                      ? 'bg-gradient-to-br from-gray-400 to-gray-500'
                      : index === 2
                      ? 'bg-gradient-to-br from-orange-500 to-orange-600'
                      : 'bg-gradient-to-br from-blue-500 to-blue-600'
                  }`}
                >
                  {index === 0 ? 'L1' : index === 1 ? 'L2' : index === 2 ? 'L3' : `L${index + 1}`}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Supplier ID */}
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {bid.supplierId || bid.bidderName || 'Unknown'}
                  </p>
                  {/* Company Name or additional info */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {bid.companyName || formatDate(bid.timestamp, { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              {/* Bid Amount */}
              <div className="text-right ml-4">
                <p
                  className={`font-bold text-lg ${
                    index === 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-blue-600 dark:text-blue-400'
                  }`}
                >
                  ${parseFloat(bid.bidAmount || bid.amount || 0).toFixed(2)}
                </p>
                {bid.transitTime && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {bid.transitTime} days
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
