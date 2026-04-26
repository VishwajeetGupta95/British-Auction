import { useState, useEffect } from 'react';
import { getCountdown } from '../../utils/helpers';

/**
 * Timer Component
 * @param {Object} props
 * @param {Date | string} props.endTime
 * @param {Function} props.onExpire
 */
export default function Timer({ endTime, onExpire }) {
  const [countdown, setCountdown] = useState(getCountdown(endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdown = getCountdown(endTime);
      setCountdown(newCountdown);

      if (newCountdown.isExpired && onExpire) {
        onExpire();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, onExpire]);

  const { days, hours, minutes, seconds, isExpired } = countdown;

  if (isExpired) {
    return (
      <div className="text-center">
        <p className="text-red-500 font-semibold text-lg">Auction Ended</p>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <div className="text-center bg-slate-800 rounded-lg p-2 min-w-[50px]">
        <p className="text-xl font-bold text-blue-400">{days}</p>
        <p className="text-xs text-slate-400">Days</p>
      </div>
      <div className="text-center bg-slate-800 rounded-lg p-2 min-w-[50px]">
        <p className="text-xl font-bold text-blue-400">{hours}</p>
        <p className="text-xs text-slate-400">Hrs</p>
      </div>
      <div className="text-center bg-slate-800 rounded-lg p-2 min-w-[50px]">
        <p className="text-xl font-bold text-blue-400">{minutes}</p>
        <p className="text-xs text-slate-400">Mins</p>
      </div>
      <div className="text-center bg-slate-800 rounded-lg p-2 min-w-[50px]">
        <p className="text-xl font-bold text-blue-400">{seconds}</p>
        <p className="text-xs text-slate-400">Secs</p>
      </div>
    </div>
  );
}
