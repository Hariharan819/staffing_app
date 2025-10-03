// // src/components/jobs/JobFilters.jsx
// import React from "react";

// const JobFilters = () => {
//   return (
//     <section className="shadow-md rounded-3xl bg-white p-6 sm:p-8">
//       <div className="flex flex-col gap-6">
//         <div className="rounded-2xl bg-gray-50 p-4 sm:p-6">
//           <form className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4" noValidate>
//             <label className="flex flex-col gap-2">
//               <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-900">Search a job</span>
//               <input
//                 type="search"
//                 placeholder="e.g. Principal Product Designer"
//                 className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
//               />
//             </label>
//             <label className="flex flex-col gap-2">
//               <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-900">Recruiter email</span>
//               <input
//                 type="email"
//                 placeholder="name@company.com"
//                 className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
//               />
//             </label>
//             <label className="flex flex-col gap-2">
//               <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-900">Posted between</span>
//               <input
//                 type="date"
//                 className="w-full rounded-xl border border-purple-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
//               />
//             </label>
//             <div className="flex items-end">
//               <button
//                 type="reset"
//                 className="w-full rounded-xl border border-purple-600 bg-white px-4 py-3 text-sm font-semibold text-purple-600 transition hover:bg-purple-50"
//               >
//                 Reset filters
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );

// };

// export default JobFilters;


import React, { useState, useEffect } from "react";

const JobFilters = ({ setJobs, fetchDefaultJobs }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [emailQuery, setEmailQuery] = useState("");
  const [postedDate, setPostedDate] = useState("");

  const token = localStorage.getItem("token");

  // Debounce helper
  let debounceTimeout;
  const debounce = (func, delay) => {
    return (...args) => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => func(...args), delay);
    };
  };

  // Search with AND logic
  const searchJobs = async () => {
    try {
      const filters = [];
      if (searchQuery.trim()) filters.push({ field: "name", query: searchQuery });
      if (emailQuery.trim()) filters.push({ field: "email", query: emailQuery });
      if (postedDate) filters.push({ field: "posteddate", query: postedDate });

      // No filters = reload default jobs
      if (filters.length === 0) {
        fetchDefaultJobs(); // reload LiveJobs
        return;
      }

      // Sequentially filter jobs for AND logic
      let filteredJobs = [];
      for (let i = 0; i < filters.length; i++) {
        const res = await fetch(`https://app.blogpal.ai/ipartnerStaffingV1/jobs/s`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(filters[i]),
        });
         let data;
    try {
      data = await res.json();
    } catch {
      data = [];
    }
        // const data = await res.json();
        const jobsArray = Array.isArray(data) ? data : [data];

        if (i === 0) filteredJobs = jobsArray;
        else {
          // AND logic: keep only jobs that exist in previous filteredJobs
          const ids = new Set(filteredJobs.map(job => job.Jobseconduid));
          filteredJobs = jobsArray.filter(job => ids.has(job.Jobseconduid));
        }
      }

      setJobs(filteredJobs);
    } catch (err) {
      console.error(err);
    }
  };

  const debouncedSearch = debounce(searchJobs, 300);

  useEffect(() => {
    debouncedSearch();
  }, [searchQuery, emailQuery, postedDate]);

  const handleReset = () => {
    setSearchQuery("");
    setEmailQuery("");
    setPostedDate("");
    fetchDefaultJobs(); // reload live jobs
  };

  return (
    <section className="shadow-md rounded-2xl bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl bg-purple-50 p-4 sm:p-6">
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4" noValidate>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold uppercase ml-2  text-purple-900">Search a job</span>
              <input
                type="search"
                placeholder="Ex : Principal Product Designer"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-600 focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
              />
              {/* <span className="text-sm ml-2">Enter the search string</span> */}
            </label>
            
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold uppercase ml-2 text-purple-900">Recruiter email</span>
              <input
                type="email"
                placeholder="name@company.com"
                value={emailQuery}
                onChange={(e) => setEmailQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-600 focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold uppercase ml-2 text-purple-900">Posted between</span>
              <input
                type="date"
                value={postedDate}
                onChange={(e) => setPostedDate(e.target.value)}
                className="w-full rounded-xl border border-purple-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition  focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
              />
            </label>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleReset}
                className="w-full rounded-xl border cursor-pointer border-purple-600 bg-white px-4 py-3 text-sm font-semibold text-purple-600 transition hover:bg-purple-50"
              >
                Reset filters
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JobFilters;

