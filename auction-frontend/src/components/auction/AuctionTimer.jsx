import { useEffect, useState } from "react";

const AuctionTimer = ({ bidCloseTime, forcedCloseTime, status }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [timeStatus, setTimeStatus] = useState("active");
  const [displayData, setDisplayData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const closeTime = new Date(bidCloseTime).getTime();
      const forceTime = new Date(forcedCloseTime).getTime();

      // Check if auction is closed or force closed
      if (status === "CLOSED" || status === "FORCE_CLOSED") {
        setTimeStatus("closed");
        setTimeLeft("Auction Closed");
        return;
      }

      if (now >= forceTime) {
        setTimeStatus("force-closed");
        setTimeLeft("Force Closed");
        return;
      }

      const diff = closeTime - now;

      if (diff <= 0) {
        setTimeStatus("closing");
        setTimeLeft("Closing...");
        return;
      }

      // Calculate time units
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setDisplayData({ days, hours, minutes, seconds });

      // Determine status based on remaining time
      if (diff < 5 * 60 * 1000) {
        // Less than 5 minutes
        setTimeStatus("critical");
      } else if (diff < 30 * 60 * 1000) {
        // Less than 30 minutes
        setTimeStatus("warning");
      } else {
        setTimeStatus("active");
      }

      // Format display
      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [bidCloseTime, forcedCloseTime, status]);

  const getStatusColor = () => {
    switch (timeStatus) {
      case "critical":
        return "from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 animate-pulse";
      case "warning":
        return "from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700";
      case "closing":
      case "force-closed":
      case "closed":
        return "from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700";
      default:
        return "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700";
    }
  };

  const getStatusText = () => {
    switch (timeStatus) {
      case "critical":
        return "🔴 Closing Soon!";
      case "warning":
        return "🟠 Hurry!";
      case "closing":
        return "⏹️ Closing";
      case "force-closed":
      case "closed":
        return "✅ Closed";
      default:
        return "⏳ Time Left";
    }
  };

  return (
    <div className={`bg-gradient-to-r ${getStatusColor()} rounded-lg shadow-lg p-6 text-white`}>
      <div className="space-y-4">
        {/* Status Text */}
        <h2 className="text-lg font-bold">{getStatusText()}</h2>

        {/* Time Display */}
        {timeStatus !== "closed" && timeStatus !== "force-closed" ? (
          <>
            {/* Large Timer */}
            <div className="text-5xl font-mono font-bold tracking-wider">
              {timeLeft}
            </div>

            {/* Detailed Breakdown */}
            {displayData.days > 0 && (
              <div className="grid grid-cols-4 gap-2 text-center pt-4 border-t border-white/30">
                <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-sm font-semibold">{displayData.days}</p>
                  <p className="text-xs opacity-90">Days</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-sm font-semibold">{displayData.hours}</p>
                  <p className="text-xs opacity-90">Hours</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-sm font-semibold">{displayData.minutes}</p>
                  <p className="text-xs opacity-90">Mins</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-sm font-semibold">{displayData.seconds}</p>
                  <p className="text-xs opacity-90">Secs</p>
                </div>
              </div>
            )}

            {/* Close Times */}
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm mt-4 space-y-2">
              <p className="text-xs">
                <span className="font-semibold">Bid Close:</span>{" "}
                {new Date(bidCloseTime).toLocaleString()}
              </p>
              <p className="text-xs">
                <span className="font-semibold">Force Close:</span>{" "}
                {new Date(forcedCloseTime).toLocaleString()}
              </p>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <p className="text-xl font-semibold">{timeLeft}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionTimer;