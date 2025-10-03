// import { useState, useEffect } from "react";

// export function useJobs() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedJobs, setSelectedJobs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 10;

//   // Fetch jobs
//   const fetchJobs = async () => {
//     setLoading(true);
//     const token = localStorage.getItem("token");
//     const userData = JSON.parse(localStorage.getItem("userData"));
//     const employerID = userData?.id;

//     if (!token || !employerID) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch(
//         `https://app.blogpal.ai/ipartnerStaffingV1/jobs/${employerID}`,
//         {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       const data = await res.json();

//       // Filter archived jobs & sort by JobPostedDate (newest first)
//       const archivedJobs = (Array.isArray(data) ? data : [data])
//         .filter((job) => job.JobStatus?.toLowerCase() === "archived")
//         .sort((a, b) => new Date(b.JobPostedDate) - new Date(a.JobPostedDate));

//       setJobs(archivedJobs);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const totalPages = Math.ceil(jobs.length / jobsPerPage);
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

//   // Unpublish selected jobs
//   const unpublishJobs = async () => {
//     if (!selectedJobs.length) return;

//     const token = localStorage.getItem("token");

//     for (let jobId of selectedJobs) {
//       await fetch(`https://app.blogpal.ai/ipartnerStaffingV1/job/u/${jobId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ JobStatus: "Draft", JobID: jobId }),
//       });
//     }

//     // Remove unpublished jobs from local state
//     setJobs((prev) =>
//       prev.filter((job) => !selectedJobs.includes(job.Jobseconduid)),
//     );
//     setSelectedJobs([]);
//   };

//   return {
//     jobs: currentJobs,
//     loading,
//     selectedJobs,
//     setSelectedJobs,
//     currentPage,
//     setCurrentPage,
//     totalPages,
//     unpublishJobs,
//   };
// }

import { useState, useEffect } from "react";

export function useJobs() {
  const [jobs, setJobs] = useState([]); // all archived jobs
  const [loading, setLoading] = useState(true);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  // Fetch archived jobs
  const fetchJobs = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const employerID = userData?.id;

    if (!token || !employerID) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://app.blogpal.ai/ipartnerStaffingV1/jobs/${employerID}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();

      const archivedJobs = (Array.isArray(data) ? data : [data])
        .filter((job) => job.JobStatus?.toLowerCase() === "archived")
        .sort((a, b) => new Date(b.JobPostedDate) - new Date(a.JobPostedDate));

      setJobs(archivedJobs);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Pagination
  const totalJobs = jobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Unpublish selected jobs
  const unpublishJobs = async () => {
    if (!selectedJobs.length) return;

    const token = localStorage.getItem("token");

    try {
      for (let jobId of selectedJobs) {
        await fetch(
          `https://app.blogpal.ai/ipartnerStaffingV1/job/u/${jobId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ JobStatus: "Draft" }),
          },
        );
      }

      // Refetch jobs to reflect the latest state
      setSelectedJobs([]);
      fetchJobs();
    } catch (err) {
      console.error("Failed to unpublish jobs:", err);
    }
  };

  return {
    jobs: currentJobs, // jobs for current page
    totalJobs, // total archived jobs count
    loading,
    selectedJobs,
    setSelectedJobs,
    currentPage,
    setCurrentPage,
    totalPages,
    unpublishJobs,
  };
}
