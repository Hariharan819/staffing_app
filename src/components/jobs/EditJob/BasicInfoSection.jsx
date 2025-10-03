import React from "react";
import CustomDropdown from "./CustomDropdown";
import { sectorOptions, experienceLevels, jobTypes, payTypes, workModes, statusOptions } from "./dropdownData";


export default function BasicInfoSection({ formData, errors, handleChange, openDropdown, setOpenDropdown }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Basic Information</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-purple-700">Sector *</label>
          <CustomDropdown
            name="JobCategory"
            value={formData.JobCategory || ""}
            options={sectorOptions}
            onChange={handleChange}
            error={errors.sector}
            placeholder="Choose industry sector"
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-purple-700">Requirement ID</label>
          <input
            type="text"
            name="JobReqID"
            value={formData.JobReqID || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 bg-white shadow-sm"
            placeholder="REQ-2024-001"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-purple-700">Client *</label>
          <input
            type="text"
            name="JobMinistry"
            value={formData.JobMinistry || ""}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 bg-white shadow-sm ${errors.client ? "border-red-300" : "border-gray-200"}`}
            placeholder="Enter client company name"
          />
          {errors.client && <p className="text-red-500 text-sm mt-2">{errors.client}</p>}
        </div>
      </div>
    </div>
  );
}
