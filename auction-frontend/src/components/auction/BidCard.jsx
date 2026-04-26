import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';

/**
 * BidCard Component
 * @param {Object} props
 * @param {Object} props.auction
 * @param {Function} props.onClick
 */
export default function BidCard({ auction, onClick }) {
  const { title, currentBid, totalBids, startingPrice, images, status } =
    auction;

  const statusColors = {
    active: 'bg-green-900/30 text-green-200',
    ended: 'bg-red-900/30 text-red-200',
    upcoming: 'bg-yellow-900/30 text-yellow-200',
  };

  return (
    <Card
      hoverable
      className="cursor-pointer transform transition-transform hover:scale-105"
      onClick={onClick}
    >
      {/* Image */}
      <div className="w-full h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {images && images[0] ? (
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-slate-400">No image</div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-100 truncate flex-1">
            {title}
          </h3>
          <span className={`badge text-xs ${statusColors[status]}`}>
            {status}
          </span>
        </div>

        {/* Price Info */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-slate-400">Starting Price</p>
            <p className="font-semibold text-slate-100">
              {formatCurrency(startingPrice)}
            </p>
          </div>
          <div>
            <p className="text-slate-400">Current Bid</p>
            <p className="font-semibold text-blue-400">
              {formatCurrency(currentBid)}
            </p>
          </div>
        </div>

        {/* Bids Count */}
        <div className="text-sm">
          <p className="text-slate-400">{totalBids} bids</p>
        </div>
      </div>
    </Card>
  );
}
