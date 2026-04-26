import { useState } from "react";

const PlaceBidForm = ({ auctionId, onBidSubmit }) => {
  const [formData, setFormData] = useState({
    freightCharges: "",
    originCharges: "",
    destinationCharges: "",
    transitTime: "",
    validity: "",
    supplierId: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.freightCharges || parseFloat(formData.freightCharges) < 0) {
      newErrors.freightCharges = "Enter valid freight charges";
    }
    if (!formData.originCharges || parseFloat(formData.originCharges) < 0) {
      newErrors.originCharges = "Enter valid origin charges";
    }
    if (!formData.destinationCharges || parseFloat(formData.destinationCharges) < 0) {
      newErrors.destinationCharges = "Enter valid destination charges";
    }
    if (!formData.transitTime || formData.transitTime <= 0) {
      newErrors.transitTime = "Enter valid transit time";
    }
    if (!formData.validity) {
      newErrors.validity = "Select validity period";
    }
    if (!formData.supplierId || formData.supplierId.trim() === "") {
      newErrors.supplierId = "Enter supplier ID";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const totalBid =
        parseFloat(formData.freightCharges) +
        parseFloat(formData.originCharges) +
        parseFloat(formData.destinationCharges);

      const bidData = {
        auctionId,
        bidAmount: totalBid,
        supplierId: formData.supplierId,
        freightCharges: parseFloat(formData.freightCharges),
        originCharges: parseFloat(formData.originCharges),
        destinationCharges: parseFloat(formData.destinationCharges),
        transitTime: formData.transitTime,
        validity: formData.validity,
      };

      if (onBidSubmit) {
        await onBidSubmit(bidData);
      }

      // Reset form
      setFormData({
        freightCharges: "",
        originCharges: "",
        destinationCharges: "",
        transitTime: "",
        validity: "",
        supplierId: "",
      });
    } catch (error) {
      console.error("Error submitting bid:", error);
      setErrors({ submit: "Failed to submit bid. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const totalBid =
    (formData.freightCharges ? parseFloat(formData.freightCharges) : 0) +
    (formData.originCharges ? parseFloat(formData.originCharges) : 0) +
    (formData.destinationCharges ? parseFloat(formData.destinationCharges) : 0);

  const isFormValid =
    formData.freightCharges &&
    formData.originCharges &&
    formData.destinationCharges &&
    formData.transitTime &&
    formData.validity &&
    formData.supplierId;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        📝 Place Your Bid
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Supplier ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Supplier ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="supplierId"
            value={formData.supplierId}
            onChange={handleInputChange}
            placeholder="Enter your supplier ID"
            className={`w-full px-4 py-2 rounded-lg border-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition ${
              errors.supplierId
                ? "border-red-500 dark:border-red-400"
                : "border-gray-200 dark:border-gray-600"
            }`}
          />
          {errors.supplierId && (
            <p className="text-red-500 text-xs mt-1">{errors.supplierId}</p>
          )}
        </div>

        {/* Freight Charges */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Freight Charges <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-2.5 text-gray-600 dark:text-gray-400">
              $
            </span>
            <input
              type="number"
              name="freightCharges"
              value={formData.freightCharges}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`w-full pl-8 pr-4 py-2 rounded-lg border-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition ${
                errors.freightCharges
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-200 dark:border-gray-600"
              }`}
            />
          </div>
          {errors.freightCharges && (
            <p className="text-red-500 text-xs mt-1">{errors.freightCharges}</p>
          )}
        </div>

        {/* Origin Charges */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Origin Charges <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-2.5 text-gray-600 dark:text-gray-400">
              $
            </span>
            <input
              type="number"
              name="originCharges"
              value={formData.originCharges}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`w-full pl-8 pr-4 py-2 rounded-lg border-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition ${
                errors.originCharges
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-200 dark:border-gray-600"
              }`}
            />
          </div>
          {errors.originCharges && (
            <p className="text-red-500 text-xs mt-1">{errors.originCharges}</p>
          )}
        </div>

        {/* Destination Charges */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Destination Charges <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-2.5 text-gray-600 dark:text-gray-400">
              $
            </span>
            <input
              type="number"
              name="destinationCharges"
              value={formData.destinationCharges}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`w-full pl-8 pr-4 py-2 rounded-lg border-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition ${
                errors.destinationCharges
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-200 dark:border-gray-600"
              }`}
            />
          </div>
          {errors.destinationCharges && (
            <p className="text-red-500 text-xs mt-1">{errors.destinationCharges}</p>
          )}
        </div>

        {/* Transit Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Transit Time (Days) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="transitTime"
            value={formData.transitTime}
            onChange={handleInputChange}
            placeholder="Enter transit time in days"
            min="1"
            className={`w-full px-4 py-2 rounded-lg border-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition ${
              errors.transitTime
                ? "border-red-500 dark:border-red-400"
                : "border-gray-200 dark:border-gray-600"
            }`}
          />
          {errors.transitTime && (
            <p className="text-red-500 text-xs mt-1">{errors.transitTime}</p>
          )}
        </div>

        {/* Validity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Validity <span className="text-red-500">*</span>
          </label>
          <select
            name="validity"
            value={formData.validity}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg border-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition ${
              errors.validity
                ? "border-red-500 dark:border-red-400"
                : "border-gray-200 dark:border-gray-600"
            }`}
          >
            <option value="">Select validity period</option>
            <option value="7 days">7 days</option>
            <option value="14 days">14 days</option>
            <option value="30 days">30 days</option>
            <option value="60 days">60 days</option>
            <option value="90 days">90 days</option>
          </select>
          {errors.validity && (
            <p className="text-red-500 text-xs mt-1">{errors.validity}</p>
          )}
        </div>

        {/* Total Bid Display */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Total Bid Amount
            </span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${totalBid.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-3 rounded-lg text-sm">
            {errors.submit}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || submitting}
          className={`w-full py-3 rounded-lg font-semibold text-white transition duration-200 ${
            isFormValid && !submitting
              ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer"
              : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60"
          }`}
        >
          {submitting ? "Submitting..." : "🎯 Place Your Bid"}
        </button>
      </form>
    </div>
  );
};

export default PlaceBidForm;
