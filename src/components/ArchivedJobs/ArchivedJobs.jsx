
// import { Plus, Laptop, Archive } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from 'react-hot-toast';
// export default function ArchivedJobs() {
//   const navigate = useNavigate();

//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedJobs, setSelectedJobs] = useState([]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 10; // show 10 jobs per page

//   const fetchJobs = async () => {
//     const token = localStorage.getItem("token");
//     const userData = JSON.parse(localStorage.getItem("userData"));
//     const employerID = userData?.id;

//     if (!token || !employerID) {
//       setLoading(false);
//       return [];
//     }

//     try {
//       const res = await fetch(
//         `https://app.blogpal.ai/ipartnerStaffingV1/jobs/${employerID}`,
//         {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const data = await res.json();
//       console.log(data)
//       setJobs(Array.isArray(data) ? data : [data]);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

 
//   const archivedJobs = jobs.filter(
//     (job) => job.JobStatus?.toLowerCase() === "archived"
//   ).sort((a, b) => new Date(b.JobPostedDate) - new Date(a.JobPostedDate));

//   const handleCheckboxChange = (jobId, checked) => {
//   setSelectedJobs((prev) =>
//     checked ? [...prev, jobId] : prev.filter((id) => id !== jobId)
//   );
// };

//   const handleUnpublish = async () => {
//      if (!selectedJobs.length) return toast.error("Select at least one job!");
//   const token = localStorage.getItem("token");

//   try {
//     for (let jobId of selectedJobs) {
//       await fetch(`https://app.blogpal.ai/ipartnerStaffingV1/job/u/${jobId}`, {
//         method: "PUT", 
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ JobStatus: "Draft" }),
//       });
//     }

//     setJobs((prev) => prev.filter((job) => !selectedJobs.includes(job.Jobseconduid)));
//     setSelectedJobs([]);
//     toast.success("Selected jobs moved to Draft successfully!");
//   } catch (err) {
//     console.error(err);
//     toast.error("Something went wrong while updating jobs.");
//   }
// };
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const filteredJobs = archivedJobs.slice(indexOfFirstJob, indexOfLastJob);

//   const totalPages = Math.ceil(archivedJobs.length / jobsPerPage);

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <div className="container mx-auto px-4 py-8 max-w-7xl">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-purple-800 mb-2">
//                 Archived Jobs
//               </h1>
//               <p className="text-gray-900">
//                 Manage and review your archived job listings
//               </p>
//             </div>
//             <button
//               onClick={() => navigate("/add-job")}
//               className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
//             >
//               <Plus className="h-5 w-5" />
//               Add new job
//             </button>
//           </div>
//         </div>

//         {/* Jobs List */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           {/* List Header */}
//           <div className="bg-white px-6 py-4 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-purple-900 mb-2">
//               Archived Jobs List
//             </h2>
//             <p className="text-gray-900 text-sm">
//               You can change job status to Unpublish here
//             </p>
//           </div>

//           {/* Table Header */}
//           <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-purple-50/80 border-b border-gray-200 text-sm font-medium text-black">
//             <div className="col-span-1"></div>
//             <div className="col-span-4">Title</div>
//             <div className="col-span-2">Sector</div>
//             <div className="col-span-3">Location</div>
//             <div className="col-span-2">Status</div>
//           </div>
// {selectedJobs.length > 0 && (
//         <div className="mb-4 flex justify-start mt-3 ml-3">
//           <button
//             onClick={handleUnpublish}
//             className="px-4 py-2 bg-gradient-to-b cursor-pointer from-red-500 to-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
//           >
//             Unpublish
//           </button>
//         </div>
//       )}
//           {/* Job Items */}
//           <div className="divide-y divide-gray-100">
//             {loading ? (
//               // <p className="text-center text-gray-500 py-6">Loading jobs...</p>
//                [...Array(5)].map((_, idx) => (
//     <div
//       key={idx}
//       className="px-6 py-4 animate-pulse border-b border-gray-100"
//     >
//       <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
//         <div className="md:col-span-1">
//           <div className="h-4 w-4 bg-gray-300 rounded"></div>
//         </div>
//         <div className="md:col-span-4">
//           <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
//           <div className="h-3 w-20 bg-gray-200 rounded"></div>
//         </div>
//         <div className="md:col-span-2">
//           <div className="h-4 w-16 bg-gray-300 rounded"></div>
//         </div>
//         <div className="md:col-span-3">
//           <div className="h-4 w-24 bg-gray-300 rounded"></div>
//         </div>
//         <div className="md:col-span-2">
//           <div className="h-4 w-20 bg-gray-300 rounded"></div>
//         </div>
//       </div>
//     </div>
//   ))
//             ) : filteredJobs.length === 0 ? (
//               <p className="text-center text-gray-500 py-6">
//                 No archived jobs found.
//               </p>
//             ) : (
//               filteredJobs.map((job) => (
//                 <div
//                   key={job.Jobseconduid}
//                   className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
//                 >
//                   <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
//                     <div className="md:col-span-1">
//                      <input
//                 type="checkbox"
//                 className="w-4 h-4 text-purple-600 cursor-pointer rounded focus:ring-purple-500"
//                 checked={selectedJobs.includes(job.Jobseconduid)}
//                 onChange={(e) =>
//                   handleCheckboxChange(job.Jobseconduid, e.target.checked)
//                 }
//               />
//                     </div>
//                     <div className="md:col-span-4">
//                       <h3 className="font-semibold text-purple-900 mb-1">
//                         {job.JobTitle}
//                       </h3>
//                       <p className="text-xs text-gray-950">
//                         {job.JobPostedDate || "N/A"}
//                       </p>
//                     </div>
//                     <div className="md:col-span-2">
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-blue-200 bg-blue-50 text-blue-900">
//                         <Laptop size={14} className="mr-1" />
//                         {job.JobCategory || "N/A"}
//                       </span>
//                     </div>
//                     <div className="md:col-span-3">
//                       <p className="text-gray-950 text-sm">
//                         {job.JobLocation || "N/A"}
//                       </p>
//                     </div>
//                     <div className="md:col-span-2">
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 border border-gray-300 text-black">
//                         <Archive size={14} className="mr-1" />
//                         {job.JobStatus || "Archived"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Pagination Footer */}
//         <footer className="flex items-center justify-between pt-6 text-sm text-gray-800">
//           <p>
//             Showing{" "}
//             {archivedJobs.length === 0 ? 0 : indexOfFirstJob + 1} –{" "}
//             {Math.min(indexOfLastJob, archivedJobs.length)} of{" "}
//             {archivedJobs.length} archived jobs
//           </p>
//           <div className="flex items-center gap-2">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((prev) => prev - 1)}
//               className="rounded-xl border cursor-pointer px-3 py-2 text-xs disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <button
//               disabled={currentPage === totalPages || totalPages === 0}
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//               className="rounded-xl bg-blue-600 px-3 cursor-pointer py-2 text-xs text-white disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useJobs } from "./useJobs"
import JobRow from "./JobRow";
import SkeletonRow from "./SkeletonRow";

export default function ArchivedJobs() {
  const navigate = useNavigate();
  const {
    jobs,
    loading,
    selectedJobs,
    totalJobs,
    setSelectedJobs,
    currentPage,
    setCurrentPage,
    totalPages,
    unpublishJobs,
  } = useJobs();

  const handleUnpublishClick = async () => {
    if (!selectedJobs.length) return toast.error("Select at least one job!");
    try {
      await unpublishJobs();
      toast.success("Selected jobs moved to Draft successfully!");
    } catch {
      toast.error("Something went wrong while updating jobs.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-purple-800 mb-2">Archived Jobs</h1>
            <p className="text-gray-900">Manage and review your archived job listings</p>
          </div>
          <button
            onClick={() => navigate("/add-job")}
            className="inline-flex items-center gap-2 cursor-pointer rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition"
          >
            <Plus className="h-5 w-5" />
            Add new job
          </button>
        </div>

        {/* Jobs List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* List Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-purple-900 mb-2">Archived Jobs List</h2>
            <p className="text-gray-900 text-sm">You can change job status to Unpublish here</p>
          </div>

          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-purple-50/80 border-b border-gray-200 text-sm font-medium text-black">
            <div className="col-span-1"></div>
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Sector</div>
            <div className="col-span-3">Location</div>
            <div className="col-span-2">Status</div>
          </div>

          {/* Unpublish Button */}
          {selectedJobs.length > 0 && (
            <div className="mb-4 flex justify-start mt-3 ml-3">
              <button
                onClick={handleUnpublishClick}
                className="px-4 py-2 bg-gradient-to-b from-red-500 to-red-600 text-white rounded-lg shadow cursor-pointer transition"
              >
                Unpublish 
              </button>
            </div>
          )}

          {/* Job Items */}
          <div className="divide-y divide-gray-100">
            {loading ? (
              [...Array(5)].map((_, idx) => <SkeletonRow key={idx} />)
            ) : jobs.length === 0 ? (
              <p className="text-center text-gray-500 py-6">No archived jobs found.</p>
            ) : (
              jobs.map((job) => (
                <JobRow
                  key={job.Jobseconduid}
                  job={job}
                  selectedJobs={selectedJobs}
                  handleCheckboxChange={(id, checked) =>
                    setSelectedJobs((prev) =>
                      checked ? [...prev, id] : prev.filter((j) => j !== id)
                    )
                  }
                />
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        <footer className="flex items-center justify-between pt-6 text-sm text-gray-800">
          <p>
          Showing {totalJobs === 0 ? 0 : (currentPage - 1) * 10 + 1} –{" "}
{Math.min(currentPage * 10, totalJobs)} of {totalJobs} archived jobs

          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="rounded-xl border px-3 py-2 text-xs disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="rounded-xl bg-blue-600 px-3 cursor-pointer py-2 text-xs text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
