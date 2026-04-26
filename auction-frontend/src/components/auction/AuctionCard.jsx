import { useNavigate } from "react-router-dom";

const AuctionCard = ({ auction }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/auctions/${auction.id}`)}>
      <h3>{auction.rfqName}</h3>
      <p>Lowest Bid: ₹{auction.lowestBid || "N/A"}</p>
      <p>Status: {auction.status}</p>
    </div>
  );
};

export default AuctionCard;