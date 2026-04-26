
import { Routes, Route } from "react-router-dom";
import App from "../App";
import AuctionListPage from "../pages/AuctionListPage";
import AuctionDetailsPage from "../pages/AuctionDetailsPage";

export default function AppRouter() {
  return (
    <Routes>
    {/* //   <Route path="/auction/list" element={<AuctionList />} /> // display list of auctions
    //   <Route path="/auction/create" element={<CreateAuction />} /> // form to create new auction    
    //   <Route path="/auction/details" element={<AuctionRoom />} /> // auction room with real-time updates */}
      <Route path="/auctions" element={<AuctionListPage />} />
      <Route path="/auctions/:auctionId" element={<AuctionDetailsPage />} />
      <Route path="/" element={<App />} /> // test page for development
    </Routes>   
  );
}