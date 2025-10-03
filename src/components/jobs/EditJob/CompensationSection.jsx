import React from "react";
import { DollarSign } from "lucide-react";

export default function CompensationSection({ formData, handleChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
        <span>Compensation Range</span>
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-purple-700">
            Minimum Rate
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              name="JobRateMin"
              value={formData.JobRateMin || "" }
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 bg-white shadow-sm"
              placeholder="50,000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-purple-700">
            Maximum Rate
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              name="JobRateMax"
              value={formData.JobRateMax || ""}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 bg-white shadow-sm"
              placeholder="80,000"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
