// src/components/jobs/JobCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, Copy, ChevronDown, ChevronUp } from "lucide-react";
import StatusChip from "./StatusChip";
import toast from 'react-hot-toast';

const JobCard = ({ job, onEdit ,selectedJobs ,setSelectedJobs,candidates}) => {
  const [openDesc, setOpenDesc] = useState(false);
  const navigate = useNavigate();
  const statusColor = job.JobStatus === "draft" ? "gray-900" : "blue-600";
// console.log(candidates);
const allCandidates = (candidates || []).flatMap(c => c.Candidate || []);

// const jobCandidates = allCandidates.filter(
//   c => String(c.candidate_jobuniqueid).trim() === String(job.Jobseconduid).trim()
// );

const jobCandidates = allCandidates.filter(
  c => c.candidate_jobuniqueid && job.Jobseconduid &&
       String(c.candidate_jobuniqueid).trim() === String(job.Jobseconduid).trim()
);

const counts = {
  new: jobCandidates.filter(c => c.candidate_status?.toLowerCase() === "new").length,
  selected: jobCandidates.filter(c => c.candidate_status?.toLowerCase() === "selected").length,
  rejected: jobCandidates.filter(c => c.candidate_status?.toLowerCase() === "rejected").length,
  onHold: jobCandidates.filter(c => {
    const status = c.candidate_status?.toLowerCase();
    return status === "onhold" || status === "archived";
  }).length,
};

  return (

<article className="shadow-sm rounded-xl bg-white p-5 ">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
     <input
  type="checkbox"
  checked={selectedJobs.includes(job.Jobseconduid)}
  onChange={(e) => {
    if (e.target.checked) {
      setSelectedJobs([...selectedJobs, job.Jobseconduid]);
    } else {
      setSelectedJobs(selectedJobs.filter(id => id !== job.Jobseconduid));
    }
  }}
  className="w-4 h-4 cursor-pointer my-auto"
/>
    <div className="flex flex-1 flex-col gap-4">
     
      <div className="flex flex-wrap items-start justify-between gap-3">
        
        <div>
          <h3 className="font-serif text-xl mb-2 font-semibold text-purple-700">
            {job.JobTitle}
          </h3>
          <p className="text-sm font-medium text-gray-900">{job.JobLocation}</p>
<div className="flex flex-wrap items-center gap-3 mt-3">
  <StatusChip label={`New: ${counts.new}`} color="blue-600" />
  <StatusChip label={`Selected: ${counts.selected}`} color="green-500" />
  <StatusChip label={`Rejected: ${counts.rejected}`} color="red-500" />
  <StatusChip label={`On Hold: ${counts.onHold}`} color="gray-900" />
</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(job)}
            className="rounded-full border border-gray-300 cursor-pointer bg-white p-2 transition hover:border-purple-600 hover:text-purple-600"
          >
            <Edit2 className="h-4 w-4" />
          </button>

          <button
  onClick={() => {
    const url = `https://ipartnerstaffing.com/#/view/${job.JobSlug}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success("Job URL copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy URL.");
      });
  }}
  className="rounded-full cursor-pointer border border-gray-300 bg-white p-2 transition hover:border-purple-600 hover:text-purple-600"
>
  <Copy className="h-4 w-4" />
</button>

        </div>
      </div>
    </div>
    <div className="w-full max-w-xs shrink-0 space-y-4 rounded-2xl bg-purple-50 p-4">
      <div className="flex items-center justify-center text-sm">
        <span className="font-medium text-gray-950">Date posted</span>
      <span className="font-semibold text-purple-800">
  : {new Date(job.JobUpdatedDate).toUTCString()}
</span>


 {/* <span className="font-semibold text-purple-800"> 
          : {new Date(job.JobPostedDate).toLocaleDateString()} 
        </span> */}
      </div>
      <div className="flex items-start justify-end text-sm">
        <span className="font-medium text-gray-950">Recruiter</span>
        <span className="text-right font-semibold text-purple-700">
          : {job.JobSendResume}
        </span>
      </div>
    </div>
  </div>
</article>

  );


};

export default JobCard;




