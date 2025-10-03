// import React from "react";
import DownloadButton from "./DownloadButton";
import ArchiveButton from "./ArchiveButton";
import ChangeStatusModal from "./ChangeStatusModal";
import ViewResumeModal from "./ViewResumeModal";

// export default function CandidateTable({
//   candidates,
//   loading,
// //   currentPage,
// //   itemsPerPage,
// //   totalCandidates,
// //   onPreviousPage,
// //   onNextPage,
//   onViewResume,
//   onArchived,
//   onOpenStatusModal,
//   statusBadgeClasses,
// }) {
//   const paginatedCandidates = candidates;

//   return (
//     <div className="overflow-x-auto rounded-lg border border-gray-200">
//       {loading ? (
//         <div className="min-h-screen bg-white p-8">
//           <div className="mx-auto max-w-8xl">
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
//                   {Array.from({ length: 10 }).map((_, i) => (
//                     <tr key={i}>
//                       {Array.from({ length: 10 }).map((_, j) => (
//                         <td key={j} className="px-6 py-4">
//                           <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       ) : paginatedCandidates.length > 0 ? (
//         <table className="w-full">
//           <thead>
//             <tr className="border-b border-gray-200 bg-gray-50">
//               {["DATE", "APPLIED POSITION", "CANDIDATE", "STATUS", "RESUME", "ACTIONS"].map(
//                 (col) => (
//                   <th
//                     key={col}
//                     className="px-6 py-3 text-left text-md font-medium uppercase text-blue-950"
//                   >
//                     {col}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {paginatedCandidates.map((c) => (
//               <tr key={c.CandidateID} className="hover:bg-gray-50 whitespace-nowrap">
//                 <td className="px-6 py-4 text-sm font-medium text-purple-950">
//                   {c.candidate_createddate ? (
//                     (() => {
//                       const d = new Date(c.candidate_createddate);
//                       const datePart =
//                         d.getUTCDate().toString().padStart(2, "0") +
//                         " " +
//                         d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" }) +
//                         " " +
//                         d.getUTCFullYear();
//                       const timePart =
//                         d.getUTCHours().toString().padStart(2, "0") +
//                         ":" +
//                         d.getUTCMinutes().toString().padStart(2, "0") +
//                         ":" +
//                         d.getUTCSeconds().toString().padStart(2, "0") +
//                         " GMT";
//                       return (
//                         <>
//                           {datePart}
//                           <br />
//                           {timePart}
//                         </>
//                       );
//                     })()
//                   ) : (
//                     "-"
//                   )}
//                 </td>
//                 <td className="px-6 py-4 text-sm font-medium text-purple-950">
//                   {c.candidate_jobtitle || "-"}
//                 </td>
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                   {c.candidate_name
//                     ? c.candidate_name.length > 25
//                       ? c.candidate_name.slice(0, 25) + "…"
//                       : c.candidate_name
//                     : "-"}
//                 </td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusBadgeClasses(
//                       c.candidate_status
//                     )}`}
//                   >
//                     {c.candidate_status || "-"}
//                   </span>
//                 </td>  
//                 <td className="px-6 py-4">
//                   <div className="flex gap-4">
//                     <DownloadButton
//                       resumeId={c.candidate_resumeid}
//                       candidateName={c.candidate_name}
//                     />
//                     <button
//                       className="text-sm font-medium cursor-pointer text-black"
//                       onClick={() => onViewResume(c.candidate_resumeid)}
//                     >
//                       View
//                     </button>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex gap-3">
//                     <ArchiveButton
//                       className="text-sm"
//                       candidateId={c.CandidateID}
//                       disabled={c.candidate_status === "archived"}
//                       onArchived={onArchived}
//                     />
//                     <button
//                       onClick={() => onOpenStatusModal(c)}
//                       className="rounded-xl bg-gradient-to-l from-purple-500 to-purple-600 cursor-pointer px-4 py-2 text-sm font-medium tracking-wide text-white"
//                     >
//                       CHANGE STATUS
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="p-8 text-center text-gray-500">No candidates found</div>
//       )}

     
//     </div>
//   );
// }


import { Eye } from "lucide-react"; 
import { useState } from "react";
import RtrModal from "../Selectedcandidates/RtrModal";
import UnarchiveButton from "../ArchivedCandidates/UnarchiveButton";

export default function CandidateTable({
  candidates,
  compactView = false,
  loading,
  onViewResume,
  onArchived,
  onUnarchived,
  onOpenStatusModal,
  statusBadgeClasses, 
  onViewProfile,
  showEyeIcon = false,
  showdownloadrtr=false,
  showContactInfo=false,
 
}) {
  const paginatedCandidates = candidates;
const [rtrModalOpen, setRtrModalOpen] = useState(false);
  const [selectedCandidateForRtr, setSelectedCandidateForRtr] = useState(null);

  const handleOpenRtrModal = (candidate) => {
    setSelectedCandidateForRtr(candidate);
    setRtrModalOpen(true);
  };

  const handleCloseRtrModal = () => {
    setSelectedCandidateForRtr(null);
    setRtrModalOpen(false);
  };
 

  const handleDownloadRtr = async (candidate) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://app.blogpal.ai/ipartnerStaffingV1/rtr/n/${candidate.CandidateID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download RTR");
    }

    // Convert response to Blob for download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `RTR_${candidate.candidate_name}.pdf`; 
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading RTR:", error);
  }
};

  return (
 <div className="overflow-x-auto rounded-lg border border-gray-200">
    {/* {loading ? (
      // ... your skeleton UI stays same
       <div className="min-h-screen bg-white p-8">
          <div className="mx-auto max-w-8xl">
            <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    {["DATE", "APPLIED POSITION", "CANDIDATE", "STATUS", "RESUME", "ACTIONS"].map(
                      (col) => (
                        <th
                          key={col}
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 10 }).map((_, j) => (
                        <td key={j} className="px-6 py-4">
                          <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    ) */}
    {loading ? (
  compactView ? (
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-8xl">
        <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {["Candidate name", "Job title", "Applied date", "Resume", "RTR"].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    //  Default full skeleton
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-8xl">
        <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {["DATE", "APPLIED POSITION", "CANDIDATE", "STATUS", "RESUME", "ACTIONS"].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {Array.from({ length: 10 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 10 }).map((_, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
) : paginatedCandidates.length > 0 ? (
      compactView ? (
      
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {["Candidate name", "Job title", "Applied date", "Resume", "RTR"].map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-md font-medium uppercase text-blue-950"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {candidates.map((c) => (
              <tr key={c.CandidateID} className="hover:bg-gray-50 whitespace-nowrap">
                <td className="px-6 py-6 text-sm font-medium text-gray-900 flex items-center gap-2">
                  {c.candidate_name
                    ? c.candidate_name.length > 25
                      ? c.candidate_name.slice(0, 25) + "…"
                      : c.candidate_name
                    : "-"} {showEyeIcon && (
  <Eye
    className="cursor-pointer text-gray-500 hover:text-gray-700"
    size={18}
  onClick={() => onViewProfile(c)}
    
  />
)}
                  
                </td>
                <td className="px-6 py-4 text-sm font-medium text-purple-950">
                  {c.candidate_jobtitle || "-"}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-purple-950">
                  {c.candidate_createddate
                    ? new Date(c.candidate_createddate).toUTCString()
                    : "-"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <DownloadButton
                      resumeId={c.candidate_resumeid}
                      candidateName={c.candidate_name}
                    />
                    <button
                      className="text-sm font-medium cursor-pointer text-black"
                      onClick={() => onViewResume(c.candidate_resumeid)}
                    >
                      View
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  
                   {/* <button
    className="rounded-xl bg-purple-800 cursor-pointer  text-white px-6 py-2"
    onClick={() => handleOpenRtrModal(c)}
  >
    Send RTR

  </button> */}
  {showdownloadrtr ? (
  <button
    className="rounded-xl bg-green-600 cursor-pointer text-white px-6 py-2"
    onClick={() => handleDownloadRtr(c)}
  >
    Download RTR
  </button>
) : (
  <button
    className="rounded-xl bg-purple-800 cursor-pointer text-white px-6 py-2"
    onClick={() => handleOpenRtrModal(c)}
  >
    Send RTR
  </button>
)}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
//         <table className="w-full">
//           <thead>
//             <tr className="border-b border-gray-200 bg-gray-50">
//               {["DATE", "APPLIED POSITION", "CANDIDATE", "STATUS", "RESUME", "ACTIONS"].map(
//                 (col) => (
//                   <th
//                     key={col}
//                     className="px-6 py-3 text-left text-md font-medium uppercase text-blue-950"
//                   >
//                     {col}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {paginatedCandidates.map((c) => (
//               <tr key={c.CandidateID} className="hover:bg-gray-50 whitespace-nowrap">
//                 <td className="px-6 py-4 text-sm font-medium text-purple-950">
//                   {c.candidate_createddate ? (
//                     (() => {
//                       const d = new Date(c.candidate_createddate);
//                       const datePart =
//                         d.getUTCDate().toString().padStart(2, "0") +
//                         " " +
//                         d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" }) +
//                         " " +
//                         d.getUTCFullYear();
//                       const timePart =
//                         d.getUTCHours().toString().padStart(2, "0") +
//                         ":" +
//                         d.getUTCMinutes().toString().padStart(2, "0") +
//                         ":" +
//                         d.getUTCSeconds().toString().padStart(2, "0") +
//                         " GMT";
//                       return (
//                         <>
//                           {datePart}
//                           <br />
//                           {timePart}
//                         </>
//                       );
//                     })()
//                   ) : (
//                     "-"
//                   )}
//                 </td>
//                 <td className="px-6 py-4 text-sm font-medium text-purple-950">
//                   {c.candidate_jobtitle || "-"}
//                 </td>
//                 <td className="px-6 py-6 text-sm font-medium text-gray-900 flex items-center gap-2">
//                   {c.candidate_name
//                     ? c.candidate_name.length > 25
//                       ? c.candidate_name.slice(0, 25) + "…"
//                       : c.candidate_name
//                     : "-"}
//                   {/* {showEyeIcon && (
//                     <Eye
//                       className="cursor-pointer text-gray-500 hover:text-gray-700"
//                       size={18}
//                       // onClick={}
//                        onClick={() => onUpdateProfile(c)}
                     
//                     />
//                   )} */}
//  {showEyeIcon && (
//   <Eye
//     className="cursor-pointer text-gray-500 hover:text-gray-700"
//     size={18}
//   //
//   onClick={() => onViewProfile(c)}
    
//   />
// )}




//                 </td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusBadgeClasses(
//                       c.candidate_status
//                     )}`}
//                   >
//                     {c.candidate_status || "-"}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex gap-4">
//                     <DownloadButton
//                       resumeId={c.candidate_resumeid}
//                       candidateName={c.candidate_name}
//                     />
//                     <button
//                       className="text-sm font-medium cursor-pointer text-black"
//                       onClick={() => onViewResume(c.candidate_resumeid)}
//                     >
//                       View
//                     </button>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex gap-3">
//                     <ArchiveButton
//                       className="text-sm"
//                       candidateId={c.CandidateID}
//                       disabled={c.candidate_status === "archived"}
//                       onArchived={onArchived}
//                     />
//                     <button
//                       onClick={() => onOpenStatusModal(c)}
//                       className="rounded-xl bg-gradient-to-l from-purple-500 to-purple-600 cursor-pointer px-4 py-2 text-sm font-medium tracking-wide text-white"
//                     >
//                       CHANGE STATUS
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
          
//         </table>
        <table className="w-full">
  <thead>
    <tr className="border-b border-gray-200 bg-gray-50">
      {[
        "DATE",
        "APPLIED POSITION",
        "CANDIDATE",
        ...(showContactInfo ? ["EMAIL", "PHONE"] : []), // 👈 add columns conditionally
        "STATUS",
        "RESUME",
        ...(showContactInfo ? [] : ["ACTIONS"]), // 👈 hide Actions column if true
      ].map((col) => (
        <th
          key={col}
          className="px-6 py-3 text-left text-md font-medium uppercase text-blue-950"
        >
          {col}
        </th>
      ))}
    </tr>
  </thead>

  <tbody className="divide-y divide-gray-200 bg-white">
    {paginatedCandidates.map((c) => (
      <tr key={c.CandidateID} className="hover:bg-gray-50 whitespace-nowrap">
        {/* DATE */}
        <td className="px-6 py-4 text-sm font-medium text-purple-950">
          {c.candidate_createddate ? (
            (() => {
              const d = new Date(c.candidate_createddate);
              const datePart =
                d.getUTCDate().toString().padStart(2, "0") +
                " " +
                d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" }) +
                " " +
                d.getUTCFullYear();
              const timePart =
                d.getUTCHours().toString().padStart(2, "0") +
                ":" +
                d.getUTCMinutes().toString().padStart(2, "0") +
                ":" +
                d.getUTCSeconds().toString().padStart(2, "0") +
                " GMT";
              return (
                <>
                  {datePart}
                  <br />
                  {timePart}
                </>
              );
            })()
          ) : (
            "-"
          )}
        </td>

        {/* JOB TITLE */}
        <td className="px-6 py-4 text-sm font-medium text-purple-950">
          {c.candidate_jobtitle || "-"}
        </td>

        {/* CANDIDATE NAME */}
        <td className="px-6 py-6 text-sm font-medium text-gray-900 flex items-center gap-2">
          {c.candidate_name
            ? c.candidate_name.length > 25
              ? c.candidate_name.slice(0, 25) + "…"
              : c.candidate_name
            : "-"}
          {showEyeIcon && (
            <Eye
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              size={18}
              onClick={() => onViewProfile(c)}
            />
          )}
        </td>

        {/* EMAIL & PHONE (only if showContactInfo true) */}
        {showContactInfo && (
          <>
            <td className="px-6 py-4 text-sm text-gray-700">
              {c.candidate_email || "-"}
            </td>
            <td className="px-6 py-4 text-sm text-gray-700">
              {c.candidate_phonenumber || "-"}
            </td>
          </>
        )}

        {/* STATUS */}
        <td className="px-6 py-4">
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusBadgeClasses(
              c.candidate_status
            )}`}
          >
            {c.candidate_status || "-"}
          </span>
        </td>

        {/* RESUME */}
        <td className="px-6 py-4">
          <div className="flex gap-4">
            <DownloadButton
              resumeId={c.candidate_resumeid}
              candidateName={c.candidate_name}
            />
            <button
              className="text-sm font-medium cursor-pointer text-black"
              onClick={() => onViewResume(c.candidate_resumeid)}
            >
              View
            </button>
          </div>
        </td>

      <td className="px-6 py-4">
  <div className="flex gap-3">
    {showContactInfo ? (
      // show only Unarchive button when compact view
      <UnarchiveButton
        candidateId={c.CandidateID}
       onUnarchived={onUnarchived}
        disabled={c.candidate_status !== "archived"} // only enabled if archived
      />
    ) : (
      <>
        {/* Archive button for non-archived candidates */}
        <ArchiveButton
          candidateId={c.CandidateID}
          disabled={c.candidate_status === "archived"}
          onArchived={onArchived}
        />

        {/* Change Status button */}
        <button
          onClick={() => onOpenStatusModal(c)}
          className="rounded-xl bg-gradient-to-l from-purple-500 to-purple-600 cursor-pointer px-4 py-2 text-sm font-medium tracking-wide text-white"
        >
          CHANGE STATUS
        </button>
      </>
    )}
  </div>
</td>



      </tr>
    ))}
  </tbody>
</table>

      )
    ) : (
      <div className="p-8 text-center text-gray-500">No candidates found</div>
    )}
   <RtrModal
  isOpen={rtrModalOpen}
  onClose={handleCloseRtrModal}
  candidate={selectedCandidateForRtr}
/>

  </div>
  );
}











//  <div className="overflow-x-auto rounded-lg border border-gray-200">
//       {loading ? (
//         // ... your skeleton code remains the same
        // <div className="min-h-screen bg-white p-8">
        //   <div className="mx-auto max-w-8xl">
        //     <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
        //       <table className="w-full">
        //         <thead>
        //           <tr className="border-b border-gray-200 bg-gray-50">
        //             {["DATE", "APPLIED POSITION", "CANDIDATE", "STATUS", "RESUME", "ACTIONS"].map(
        //               (col) => (
        //                 <th
        //                   key={col}
        //                   className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
        //                 >
        //                   {col}
        //                 </th>
        //               )
        //             )}
        //           </tr>
        //         </thead>
        //         <tbody className="divide-y divide-gray-200 bg-white">
        //           {Array.from({ length: 10 }).map((_, i) => (
        //             <tr key={i}>
        //               {Array.from({ length: 10 }).map((_, j) => (
        //                 <td key={j} className="px-6 py-4">
        //                   <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
        //                 </td>
        //               ))}
        //             </tr>
        //           ))}
        //         </tbody>
        //       </table>
        //     </div>
        //   </div>
        // </div>
//       ) : paginatedCandidates.length > 0 ? (
//         <table className="w-full">
//           <thead>
//             <tr className="border-b border-gray-200 bg-gray-50">
//               {["DATE", "APPLIED POSITION", "CANDIDATE", "STATUS", "RESUME", "ACTIONS"].map(
//                 (col) => (
//                   <th
//                     key={col}
//                     className="px-6 py-3 text-left text-md font-medium uppercase text-blue-950"
//                   >
//                     {col}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {paginatedCandidates.map((c) => (
//               <tr key={c.CandidateID} className="hover:bg-gray-50 whitespace-nowrap">
//                 <td className="px-6 py-4 text-sm font-medium text-purple-950">
//                   {c.candidate_createddate ? (
//                     (() => {
//                       const d = new Date(c.candidate_createddate);
//                       const datePart =
//                         d.getUTCDate().toString().padStart(2, "0") +
//                         " " +
//                         d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" }) +
//                         " " +
//                         d.getUTCFullYear();
//                       const timePart =
//                         d.getUTCHours().toString().padStart(2, "0") +
//                         ":" +
//                         d.getUTCMinutes().toString().padStart(2, "0") +
//                         ":" +
//                         d.getUTCSeconds().toString().padStart(2, "0") +
//                         " GMT";
//                       return (
//                         <>
//                           {datePart}
//                           <br />
//                           {timePart}
//                         </>
//                       );
//                     })()
//                   ) : (
//                     "-"
//                   )}
//                 </td>
//                 <td className="px-6 py-4 text-sm font-medium text-purple-950">
//                   {c.candidate_jobtitle || "-"}
//                 </td>
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-2">
//                   {c.candidate_name
//                     ? c.candidate_name.length > 25
//                       ? c.candidate_name.slice(0, 25) + "…"
//                       : c.candidate_name
//                     : "-"}
//                   {/* {showEyeIcon && (
//                     <Eye
//                       className="cursor-pointer text-gray-500 hover:text-gray-700"
//                       size={18}
//                       // onClick={}
//                        onClick={() => onUpdateProfile(c)}
                     
//                     />
//                   )} */}
//  {showEyeIcon && (
//   <Eye
//     className="cursor-pointer text-gray-500 hover:text-gray-700"
//     size={18}
//   //
//   onClick={() => onViewProfile(c)}
    
//   />
// )}




//                 </td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusBadgeClasses(
//                       c.candidate_status
//                     )}`}
//                   >
//                     {c.candidate_status || "-"}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex gap-4">
//                     <DownloadButton
//                       resumeId={c.candidate_resumeid}
//                       candidateName={c.candidate_name}
//                     />
//                     <button
//                       className="text-sm font-medium cursor-pointer text-black"
//                       onClick={() => onViewResume(c.candidate_resumeid)}
//                     >
//                       View
//                     </button>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex gap-3">
//                     <ArchiveButton
//                       className="text-sm"
//                       candidateId={c.CandidateID}
//                       disabled={c.candidate_status === "archived"}
//                       onArchived={onArchived}
//                     />
//                     <button
//                       onClick={() => onOpenStatusModal(c)}
//                       className="rounded-xl bg-gradient-to-l from-purple-500 to-purple-600 cursor-pointer px-4 py-2 text-sm font-medium tracking-wide text-white"
//                     >
//                       CHANGE STATUS
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="p-8 text-center text-gray-500">No candidates found</div>
//       )}
//     </div>

 {/* Pagination */}
      {/* <div className="mt-6 flex items-center justify-between pt-4">
        <div className="text-sm text-gray-600">
          Showing{" "}
          {totalCandidates === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} –{" "}
          {Math.min(currentPage * itemsPerPage, totalCandidates)} of {totalCandidates} candidates
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPreviousPage}
            disabled={currentPage === 1}
            className="rounded-xl border border-gray-300 cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={onNextPage}
            disabled={currentPage * itemsPerPage >= totalCandidates}
            className="bg-purple-600 px-4 py-2 text-sm font-medium cursor-pointer rounded-xl text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div> */}