import React from "react";
import CustomDropdown from "./CustomDropdown";
import { FileText, Eye, EyeOff, Mail } from "lucide-react";

const statusOptions = [
  { value: "Draft", icon: FileText },
  { value: "Publish", icon: Eye },
  { value: "Closed", icon: EyeOff },
];

export default function PublicationSection({ formData, errors, handleChange, openDropdown, setOpenDropdown }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
        <span>Publication Settings</span>
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-purple-700">Publication Status</label>
          <CustomDropdown
            name="JobStatus"
            value={formData.JobStatus || ""}
            options={statusOptions}
            onChange={handleChange}
            placeholder="Select status"
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-purple-700">Resume Submission Email <span className="text-red-500">*</span></label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="JobSendResume"
              value={formData.JobSendResume || ""}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 bg-white shadow-sm ${errors.sendResumesTo ? "border-red-300" : "border-gray-200"}`}
              placeholder="hr@company.com"
            />
          </div>
          {errors.sendResumesTo && <p className="text-red-500 text-sm mt-2 flex items-center space-x-1"><span className="w-1 h-1 bg-red-500 rounded-full"></span><span>{errors.sendResumesTo}</span></p>}
        </div>
      </div>
    </div>
  );
}
