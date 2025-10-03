import React from "react";
import CustomDropdown from "./CustomDropdown";
import { User, Users, Star, Crown, Briefcase, Clock, FileText, Calendar,Home, GraduationCap ,Building,Laptop} from "lucide-react";

const experienceLevels = [
  { value: "Junior", icon: User },
  { value: "Intermediate", icon: Users },
  { value: "Senior", icon: Star },
  // { value: "Executive Level", icon: Crown },
];

const jobTypes = [
  { value: "Full-time", icon: Briefcase },
  { value: "Part-time", icon: Clock },
  { value: "Contract", icon: FileText },
  { value: "Temporary", icon: Calendar },
  { value: "Internship", icon: GraduationCap },
];

const workModes = [
  { value: "Remote", icon: Home },
  { value: "OnSite", icon: Building },
  { value: "Hybrid", icon: Laptop },
];

export default function JobDetailsSection({ formData, errors, handleChange, openDropdown, setOpenDropdown,isEditJob }) {
  const experienceKey = isEditJob ? "JobLevelofExpertise" : "JobLevelofexpertise";

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
        <span>Job Details</span>
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-purple-700">Work Mode</label>
          <CustomDropdown
            name="JobModeofWork"
            value={formData.JobModeofWork || ""}
            options={workModes}
            onChange={handleChange}
            placeholder="Select work arrangement"
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-purple-700">Experience Level</label>
          <CustomDropdown
            name={experienceKey}
  value={formData[experienceKey] || ""}
  options={experienceLevels}
  onChange={handleChange}
  placeholder="Choose experience level"
  openDropdown={openDropdown}
  setOpenDropdown={setOpenDropdown}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-purple-700">Job Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="JobTitle"
            value={formData.JobTitle || ""}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 bg-white shadow-sm ${errors.jobTitle ? "border-red-300" : "border-gray-200"}`}
            placeholder="Senior Software Engineer"
          />
          {errors.jobTitle && <p className="text-red-500 text-sm mt-2 flex items-center space-x-1"><span className="w-1 h-1 bg-red-500 rounded-full"></span><span>{errors.jobTitle}</span></p>}
        </div>
      </div>
    </div>
  );
}
