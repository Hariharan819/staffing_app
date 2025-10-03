

// import { Calendar, ChevronDown } from "lucide-react"
// import CustomDropdown from "./CustomDropdown"


// export default function CandidateFilters({ filters, handleFilterChange, handleApplyFilters, handleResetFilters }) {
//   return (
//     <div className="mb-8">
//       <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        
//         {/* Job Title */}
//         <div>
//           <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-900">
//             JOB TITLE
//           </label>
//           <input
//             type="text"
//             placeholder="e.g. Medical Office Admin"
//             value={filters.jobTitle}
//             onChange={(e) => handleFilterChange("jobTitle", e.target.value)}
//             className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//           />
//         </div>

//         {/* Candidate Name */}
//         <div>
//           <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-900">
//             CANDIDATE NAME
//           </label>
//           <input
//             type="text"
//             placeholder="Search by full name"
//             value={filters.candidateName}
//             onChange={(e) => handleFilterChange("candidateName", e.target.value)}
//             className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//           />
//         </div>

//         {/* Status */}
       
//         <CustomDropdown
//   value={filters.status}
//   onChange={(val) => handleFilterChange("status", val)}
// />

  


//         {/* Received On */}
//         <div>
//           <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-900">
//             RECEIVED ON
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="dd-mm-yyyy"
//               value={filters.receivedDate}
//               onChange={(e) => handleFilterChange("receivedDate", e.target.value)}
//               className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//             />
//             <Calendar className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
//           </div>
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex flex-wrap gap-3">
//         <button
//           onClick={handleApplyFilters}
//           className="rounded-xl bg-purple-600 px-6 py-2 cursor-pointer font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
//         >
//           Apply filters
//         </button>
//         <button
//           onClick={handleResetFilters}
//           className="rounded-xl border border-gray-300 px-6 py-2 cursor-pointer font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   )
// }



import { Calendar } from "lucide-react"
import CustomDropdown from "./CustomDropdown"
import React from "react"
import JobTitleDropdown from "../Newresponses/JobTitleDropdown"
export default function CandidateFilters({
  filters,
  handleFilterChange,
  handleApplyFilters,
  handleResetFilters,
  jobOptions,
  hideStatus = false, 
}) {
 return (
  <div className="mb-8">
    {/* Card Wrapper */}
    <div className="rounded-2xl bg-white p-6 shadow-sm">
     <div
  className={`grid rounded-xl bg-purple-50 p-6 shadow-sm grid-cols-1 gap-6 
    md:grid-cols-2 
    lg:grid-cols-${hideStatus ? 3 : 4}`}
>

        
        {/* Job Title */}
        <div>
  <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-purple-900">
    Job Title
  </label>

  {/* {jobOptions ? (
    // Show dropdown if jobOptions exists
    <select
      value={filters.jobTitle}
      onChange={(e) => handleFilterChange("jobTitle", e.target.value)}
      className="w-full rounded-xl bg-white border border-purple-200 px-3 py-2 shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
    >
      <option value="">All Jobs</option>
      {jobOptions.map((job, idx) => (
        <option key={idx} value={job}>
          {job}
        </option>
      ))}
    </select>
  ) : (
    // Show text input if jobOptions is not provided
    <input
      type="text"
      placeholder="Ex: Medical Office Admin"
      value={filters.jobTitle}
      onChange={(e) => handleFilterChange("jobTitle", e.target.value)}
      className="w-full rounded-xl bg-white border border-purple-200 px-3 py-2 shadow-sm text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
    />
  )} */}
 {jobOptions ? (
  <JobTitleDropdown filters={filters} handleFilterChange={handleFilterChange} jobOptions={jobOptions} />
) : (
  <input
    type="text"
    placeholder="Ex: Medical Office Admin"
    value={filters.jobTitle}
    onChange={(e) => handleFilterChange("jobTitle", e.target.value)}
    className="w-full rounded-xl bg-white border border-purple-200 px-3 py-2 shadow-sm text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
  />
)}


</div>


        {/* Candidate Name */}
        <div>
          <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-purple-900">
            Candidate Name
          </label>
          <input
            type="text"
            placeholder="Search by full name"
            value={filters.candidateName}
            onChange={(e) => handleFilterChange("candidateName", e.target.value)}
            className="w-full rounded-xl bg-white border border-purple-200 px-3 py-2 shadow-sm text-gray-900 placeholder-gray-700 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Status */}
       {!hideStatus && (
  <div>
    <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-purple-900">
      Status
    </label>
    <CustomDropdown
      value={filters.status}
      onChange={(val) => handleFilterChange("status", val)}
      className="w-full rounded-xl bg-white border border-purple-200 px-3 py-2 shadow-sm text-gray-900 placeholder-gray-700 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
      options={[
        { label: "Any status", value: "Any status" },
        { label: "New", value: "New" },
        { label: "Selected", value: "Selected" },
        { label: "On hold", value: "Onhold" },
        { label: "Rejected", value: "Rejected" },
        { label: "Archived", value: "Archived" },
      ]}
    />
  </div>
)}


       {/* Received On */}
<div>
  <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-purple-900">
    Received On
  </label>
  <div className="relative">
    <input
      type="date"
      value={filters.receivedDate}
      onChange={(e) => handleFilterChange("receivedDate", e.target.value)}
      className="w-full rounded-xl bg-white border border-purple-200 px-3 py-2 shadow-sm text-gray-900 
                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
    />
    <Calendar className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
  </div>
</div>

      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={handleApplyFilters}
          className="rounded-xl bg-purple-600 px-6 py-2 font-medium cursor-pointer text-white shadow-sm hover:bg-purple-700 
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Apply filters
        </button>
        <button
          onClick={handleResetFilters}
          className="rounded-xl border border-purple-400 px-6 py-2 cursor-pointer font-medium text-purple-700 bg-white shadow-sm 
                     hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Reset filters
        </button>
      </div>
    </div>
  </div>
)

}
