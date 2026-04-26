
export const formatCurrency = (value) => {
  if (!value) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const formatDate = (date, options = {}) => {
  if (!date) return "";
  
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  };

  return new Intl.DateTimeFormat("en-US", defaultOptions).format(dateObj);
};


export const formatTimeRemaining = (milliseconds) => {
  if (milliseconds <= 0) return "0s";

  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(" ");
};


export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};


export const parseCurrency = (value) => {
  if (!value) return null;
  const parsed = parseFloat(value.replace(/[^0-9.-]+/g, ""));
  return isNaN(parsed) ? null : parsed;
};
