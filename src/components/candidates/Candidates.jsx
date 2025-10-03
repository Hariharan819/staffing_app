// "use client"

// import { useEffect, useState } from "react"
// import { Calendar, ChevronDown } from "lucide-react"
// import CandidateFilters from "./CandidateFilters"

// export default function CandidateFilter() {
//   const [candidates, setCandidates] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [filters, setFilters] = useState({
//     jobTitle: "",
//     candidateName: "",
//     status: "Any status",
//     receivedDate: "",
//   })
//   const [activeTab, setActiveTab] = useState("All candidates")
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 10

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         setLoading(true)
//         const token = localStorage.getItem("token")
//         const userdata = JSON.parse(localStorage.getItem("userData") || "{}")
//         const employerId = userdata?.id

//         if (!token || !employerId) {
//           console.error("Token or EmployerID missing in localStorage")
//           setError("Authentication required")
//           return
//         }

//         const response = await fetch(`https://app.blogpal.ai/ipartnerStaffingV1/candidates/${employerId}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         })

//         const raw = await response.text()
//         // console.log("[v0] Raw API response:", raw)

//         if (!response.ok) {
//           throw new Error(`Failed to fetch candidates: ${response.status} ${raw}`)
//         }
//         if (!raw) {
//           throw new Error("API returned empty response")
//         }

//         const data = JSON.parse(raw)
//         const candidateData = data.Candidate || []
//         setCandidates(candidateData)
//         setError(null)
//       } catch (err) {
//         console.error(" Error fetching candidates:", err)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchCandidates()
//   }, [])

//   const handleFilterChange = (field, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const handleApplyFilters = () => {
//     setCurrentPage(1)
//     console.log(" Applying filters:", filters)
//   }

//   const handleResetFilters = () => {
//     setFilters({
//       jobTitle: "",
//       candidateName: "",
//       status: "Any status",
//       receivedDate: "", 
//     })
//     setCurrentPage(1)
//   }

//   const formatDate = (dateString) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "2-digit",
//     })
//   }

//   const getTabCounts = () => {
//     const counts = {
//       "All candidates": candidates.length,
//       New: candidates.filter((c) => c.candidate_status?.toLowerCase() === "new").length,
//       Selected: candidates.filter((c) => c.candidate_status?.toLowerCase() === "selected").length,
//       "On hold": candidates.filter((c) => c.candidate_status?.toLowerCase() === "on hold").length,
//       Rejected: candidates.filter((c) => c.candidate_status?.toLowerCase() === "rejected").length,
//     }
//     return counts
//   }

//   const getFilteredCandidates = () => {
//     if (activeTab === "All candidates") return candidates
//     return candidates.filter((c) => c.candidate_status?.toLowerCase() === activeTab.toLowerCase())
//   }

//   const getPaginatedCandidates = () => {
//     const filtered = getFilteredCandidates()
//     const startIndex = (currentPage - 1) * itemsPerPage
//     const endIndex = startIndex + itemsPerPage
//     return filtered.slice(startIndex, endIndex)
//   }

//   const totalPages = Math.ceil(getFilteredCandidates().length / itemsPerPage)
//   const currentCandidates = getPaginatedCandidates()
//   const tabCounts = getTabCounts()
//   const filteredCount = getFilteredCandidates().length

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage((p) => p - 1)
//   }
//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((p) => p + 1)
//   }

//   const statusBadgeClasses = (status) => {
//     const s = (status || "").toLowerCase()
//     switch (s) {
//       case "new":
//         return "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-200"
//       case "selected":
//         return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
//       case "on hold":
//         return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200"
//       case "rejected":
//         return "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200"
//       case "archived":
//         return "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200"
//       default:
//         return "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-200"
//     }
//   }

//  if (loading) {
//   return (
//     <div className="min-h-screen bg-white p-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
//           <div className="p-6 sm:p-8">
//             {/* Header Skeleton */}
//             <div className="mb-8">
//               <div className="h-6 w-48 animate-pulse rounded bg-gray-200"></div>
//               <div className="mt-2 h-4 w-96 animate-pulse rounded bg-gray-200"></div>
//             </div>

//             {/* Filters Skeleton */}
//             <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//               {Array.from({ length: 4 }).map((_, i) => (
//                 <div key={i} className="space-y-2">
//                   <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
//                   <div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
//                 </div>
//               ))}
//             </div>

//             {/* Tabs Skeleton */}
//             <div className="mb-8 flex flex-wrap gap-2">
//               {["All candidates", "New", "Selected"].map((tab, i) => (
//                 <div
//                   key={i}
//                   className="h-8 w-28 animate-pulse rounded-full bg-gray-200"
//                 ></div>
//               ))}
//             </div>

//             {/* Table Skeleton */}
//             <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-gray-200 bg-gray-50">
//                     {["DATE", "APPLIED POSITION", "CANDIDATE", "STATUS", "RESUME", "ACTIONS"].map(
//                       (col) => (
//                         <th
//                           key={col}
//                           className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
//                         >
//                           {col}
//                         </th>
//                       )
//                     )}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 bg-white">
//                   {Array.from({ length: 6 }).map((_, i) => (
//                     <tr key={i}>
//                       {Array.from({ length: 6 }).map((_, j) => (
//                         <td key={j} className="px-6 py-4">
//                           <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination Skeleton */}
//             <div className="mt-6 flex items-center justify-between pt-4">
//               <div className="h-4 w-40 animate-pulse rounded bg-gray-200"></div>
//               <div className="flex gap-2">
//                 <div className="h-8 w-20 animate-pulse rounded bg-gray-200"></div>
//                 <div className="h-8 w-20 animate-pulse rounded bg-gray-200"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


//   if (error) {
//     return (
//       <div className="min-h-screen bg-white p-8">
//         <div className="mx-auto max-w-7xl">
//           <div className="py-8 text-center">
//             <div className="text-red-500">Error: {error}</div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
//         <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
//           <div className="p-6 sm:p-8">
//             {/* Header */}
//             <div className="mb-8">
//               <h1 className="mb-2 text-2xl font-semibold text-purple-900">Filter candidates</h1>
//               <p className="text-gray-900 text-md">
//                 Pinpoint applicants by job title, name, response status, or date received.
//               </p>
//             </div>

//             {/* Filters */}
//            <CandidateFilters 
//   filters={filters} 
//   handleFilterChange={handleFilterChange} 
//   handleApplyFilters={handleApplyFilters} 
//   handleResetFilters={handleResetFilters} 
// />

//             {/* Tabs */}
//             <div className="mb-8 flex flex-wrap gap-2">
//               {Object.entries(tabCounts).map(([tab, count]) => (
//                 <button
//                   key={tab}
//                   onClick={() => {
//                     setActiveTab(tab)
//                     setCurrentPage(1)
//                   }}
//                   className={`whitespace-nowrap cursor-pointer rounded-full border px-4 py-2 text-sm font-medium ${
//                     activeTab === tab
//                       ? "border-purple-600 bg-purple-100 text-purple-700"
//                       : "border-gray-300 text-gray-900 hover:bg-gray-50"
//                   }`}
//                 >
//                   {tab}
//                   <span className="ml-2 inline-flex items-center justify-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-900">
//                     {count}
//                   </span>
//                 </button>
//               ))}
//             </div>

//             {/* Table */}
//             <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-gray-200 bg-gray-50">
//                     <th className="px-6 py-3 text-left text-md font-medium uppercase  text-blue-950">
//                       DATE
//                     </th>
//                     <th className="px-6 py-3 text-left text-md font-medium uppercase  text-blue-950">
//                       APPLIED POSITION
//                     </th>
//                     <th className="px-6 py-3 text-left text-md font-medium uppercase  text-blue-950">
//                       CANDIDATE
//                     </th>
//                     <th className="px-6 py-3 text-left text-md font-medium uppercase  text-blue-950">
//                       STATUS
//                     </th>
//                     <th className="px-6 py-3 text-left text-md font-medium uppercase t text-blue-950">
//                       RESUME
//                     </th>
//                     <th className="px-6 py-3 text-left text-md  font-medium uppercase  text-blue-950">
//                       ACTIONS
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 bg-white">
//                   {currentCandidates.length > 0 ? (
//                     currentCandidates.map((candidate) => (
//                       <tr key={candidate.CandidateID} className="hover:bg-gray-50">
//                         <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
//                           {formatDate(candidate.candidate_createddate)}
//                         </td>
//                         <td className="whitespace-nowrap px-6 py-4">
//                           {/* <div className="text-md font-medium text-purple-950">{candidate.candidate_jobtitle}</div> */}
//                           <div className="text-md font-medium text-purple-950">
//   {candidate.candidate_jobtitle?.length > 50
//     ? candidate.candidate_jobtitle.slice(0, 50) + "..."
//     : candidate.candidate_jobtitle}
// </div>

//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="whitespace-nowrap">
//                             {/* <div className="text-sm font-medium text-gray-900">{candidate.candidate_name}</div> */}
//                             <div className="text-sm font-medium text-gray-900">
//   {candidate.candidate_name?.length > 30
//     ? candidate.candidate_name.slice(0, 30) + "..."
//     : candidate.candidate_name}
// </div>

//                             <div className="text-sm text-gray-500"></div>
//                           </div>
//                         </td>
//                         <td className="whitespace-nowrap px-6 py-4">
//                           <span
//                             className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusBadgeClasses(
//                               candidate.candidate_status || "Selected",
//                             )}`}
//                           >
//                             {candidate.candidate_status || "Selected"}
//                           </span>
//                         </td>
//                         <td className="whitespace-nowrap px-6 py-4">
//                           <div className="flex gap-4">
//                             <button className="text-sm font-medium cursor-pointer text-green-600 ">
//                               Download
//                             </button>
//                             <button className="text-sm font-medium cursor-pointer text-black">View</button>
//                           </div>
//                         </td>
//                         <td className="whitespace-nowrap px-6 py-4">
//                           <div className="flex gap-3">
//                             <button className="rounded-xl border border-gray-300 cursor-pointer px-4 py-2 text-sm font-medium tracking-wide text-gray-700 hover:bg-gray-50">
//                               ARCHIVE
//                             </button>
//                             <button className="rounded-xl bg-gradient-to-l from-purple-500 to-purple-600 cursor-pointer  px-4 py-2 text-sm font-medium tracking-wide text-white ">
//                               CHANGE STATUS
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
//                         No candidates found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             <div className="mt-6 flex items-center justify-between pt-4">
//               <div className="text-sm text-gray-600">
//                 Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredCount)} –{" "}
//                 {Math.min(currentPage * itemsPerPage, filteredCount)} of {filteredCount} candidates
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handlePreviousPage}
//                   disabled={currentPage === 1}
//                   className="rounded-xl border border-gray-300 cursor-pointer px-4 py-2  text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={handleNextPage}
//                   disabled={currentPage === totalPages || filteredCount === 0}
//                   className=" bg-purple-600 px-4 py-2 text-sm font-medium cursor-pointer rounded-xl text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import { useEffect, useState } from "react"
import CandidateFilters from "./CandidateFilters"
import DownloadButton from "./DownloadButton"
import ViewResumeModal from "./ViewResumeModal"
import ArchiveButton from "./ArchiveButton"
import ChangeStatusModal from "./ChangeStatusModal"
import CandidateTable from "./CandidateTable"


const TAB_STATUS_MAP = {
  "All candidates": null,
  New: "new",
  Selected: "selected",
  "On hold": "onhold",
  Rejected: "rejected",
}

export default function CandidateFilter() {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    jobTitle: "",
    candidateName: "",
    status: "Any status",
    receivedDate: "",
  })
  const [activeTab, setActiveTab] = useState("All candidates")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [modalOpen, setModalOpen] =useState(false);
const [resumeUrl, setResumeUrl] =useState("");
const [statusModalOpen, setStatusModalOpen] = useState(false);
const [selectedCandidate, setSelectedCandidate] = useState(null);
const [showCompact, setShowCompact] = useState(false);
const handleOpenStatusModal = (candidate) => {
  setSelectedCandidate(candidate);
  setStatusModalOpen(true);
};


  // Fetch candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")
        const userdata = JSON.parse(localStorage.getItem("userData") || "{}")
        const employerId = userdata?.id

        if (!token || !employerId) {
          setError("Authentication required")
          return
        }

        const response = await fetch(`https://app.blogpal.ai/ipartnerStaffingV1/candidates/${employerId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        })

        const raw = await response.text()
        if (!response.ok) throw new Error(`Failed: ${response.status} ${raw}`)
        if (!raw) throw new Error("API returned empty response")

        const data = JSON.parse(raw)
        const candidateData = (data.Candidate || []).map(c => ({
          ...c,
          candidate_status: (c.candidate_status || "").trim().toLowerCase(),
        }))
        setCandidates(candidateData)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCandidates()
  }, [])

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
    setCurrentPage(1)
  }

  const handleApplyFilters = () => setCurrentPage(1)
  const handleResetFilters = () => {
    setFilters({ jobTitle: "", candidateName: "", status: "Any status", receivedDate: "" })
    setCurrentPage(1)
  }

  const formatDate = dateString => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })
  }

  const getFilteredCandidates = () => {
    let filtered = candidates

    // Filter by tab
    const statusFilter = TAB_STATUS_MAP[activeTab]
    if (statusFilter) filtered = filtered.filter(c => c.candidate_status === statusFilter)

    // Filter by jobTitle
    if (filters.jobTitle) {
      filtered = filtered.filter(c =>
        c.candidate_jobtitle?.toLowerCase().includes(filters.jobTitle.toLowerCase())
      )
    }

    // Filter by candidateName
    if (filters.candidateName) {
      filtered = filtered.filter(c =>
        c.candidate_name?.toLowerCase().includes(filters.candidateName.toLowerCase())
      )
    }

    // Filter by status dropdown
    if (filters.status && filters.status !== "Any status") {
      filtered = filtered.filter(c => c.candidate_status === filters.status.toLowerCase())
    }

    // Filter by receivedDate
 if (filters.receivedDate) {
  filtered = filtered.filter(c => {
    if (!c.candidate_createddate) return false;

    // Convert backend date to yyyy-mm-dd
    const dbDate = new Date(c.candidate_createddate).toISOString().split("T")[0];

    return dbDate === filters.receivedDate;
  });
}



    return filtered
  }

  const getTabCounts = () => {
    return Object.entries(TAB_STATUS_MAP).reduce((acc, [tab, status]) => {
      acc[tab] = status ? candidates.filter(c => c.candidate_status === status).length : candidates.length
      return acc
    }, {})
  }

  const getPaginatedCandidates = () => {
    const filtered = getFilteredCandidates()
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filtered.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(getFilteredCandidates().length / itemsPerPage)
  const currentCandidates = getPaginatedCandidates()
  const tabCounts = getTabCounts()
  const filteredCount = getFilteredCandidates().length

  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(p => p - 1)
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(p => p + 1)

  const statusBadgeClasses = status => {
    switch ((status || "").toLowerCase()) {
      case "new":
        return "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-200"
      case "selected":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
      case "on hold":
        return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200"
      case "rejected":
        return "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200"
      case "archived":
        return "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200"
      default:
        return "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200"
    }
  }

  const handleViewResume = (resumeId) => {
  setResumeUrl(`https://app.blogpal.ai/ipartnerStaffingV1/pdf/${resumeId}`);
  setModalOpen(true);
};

const handleStatusUpdated = (candidateId, newStatus) => {
  setCandidates((prev) =>
    prev.map((c) =>
      c.CandidateID === candidateId ? { ...c, candidate_status: newStatus } : c
    )
  );
};
const handleArchived = (candidateId) => {
  setCandidates(prev =>
    prev.map(c =>
      c.CandidateID === candidateId ? { ...c, candidate_status: "archived" } : c
    )
  );
};
  if (error)
    return (
      <div className="min-h-screen bg-white p-8 text-center text-red-500">
        Error: {error}
      </div>
    )

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <h1 className="mb-2 text-2xl ml-2.5 font-semibold text-purple-900">All candidates</h1>
      <p className="mb-2 text-lg ml-2.5  text-black">
You can explore all candidates details here</p>

      <CandidateFilters
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleApplyFilters={handleApplyFilters}
        handleResetFilters={handleResetFilters}
      />

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.entries(tabCounts).map(([tab, count]) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setCurrentPage(1) }}
            className={`whitespace-nowrap cursor-pointer rounded-full border px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "border-purple-600 bg-purple-100 text-purple-700"
                : "border-gray-300 text-gray-900 hover:bg-gray-50"
            }`}
          >
            {tab}
            <span className="ml-2 inline-flex items-center justify-center rounded-full bg-white px-2 py-0.5 text-xs text-gray-900">{count}</span>
          </button>
        ))}
      </div>


 <CandidateTable
        candidates={currentCandidates}
        loading={loading}
        // currentPage={currentPage}
        // itemsPerPage={itemsPerPage}
        // totalCandidates={filteredCount}
        // onPreviousPage={handlePreviousPage}
        // onNextPage={handleNextPage}
        onViewResume={handleViewResume}
        onArchived={handleArchived}
        onOpenStatusModal={handleOpenStatusModal}
        statusBadgeClasses={statusBadgeClasses}
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
     
{/* <ChangeStatusModal
  isOpen={statusModalOpen}
  onClose={() => setStatusModalOpen(false)}
  candidate={selectedCandidate}
  onUpdateStatus={handleStatusUpdated}
/> */}
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


    </div>
    
  )
}
