// // src/components/jobs/LiveJobs.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Plus } from "lucide-react";
// import JobCard from "./JobCard";
// import JobFilters from "./JobFilters";
// import EditJob from "../EditJob/EditJob";
// const LiveJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [tab, setTab] = useState("Live");
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();
//   const jobsPerPage = 10;
// const [editingJob, setEditingJob] = useState(null);

//   const fetchJobs = async () => {
//     const token = localStorage.getItem("token");
//     const userData = JSON.parse(localStorage.getItem("userData"));
//     const employerID = userData?.id;
//     if (!token || !employerID) return [];

//     try {
//       const res = await fetch(`https://app.blogpal.ai/ipartnerStaffingV1/jobs/${employerID}`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       console.log(data);
//       return Array.isArray(data) ? data : [data];
//     } catch (err) {
//       console.error(err);
//       return [];
//     }
//   };

//   useEffect(() => {
//     const loadJobs = async () => {
//       const jobsData = await fetchJobs();
//       setJobs(jobsData);
//       setLoading(false);
//     };
//     loadJobs();
//   }, []);

//   if (loading) return <p>Loading jobs...</p>;

//   const sortedJobs = [...jobs].sort((a, b) => new Date(b.JobPostedDate) - new Date(a.JobPostedDate));
//   const filteredJobs = sortedJobs.filter(job => tab === "Live" ? job.JobStatus === "Publish" : job.JobStatus === "Draft");
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

//   const liveCount = jobs.filter(job => job.JobStatus === "Publish").length;
//   const draftCount = jobs.filter(job => job.JobStatus === "Draft").length;

//   return (
//     <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 md:px-6 lg:px-8">
//       <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
//         <div className="space-y-2">
//           <h1 className="text-3xl sm:text-4xl font-sans font-semibold text-purple-900 tracking-tight">
//             Live job opportunities
//           </h1>
//           <p className="text-sm text-gray-900 font-sans">
//             Prioritize open positions, monitor candidate pipelines, and refine listings with confidence.
//           </p>
//         </div>
//         <button onClick={() => navigate("/add-job")} className="inline-flex items-center gap-2 cursor-pointer rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition">
//           <Plus className="h-5 w-5" />
//           Add new job
//         </button>
//       </header>
//       <JobFilters />
//       {/* Tabs */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h2 className="text-2xl font-serif font-semibold text-purple-900 tracking-tight">Jobs list</h2>
//           <p className="text-sm text-gray-900">Track candidate flow, update statuses, and keep every listing ready for the market.</p>
//         </div>
//         <div className="inline-flex items-center rounded-full border border-gray-300 bg-white p-1 text-sm font-medium">
//           <button
//             className={`rounded-full px-4 py-2 text-xs font-semibold uppercase ${tab === "Live" ? "bg-purple-600 text-white" : "text-gray-500 hover:text-gray-900"}`}
//             onClick={() => { setTab("Live"); setCurrentPage(1); }}
//           >
//             Live jobs ({liveCount})
//           </button>
//           <button
//             className={`rounded-full px-4 py-2 text-xs font-semibold uppercase ${tab === "Draft" ? "bg-purple-600 text-white" : "text-gray-500 hover:text-gray-900"}`}
//             onClick={() => { setTab("Draft"); setCurrentPage(1); }}
//           >
//             Draft jobs ({draftCount})
//           </button>
//         </div>
//       </div>

     
//       {/* Job list */}
//       {/* <section className="flex flex-col gap-4">
//         {currentJobs.map((job, idx) => (
//           <JobCard key={job.Jobseconduid || idx} job={job} />
//         ))}
//       </section> */}
//       <section className="flex flex-col gap-4">
//   {currentJobs.map((job, idx) => (
//     <JobCard
//       key={job.Jobseconduid || idx}
//       job={job}
//       onEdit={(job) => setEditingJob(job)} // set the editing job
//     />
//   ))}
// </section>

// {/* EditJob pop-up */}
// {editingJob && (
//   <div className="fixed inset-0 z-50 flex justify-center items-start bg-black/40 overflow-auto">
//     <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl p-6 my-10">
//       <EditJob job={editingJob} closeEdit={() => setEditingJob(null)} />
//     </div>
//   </div>
// )}


//       {/* Pagination */}
//       <footer className="flex items-center justify-between gap-4 pt-6 text-sm text-gray-800">
//         <p>
//           Showing {filteredJobs.length === 0 ? 0 : indexOfFirstJob + 1} – {Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} jobs
//         </p>
//         <div className="flex items-center gap-2">
//           <button
//             type="button"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(prev => prev - 1)}
//             className={`rounded-xl border border-gray-500 px-3 py-2 text-xs font-medium transition ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-900 hover:border-gray-500 hover:text-gray-900"}`}
//           >
//             Previous
//           </button>
//           <button
//             type="button"
//             disabled={currentPage === totalPages || totalPages === 0}
//             onClick={() => setCurrentPage(prev => prev + 1)}
//             className={`rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 ${currentPage === totalPages || totalPages === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
//           >
//             Next
//           </button>
//         </div>
//       </footer>
//     </main>
//   );
// };

// export default LiveJobs;


// src/components/jobs/LiveJobs.jsx


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Plus } from "lucide-react";
// import JobCard from "./JobCard";
// import JobFilters from "./JobFilters";
// import EditJob from "../EditJob/EditJob";

// const LiveJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [tab, setTab] = useState("Live");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editingJob, setEditingJob] = useState(null);

//   const navigate = useNavigate();
//   const jobsPerPage = 10;

//   const fetchJobs = async () => {
//     const token = localStorage.getItem("token");
//     const userData = JSON.parse(localStorage.getItem("userData"));
//     const employerID = userData?.id;
//     if (!token || !employerID) return [];

//     try {
//       const res = await fetch(`https://app.blogpal.ai/ipartnerStaffingV1/jobs/${employerID}`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       //  console.log(data);
//       return Array.isArray(data) ? data : [data];
//     } catch (err) {
//       console.error(err);
//       return [];
//     }
//   };

//   useEffect(() => {
//     const loadJobs = async () => {
//       const jobsData = await fetchJobs();
//       setJobs(jobsData);
//       setLoading(false);
//     };
//     loadJobs();
//   }, []);

//   // Pagination & filtering
//   const sortedJobs = [...jobs].sort(
//     (a, b) => new Date(b.JobPostedDate) - new Date(a.JobPostedDate)
//   );
//   const filteredJobs = sortedJobs.filter((job) =>
//     tab === "Live" ? job.JobStatus === "Publish" : job.JobStatus === "Draft"
//   );
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

//   const liveCount = jobs.filter((job) => job.JobStatus === "Publish").length;
//   const draftCount = jobs.filter((job) => job.JobStatus === "Draft").length;

//   return (
//     <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 md:px-6 lg:px-8">
//       {/* Header */}
//       <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
//         <div className="space-y-2">
//           <h1 className="text-3xl sm:text-4xl font-sans font-semibold text-purple-900 tracking-tight">
//             Live job opportunities
//           </h1>
//           <p className="text-sm text-gray-900 font-sans">
//             Prioritize open positions, monitor candidate pipelines, and refine listings with confidence.
//           </p>
//         </div>
//         <button
//           onClick={() => navigate("/add-job")}
//           className="inline-flex items-center gap-2 cursor-pointer rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition"
//         >
//           <Plus className="h-5 w-5" />
//           Add new job
//         </button>
//       </header>

//       <JobFilters setJobs={setJobs}  />

//       {/* Tabs */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h2 className="text-2xl font-serif font-semibold text-purple-900 tracking-tight">Jobs list</h2>
//           <p className="text-sm text-gray-900">
//             Track candidate flow, update statuses, and keep every listing ready for the market.
//           </p>
//         </div>
//         <div className="inline-flex items-center rounded-full border border-gray-300 bg-white p-1 text-sm font-medium">
//           <button
//             className={`rounded-full px-4 py-2 text-xs font-semibold uppercase ${
//               tab === "Live" ? "bg-purple-600 text-white" : "text-gray-500 hover:text-gray-900"
//             }`}
//             onClick={() => {
//               setTab("Live");
//               setCurrentPage(1);
//             }}
//           >
//             Live jobs ({liveCount})
//           </button>
//           <button
//             className={`rounded-full px-4 py-2 text-xs font-semibold uppercase ${
//               tab === "Draft" ? "bg-purple-600 text-white" : "text-gray-500 hover:text-gray-900"
//             }`}
//             onClick={() => {
//               setTab("Draft");
//               setCurrentPage(1);
//             }}
//           >
//             Draft jobs ({draftCount})
//           </button>
//         </div>
//       </div>

//       {/* Job list */}
//       <section className="flex flex-col gap-4">
//         {loading ? (
//           <p className="text-gray-500 mx-auto">Loading jobs...</p>
//         ) : currentJobs.length === 0 ? (
//           <p className="text-gray-500">No jobs found.</p>
//         ) : (
//           currentJobs.map((job, idx) => (
//             <JobCard key={job.Jobseconduid || idx} job={job} onEdit={(job) => setEditingJob(job)} />
//           ))
//         )}
//       </section>

//       {/* EditJob pop-up */}
//       {editingJob && (
//         <div className="fixed inset-0 z-50 flex justify-center items-start bg-black/40 overflow-auto">
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl p-6 my-10">
//             <EditJob job={editingJob} closeEdit={() => setEditingJob(null)} />
//           </div>
//         </div>
//       )}

//       {/* Pagination */}
//       <footer className="flex items-center justify-between gap-4 pt-6 text-sm text-gray-800">
//         <p>
//           Showing {filteredJobs.length === 0 ? 0 : indexOfFirstJob + 1} – {Math.min(indexOfLastJob, filteredJobs.length)} of{" "}
//           {filteredJobs.length} jobs
//         </p>
//         <div className="flex items-center gap-2">
//           <button
//             type="button"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//             className={`rounded-xl border border-gray-500 px-3 py-2 text-xs font-medium transition ${
//               currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-900 hover:border-gray-500 hover:text-gray-900"
//             }`}
//           >
//             Previous
//           </button>
//           <button
//             type="button"
//             disabled={currentPage === totalPages || totalPages === 0}
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             className={`rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 ${
//               currentPage === totalPages || totalPages === 0 ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       </footer>
//     </main>
//   );
// };

// export default LiveJobs;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drama, Plus } from "lucide-react";
import JobCard from "./JobCard";
import JobFilters from "./JobFilters";
import EditJob from "../EditJob/EditJob";
import toast from 'react-hot-toast';

const LiveJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("Live");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingJob, setEditingJob] = useState(null);
  //
  const [candidates, setCandidates] = useState([]);

  const [selectedJobs, setSelectedJobs] = useState([]);


  const navigate = useNavigate();
  const jobsPerPage = 10;





  const fetchCandidates = async () => {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const employerID = userData?.id;
  if (!token || !employerID) return;

  try {
    const res = await fetch(`https://app.blogpal.ai/ipartnerStaffingV1/candidates/${employerID}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCandidates(Array.isArray(data) ? data : [data]);
      //  console.log("Candidates fetched:", data);
  } catch (err) {
    console.error(err);
  }
};

  // Initial fetch to load all jobs
  const fetchJobs = async () => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData"));
    const employerID = userData?.id;
    if (!token || !employerID) return [];

    try {
      const res = await fetch(`https://app.blogpal.ai/ipartnerStaffingV1/jobs/${employerID}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // console.log(data)
      setJobs(Array.isArray(data) ? data : [data]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchJobs();
    fetchCandidates();
  
  }, []);

const handleBulkAction = async (status) => {
  if (!selectedJobs.length) return toast.error("Select at least one job!");

  try {
    await Promise.all(
      selectedJobs.map((jobId) =>
        fetch(`https://app.blogpal.ai/ipartnerStaffingV1/job/u/${jobId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ JobStatus: status }),
        })
      )
    );

    toast.success(`${status} successful!`);
    setSelectedJobs([]); 
     fetchJobs();   
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }
};
  // Tabs & pagination
  const sortedJobs = [...jobs].sort((a, b) => new Date(b.JobPostedDate) - new Date(a.JobPostedDate));
  const filteredJobs = sortedJobs.filter((job) =>
    tab === "Live" ? job.JobStatus === "Publish" : job.JobStatus === "Draft"
  );
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const liveCount = jobs.filter((job) => job.JobStatus === "Publish").length;
  const draftCount = jobs.filter((job) => job.JobStatus === "Draft").length;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
     
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <div>
    <h1 className="text-balance font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-purple-900">
      Live job opportunities
    </h1>
    <p className="mt-2 text-md  text-slate-900">
      Prioritize open positions, monitor candidate pipelines, and refine listings with confidence.
    </p>
 </div>

  <button
    onClick={() => navigate("/add-job")}
    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
  >
    <Plus className="h-5 w-5" />
    Add new job
  </button>
</header>


      {/* Filters */}
      <JobFilters setJobs={setJobs} fetchDefaultJobs={fetchJobs}  />


      {/* Tabs */}
     
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <h2
      id="jobs-list"
      className="text-balance mb-2 font-serif text-3xl font-semibold tracking-tight text-purple-900"
    >
      Jobs list
    </h2>
    <p className=" text-md  text-slate-950">
      Track candidate flow, update statuses, and keep every listing ready for the market.
    </p>
  </div>

  <div className="inline-flex items-center rounded-full border p-1">
    <button
      className={`rounded-full px-4 py-2 text-xs cursor-pointer font-semibold transition ${
        tab === "Live"
          ? "bg-purple-600 text-white"
          : "text-gray-500 hover:text-purple-600"
      }`}
      onClick={() => {
        setTab("Live");
        setCurrentPage(1);
      }}
    >
      Live jobs ({liveCount})
    </button>
    <button
      className={`rounded-full px-4 py-2 text-xs cursor-pointer font-semibold transition ${
        tab === "Draft"
          ? "bg-purple-600 text-white"
          : "text-gray-500 hover:text-purple-600"
      }`}
      onClick={() => {
        setTab("Draft");
        setCurrentPage(1);
      }}
    >
      Draft jobs ({draftCount})
    </button>
  </div>
</div>

{selectedJobs.length > 0 && (
  <div className="flex gap-3 -mt-4">
    <button onClick={() => handleBulkAction("Publish")} className="bg-gradient-to-br from-green-500 to-green-600 cursor-pointer text-white px-4 py-2 rounded-xl">Republish</button>
    <button onClick={() => handleBulkAction("archived")} className="bg-gradient-to-br from-red-500 to-red-600 cursor-pointer text-white px-4 py-2 rounded-xl">Archive</button>
    <button onClick={() => handleBulkAction("Draft")} className="bg-gradient-to-br from-yellow-500 to-yellow-600 cursor-pointer text-white px-4 py-2 rounded-xl">Draft</button>
  </div>
)}


      {/* Job list */}
      {/* <section className="flex flex-col gap-4">
        {loading ? (
          <p className="text-gray-500 mx-auto">Loading jobs...</p>
        ) : currentJobs.length === 0 ? (
          <p className="text-gray-500">No jobs found.</p>
        ) : (
          currentJobs.map((job, idx) => (
            <JobCard key={job.Jobseconduid || idx} job={job} candidates={candidates} selectedJobs={selectedJobs}   
  setSelectedJobs={setSelectedJobs} onEdit={(job) => setEditingJob(job)} />
          ))
        )}
      </section> */}
      <section className="flex flex-col gap-4">
  {loading ? (
    // Skeleton loader
    
    <>
    
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className="animate-pulse flex flex-col gap-2 p-4 rounded-lg bg-white  shadow-sm"
        >
          <div className="h-5 w-3/4 bg-gray-300  rounded"></div>
          <div className="h-4 w-1/2 bg-gray-300  rounded"></div>
          <div className="h-3 w-1/4 bg-gray-300  rounded mt-2"></div>
        </div>
      ))}
    </>
  ) : currentJobs.length === 0 ? (
    <p className="text-gray-500">No jobs found.</p>
  ) : (
    currentJobs.map((job, idx) => (
      <JobCard
        key={job.Jobseconduid || idx}
        job={job}
        candidates={candidates}
        selectedJobs={selectedJobs}
        setSelectedJobs={setSelectedJobs}
        onEdit={(job) => setEditingJob(job)}
      />
    ))
  )}
</section>


   

{editingJob && (
  <div className="fixed inset-0 z-50 flex justify-center items-start bg-black/40 overflow-auto">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl p-6 my-10">
      <EditJob
        job={editingJob} 
        closeEdit={() => setEditingJob(null)}
        onUpdate={(updatedJob) => {
          
          setJobs((prev) =>
            prev.map((j) =>
              j.Jobseconduid === updatedJob.Jobseconduid ? updatedJob : j
            )
          );
        }}
      />
    </div>
  </div>
)}

      {/* Pagination */}
      <footer className="flex items-center justify-between pt-6 text-sm text-gray-800">
        <p>
          Showing {filteredJobs.length === 0 ? 0 : indexOfFirstJob + 1} – {Math.min(indexOfLastJob, filteredJobs.length)} of{" "}
          {filteredJobs.length} jobs
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="rounded-xl border  cursor-pointer px-3 py-2 text-xs"
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="rounded-xl bg-blue-600 px-3  cursor-pointer py-2 text-xs text-white"
          >
            Next
          </button>
        </div>
      </footer>
    </main>
  );
};

export default LiveJobs;
