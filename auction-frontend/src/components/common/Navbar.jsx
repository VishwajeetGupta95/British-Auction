
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

// src/components/Navbar.jsx
export default function Navbar() {
  return (

    <nav className="w-full fixed top-0 left-0 dark:bg-gray-900 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-blue-700 dark:border-gray-400">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Title */}
          <div className="text-10xl font-bold">
            AuctionApp
          </div>

          {/* Right side */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>



  );
}


