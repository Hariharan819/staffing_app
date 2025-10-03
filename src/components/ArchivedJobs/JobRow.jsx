import { Laptop, Archive } from "lucide-react";

export default function JobRow({ job, selectedJobs, handleCheckboxChange }) {
  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-1">
          <input
            type="checkbox"
            checked={selectedJobs.includes(job.Jobseconduid)}
            onChange={(e) => handleCheckboxChange(job.Jobseconduid, e.target.checked)}
            className="w-4 h-4 text-purple-600 cursor-pointer rounded focus:ring-purple-500"
          />
        </div>
        <div className="md:col-span-4">
          <h3 className="font-semibold text-purple-900 mb-1">{job.JobTitle}</h3>
          <p className="text-xs text-gray-950">{job.JobPostedDate || "N/A"}</p>
        </div>
        <div className="md:col-span-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-blue-200 bg-blue-50 text-blue-900">
            <Laptop size={14} className="mr-1" />
            {job.JobCategory || "N/A"}
          </span>
        </div>
        <div className="md:col-span-3">
          <p className="text-gray-950 text-sm">{job.JobLocation || "N/A"}</p>
        </div>
        <div className="md:col-span-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 border border-gray-300 text-black">
            <Archive size={14} className="mr-1" />
            {job.JobStatus || "Archived"}
          </span>
        </div>
      </div>
    </div>
  );
}
