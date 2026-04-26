
import { Routes, Route } from "react-router-dom";
import App from "../App";
import AuctionListPage from "../pages/AuctionListPage";
import AuctionDetailsPage from "../pages/AuctionDetailsPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/auctions" element={<AuctionListPage />} />
      <Route path="/auctions/:auctionId" element={<AuctionDetailsPage />} />
      <Route path="/" element={<App />} /> // test page for development
    </Routes>   
  );
}