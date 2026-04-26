// import { useEffect } from 'react';
// import { useAuction } from '../hooks/useAuction';
// import Card from '../components/common/Card';
// import Loader from '../components/common/Loader';
// import BidCard from '../components/auction/BidCard';

// /**
//  * Dashboard Page
//  */
// export default function Dashboard() {
//   const { auctions, loading, fetchAuctions } = useAuction();

//   useEffect(() => {
//     fetchAuctions();
//   }, [fetchAuctions]);

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="space-y-2">
//         <h1 className="text-4xl font-bold text-slate-100">Dashboard</h1>
//         <p className="text-slate-400">Welcome back! Here's what's happening with your auctions.</p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <div className="space-y-2">
//             <p className="text-slate-400 text-sm">Active Auctions</p>
//             <p className="text-3xl font-bold text-blue-400">12</p>
//           </div>
//         </Card>
//         <Card>
//           <div className="space-y-2">
//             <p className="text-slate-400 text-sm">Total Bids</p>
//             <p className="text-3xl font-bold text-green-400">342</p>
//           </div>
//         </Card>
//         <Card>
//           <div className="space-y-2">
//             <p className="text-slate-400 text-sm">Total Revenue</p>
//             <p className="text-3xl font-bold text-purple-400">$45,280</p>
//           </div>
//         </Card>
//         <Card>
//           <div className="space-y-2">
//             <p className="text-slate-400 text-sm">Success Rate</p>
//             <p className="text-3xl font-bold text-orange-400">94%</p>
//           </div>
//         </Card>
//       </div>

//       {/* Recent Auctions */}
//       <div className="space-y-4">
//         <h2 className="text-2xl font-bold text-slate-100">Recent Auctions</h2>
//         {loading ? (
//           <Loader message="Loading auctions..." />
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {auctions.slice(0, 4).map((auction) => (
//               <BidCard key={auction.id} auction={auction} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
