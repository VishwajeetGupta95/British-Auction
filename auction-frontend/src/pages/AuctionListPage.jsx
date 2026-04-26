import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuctions } from "../services/auctionSlice";
import AuctionCard from "../components/auction/AuctionCard";

const AuctionListPage = () => {
  const dispatch = useDispatch();
  const { auctions, loading } = useSelector((state) => state.auction);

  useEffect(() => {
    dispatch(fetchAuctions());
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Auctions</h1>

      {auctions.map((a) => (
        <AuctionCard key={a.id} auction={a} />
      ))}
    </div>
  );
};

export default AuctionListPage;