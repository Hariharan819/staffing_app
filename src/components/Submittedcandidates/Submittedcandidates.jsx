

import React, { useEffect, useState } from 'react'
import CandidateTable from '../candidates/CandidateTable';
import ViewResumeModal from '../candidates/ViewResumeModal';
import UserProfile from '../Newresponses/UserProfile';

const Submittedcandidates = () => {
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const itemsPerPage = 10;
    const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
const [userProfileModalOpen, setUserProfileModalOpen] = useState(false);
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const userdata = JSON.parse(localStorage.getItem("userData") || "{}");
        const employerId = userdata?.id;

        if (!token || !employerId) throw new Error("Authentication required");

        const response = await fetch(
          `https://app.blogpal.ai/ipartnerStaffingV1/candidates/${employerId}`,
          {
            method: "GET",
            headers: { 
              "Content-Type": "application/json", 
              Authorization: `Bearer ${token}` 
            },
          }
        );

        const raw = await response.text();
        if (!response.ok) throw new Error(`Failed: ${response.status} ${raw}`);
        if (!raw) throw new Error("API returned empty response");

        const data = JSON.parse(raw);
        const selectedCandidates = (data.Candidate || [])
          .map(c => ({
            ...c,
            candidate_status: (c.candidate_status || "").trim().toLowerCase(),
          }))
          .filter(c => c.candidate_status === "rtr submitted"); // Keep only selected
            //  "candidate_status": "RTR submitted"

        setCandidates(selectedCandidates);
        // console.log(selectedCandidates)
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Pagination
  const totalPages = Math.ceil(candidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCandidates = candidates.slice(startIndex, startIndex + itemsPerPage);

  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(p => p - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(p => p + 1);

  // Resume modal
  const handleViewResume = (resumeId) => {
    setResumeUrl(`https://app.blogpal.ai/ipartnerStaffingV1/pdf/${resumeId}`);
    setModalOpen(true);
  };

  const statusBadgeClasses = () => 
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"; // Always selected
const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate);
    setUserProfileModalOpen(true);
  };
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
        <div className="bg-white p-6  flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-purple-800 mb-2">Submitted candidates</h1>
          <p className="text-gray-900">You can download RTR here</p>
        </div>
        
      </div>
      <CandidateTable
        candidates={currentCandidates}
        loading={loading}
        onViewResume={handleViewResume}
        onViewProfile={handleViewProfile}
        statusBadgeClasses={statusBadgeClasses}
        showEyeIcon={true}
        compactView={true}
        showdownloadrtr={true}
      />

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between pt-4">
        <div className="text-sm text-gray-600">
          Showing {candidates.length === 0 ? 0 : startIndex + 1} –{" "}
          {Math.min(currentPage * itemsPerPage, candidates.length)} of {candidates.length} candidates
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
            disabled={currentPage === totalPages || candidates.length === 0}
            className="bg-purple-600 px-4 py-2 text-sm font-medium cursor-pointer rounded-xl text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <ViewResumeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        resumeUrl={resumeUrl}
      />
       <UserProfile
        candidate={selectedCandidate}
        isOpen={userProfileModalOpen}
        onClose={() => setUserProfileModalOpen(false)}
          readOnly={true}
      />
      
    </div>
  );
};

export default Submittedcandidates;
