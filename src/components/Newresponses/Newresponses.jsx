

// import React, { useEffect, useState } from 'react'
// import { Plus } from "lucide-react";
// import CandidateTable from '../candidates/CandidateTable'
// import ChangeStatusModal from '../candidates/ChangeStatusModal';
// import ViewResumeModal from '../candidates/ViewResumeModal';
// import { useNavigate } from "react-router-dom";
// import CandidateFilters from '../candidates/CandidateFilters';
// import UserProfile from './UserProfile';
// const Newresponses = () => {
//     const [candidates, setCandidates] = useState([]); // all candidates
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [resumeUrl, setResumeUrl] = useState("");
//     const [modalOpen, setModalOpen] = useState(false);
//     const [statusModalOpen, setStatusModalOpen] = useState(false);
    
//     const [userProfileModalOpen, setUserProfileModalOpen] = useState(false);
//     const [selectedCandidate, setSelectedCandidate] = useState(null);
//      const navigate = useNavigate();
//     // Pagination state
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;

//     useEffect(() => {
//         const fetchCandidates = async () => {
//             try {
//                 setLoading(true);
//                 const token = localStorage.getItem("token");
//                 const userdata = JSON.parse(localStorage.getItem("userData") || "{}");
//                 const employerId = userdata?.id;

//                 if (!token || !employerId) {
//                     setError("Authentication required");
//                     return;
//                 }

//                 const response = await fetch(`https://app.blogpal.ai/ipartnerStaffingV1/candidates/${employerId}`, {
//                     method: "GET",
//                     headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//                 });

//                 const raw = await response.text();
//                 if (!response.ok) throw new Error(`Failed: ${response.status} ${raw}`);
//                 if (!raw) throw new Error("API returned empty response");

//                 const data = JSON.parse(raw);
//                 console.log(data)
//                 const allCandidates = (data.Candidate || []).map(c => ({
//                     ...c,
//                     candidate_status: (c.candidate_status || "").trim().toLowerCase(),
//                 }));

//                 setCandidates(allCandidates); // store all candidates
//                 setError(null);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCandidates();
//     }, []);

//     // Filter only "new" candidates dynamically
//     const newCandidates = candidates.filter(c => c.candidate_status === "new");
//     const filteredCount = newCandidates.length;
//     const totalPages = Math.ceil(filteredCount / itemsPerPage);
//     const currentCandidates = newCandidates.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );
//  const [filters, setFilters] = useState({
//     jobTitle: "",
//     candidateName: "",
//     status: "New",
//     receivedDate: "",
//   })
//     const handlePreviousPage = () => {
//         if (currentPage > 1) setCurrentPage(prev => prev - 1);
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
//     };

//     const handleViewResume = (resumeId) => {
//         setResumeUrl(`https://app.blogpal.ai/ipartnerStaffingV1/pdf/${resumeId}`);
//         setModalOpen(true);
//     };

//     const handleStatusUpdated = (candidateId, newStatus) => {
//         setCandidates(prev =>
//             prev.map(c =>
//                 c.CandidateID === candidateId ? { ...c, candidate_status: newStatus.toLowerCase() } : c
//             )
//         );

//         // If status changed from "new" to something else, adjust current page
//         if (newStatus.toLowerCase() !== "new" && (currentPage - 1) * itemsPerPage >= filteredCount - 1 && currentPage > 1) {
//             setCurrentPage(prev => prev - 1);
//         }
//     };

//     const handleArchived = (candidateId) => {
//         setCandidates(prev =>
//             prev.map(c =>
//                 c.CandidateID === candidateId ? { ...c, candidate_status: "archived" } : c
//             )
//         );

//         // Adjust pagination if last candidate on page was archived
//         if ((currentPage - 1) * itemsPerPage >= filteredCount - 1 && currentPage > 1) {
//             setCurrentPage(prev => prev - 1);
//         }
//     };

//     const handleOpenStatusModal = (candidate) => {
//         setSelectedCandidate(candidate);
//         setStatusModalOpen(true);
//     };
//      const handleFilterChange = (field, value) => {
//     setFilters(prev => ({ ...prev, [field]: value }))
//     setCurrentPage(1)
//   }
//    const handleApplyFilters = () => setCurrentPage(1)
//   const handleResetFilters = () => {
//     setFilters({ jobTitle: "", candidateName: "", status: "Any status", receivedDate: "" })
//     setCurrentPage(1)
//   }
// const handleViewProfile = (candidate) => {
//   setSelectedCandidate(candidate);  // set the candidate to display
//   setUserProfileModalOpen(true);    // open the modal
// };
//     const statusBadgeClasses = status => {
//         switch ((status || "").toLowerCase()) {
//             case "new":
//                 return "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-200";
//             case "selected":
//                 return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";
//             case "on hold":
//                 return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";
//             case "rejected":
//                 return "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200";
//             case "archived":
//                 return "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200";
//             default:
//                 return "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200";
//         }
//     };


//     return (
//         <div className='min-h-screen bg-white p-4 sm:p-6 lg:p-8'>
//           <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                     <div>
//                       <h1 className="text-3xl font-bold text-purple-800 mb-2">New responses</h1>
//                       <p className="text-gray-900">Manage and review your New responses listings</p>
//                     </div>
//                     <button
//                       onClick={() => navigate("/add-job")}
//                       className="inline-flex items-center gap-2 cursor-pointer rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition"
//                     >
//                       <Plus className="h-5 w-5" />
//                       Add new job
//                     </button>
//                   </div>

//                    <CandidateFilters
//                           filters={filters}
//                           handleFilterChange={handleFilterChange}
//                           handleApplyFilters={handleApplyFilters}
//                           handleResetFilters={handleResetFilters}
//                           hideStatus={true}
//                         />
//             <CandidateTable
// candidates={currentCandidates}
//  onViewProfile={handleViewProfile}
//   loading={loading}
//   onViewResume={handleViewResume}
//   onArchived={handleArchived}
//   onOpenStatusModal={handleOpenStatusModal}
//   statusBadgeClasses={statusBadgeClasses}
//   showEyeIcon={true}
// />


//             {/* Pagination */}
//             <div className="mt-6 flex items-center justify-between pt-4">
//                 <div className="text-sm text-gray-600">
//                     Showing{" "}
//                     {filteredCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} –{" "}
//                     {Math.min(currentPage * itemsPerPage, filteredCount)} of {filteredCount} candidates
//                 </div>
//                 <div className="flex gap-2">
//                     <button
//                         onClick={handlePreviousPage}
//                         disabled={currentPage === 1}
//                         className="rounded-xl border border-gray-300 cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
//                     >
//                         Previous
//                     </button>
//                     <button
//                         onClick={handleNextPage}
//                         disabled={currentPage === totalPages || filteredCount === 0}
//                         className="bg-purple-600 px-4 py-2 text-sm font-medium cursor-pointer rounded-xl text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>

//             <ChangeStatusModal
//                 isOpen={statusModalOpen}
//                 onClose={() => setStatusModalOpen(false)}
//                 candidate={selectedCandidate}
//                 onUpdateStatus={handleStatusUpdated}
//             />

//             <ViewResumeModal
//                 isOpen={modalOpen}
//                 onClose={() => setModalOpen(false)}
//                 resumeUrl={resumeUrl}
//             />
//   <UserProfile
//   candidate={selectedCandidate}
//   isOpen={userProfileModalOpen}
//   onClose={() => setUserProfileModalOpen(false)}
// />

//         </div>
//     );
// };

// export default Newresponses;

import React, { useEffect, useState } from 'react'
import { Plus } from "lucide-react";
import CandidateTable from '../candidates/CandidateTable'
import ChangeStatusModal from '../candidates/ChangeStatusModal';
import ViewResumeModal from '../candidates/ViewResumeModal';
import { useNavigate } from "react-router-dom";
import CandidateFilters from '../candidates/CandidateFilters';
import UserProfile from './UserProfile';

const Newresponses = () => {
  const [candidates, setCandidates] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [userProfileModalOpen, setUserProfileModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const userdata = JSON.parse(localStorage.getItem("userData") || "{}");
        const employerId = userdata?.id;

        if (!token || !employerId) {
          setError("Authentication required");
          return;
        }

        const response = await fetch(
          `https://app.blogpal.ai/ipartnerStaffingV1/candidates/${employerId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          }
        );

        const raw = await response.text();
        if (!response.ok) throw new Error(`Failed: ${response.status} ${raw}`);
        if (!raw) throw new Error("API returned empty response");

        const data = JSON.parse(raw);
        const allCandidates = (data.Candidate || []).map(c => ({
          ...c,
          candidate_status: (c.candidate_status || "").trim().toLowerCase(),
        }));

        setCandidates(allCandidates);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const [filters, setFilters] = useState({
    jobTitle: "",
    candidateName: "",
    status: "New",
    receivedDate: "",
  });

  // --- Filtering Logic ---
  let filteredCandidates = candidates.filter(c => c.candidate_status === "new");

  if (filters.jobTitle) {
    filteredCandidates = filteredCandidates.filter(
      c => c.candidate_jobtitle === filters.jobTitle
    );
  }

  if (filters.candidateName) {
    filteredCandidates = filteredCandidates.filter(c =>
      c.candidate_name?.toLowerCase().includes(filters.candidateName.toLowerCase())
    );
  }

  if (filters.receivedDate) {
    filteredCandidates = filteredCandidates.filter(c => {
      const candidateDate = new Date(c.candidate_createddate).toISOString().split("T")[0];
      return candidateDate === filters.receivedDate;
    });
  }

  // Pagination based on filteredCandidates
  const filteredCount = filteredCandidates.length;
  const totalPages = Math.ceil(filteredCount / itemsPerPage);
  const currentCandidates = filteredCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- Handlers ---
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handleViewResume = (resumeId) => {
    setResumeUrl(`https://app.blogpal.ai/ipartnerStaffingV1/pdf/${resumeId}`);
    setModalOpen(true);
  };

  const handleStatusUpdated = (candidateId, newStatus) => {
    setCandidates(prev =>
      prev.map(c =>
        c.CandidateID === candidateId ? { ...c, candidate_status: newStatus.toLowerCase() } : c
      )
    );

    if (newStatus.toLowerCase() !== "new" && (currentPage - 1) * itemsPerPage >= filteredCount - 1 && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleArchived = (candidateId) => {
    setCandidates(prev =>
      prev.map(c =>
        c.CandidateID === candidateId ? { ...c, candidate_status: "archived" } : c
      )
    );

    if ((currentPage - 1) * itemsPerPage >= filteredCount - 1 && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleOpenStatusModal = (candidate) => {
    setSelectedCandidate(candidate);
    setStatusModalOpen(true);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleApplyFilters = () => setCurrentPage(1);

  const handleResetFilters = () => {
    setFilters({ jobTitle: "", candidateName: "", status: "Any status", receivedDate: "" });
    setCurrentPage(1);
  };

  const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate);
    setUserProfileModalOpen(true);
  };

  const statusBadgeClasses = status => {
    switch ((status || "").toLowerCase()) {
      case "new":
        return "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-200";
      case "selected":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";
      case "on hold":
        return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";
      case "rejected":
        return "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200";
      case "archived":
        return "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200";
      default:
        return "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200";
    }
  };

  // Extract unique jobs
  const uniqueJobs = Array.from(
    new Map(candidates.map(c => [c.candidate_jobuniqueid, c.candidate_jobtitle])).values()
  );

  return (
    <div className='min-h-screen bg-white p-4 sm:p-6 lg:p-8'>
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-purple-800 mb-2">New responses</h1>
          <p className="text-gray-900">Manage and review your New responses listings</p>
        </div>
        <button
          onClick={() => navigate("/add-job")}
          className="inline-flex items-center gap-2 cursor-pointer rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition"
        >
          <Plus className="h-5 w-5" />
          Add new job
        </button>
      </div>

      <CandidateFilters
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleApplyFilters={handleApplyFilters}
        handleResetFilters={handleResetFilters}
        hideStatus={true}
        jobOptions={uniqueJobs}
      />

      <CandidateTable
        candidates={currentCandidates}
        onViewProfile={handleViewProfile}
        loading={loading}
        onViewResume={handleViewResume}
        onArchived={handleArchived}
        onOpenStatusModal={handleOpenStatusModal}
        statusBadgeClasses={statusBadgeClasses}
        showEyeIcon={true}
      />

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between pt-4">
        <div className="text-sm text-gray-600">
          Showing{" "}
          {filteredCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} –{" "}
          {Math.min(currentPage * itemsPerPage, filteredCount)} of {filteredCount} candidates
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="rounded-xl border border-gray-300 cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || filteredCount === 0}
            className="bg-purple-600 px-4 py-2 text-sm font-medium cursor-pointer rounded-xl text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <ChangeStatusModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        candidate={selectedCandidate}
        onUpdateStatus={handleStatusUpdated}
      />

      <ViewResumeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        resumeUrl={resumeUrl}
      />

      <UserProfile
        candidate={selectedCandidate}
        isOpen={userProfileModalOpen}
        onClose={() => setUserProfileModalOpen(false)}
      />
    </div>
  );
};

export default Newresponses;
