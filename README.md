# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




 {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        {loading ? (
            <div className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-8xl">
            {/* Table Skeleton */}
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

        ) : currentCandidates.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {["DATE", "APPLIED POSITION", "CANDIDATE", "STATUS", "RESUME", "ACTIONS"].map(col => (
                  <th key={col} className="px-6 py-3 text-left text-md font-medium uppercase text-blue-950">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {currentCandidates.map(c => (
                <tr key={c.CandidateID} className="hover:bg-gray-50 whitespace-nowrap">
                  {/* <td className="px-6 py-4 text-sm ">{formatDate(c.candidate_createddate)}</td> */}
                  <td className="px-6 py-4 text-sm font-medium text-purple-950">
  {c.candidate_createddate ? (() => {
    const d = new Date(c.candidate_createddate);
    const datePart = d.getUTCDate().toString().padStart(2, '0') + ' ' + 
                     d.toLocaleString('en-GB', { month: 'short', timeZone: 'UTC' }) + ' ' + 
                     d.getUTCFullYear();
    const timePart = d.getUTCHours().toString().padStart(2,'0') + ':' + 
                     d.getUTCMinutes().toString().padStart(2,'0') + ':' + 
                     d.getUTCSeconds().toString().padStart(2,'0') + ' GMT';
    return <>{datePart}<br />{timePart}</>;
  })() : "-"}
</td>

                  <td className="px-6 py-4 text-sm font-medium  text-purple-950">{c.candidate_jobtitle || "-"}</td>
                  {/* <td className="px-6 py-4 text-sm  font-medium text-gray-900">{c.candidate_name || "-"}</td> */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
  {c.candidate_name ? (c.candidate_name.length > 25 ? c.candidate_name.slice(0, 25) + "…" : c.candidate_name) : "-"}
</td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full  px-2.5 py-1 text-xs font-medium ${statusBadgeClasses(c.candidate_status)}`}>
                      {c.candidate_status || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-4">
                      {/* <button className="text-sm font-medium cursor-pointer text-green-600">Download</button> */}
                      <DownloadButton resumeId={c.candidate_resumeid} candidateName={c.candidate_name} />
                      {/* <button className="text-sm font-medium cursor-pointer text-black">View</button> */}
                      <button
  className="text-sm font-medium cursor-pointer text-black"
  onClick={() => handleViewResume(c.candidate_resumeid)}
>
  View
</button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      {/* <button className="rounded-xl border border-gray-300 cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Archive</button> */}
                      <ArchiveButton
                      className="text-sm"
  candidateId={c.CandidateID}
  disabled={c.candidate_status === "archived"} // disable if already archived
  onArchived={handleArchived}
/>

                      {/* <button className="rounded-xl bg-gradient-to-l cursor-pointer from-purple-500 to-purple-600 px-4 py-2 text-sm font-medium text-white">Change Status</button> */}
                      <button
  onClick={() => handleOpenStatusModal(c)}
  className="rounded-xl bg-gradient-to-l  from-purple-500 to-purple-600 cursor-pointer px-4 py-2 text-sm font-medium tracking-wide text-white"
>
  CHANGE STATUS
</button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-gray-500">No candidates found</div>
        )}
      </div>

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