// import React, { useState, useRef, useEffect } from "react";
// import {
//   User,
//   RefreshCw,
//   Linkedin,
//   Award,
//   Download,
// } from "lucide-react";

// const UserProfile = () => {
//   const [workAuth, setWorkAuth] = useState("Work Permit");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef();

//   const handleOptionSelect = (option) => {
//     setWorkAuth(option);
//     setDropdownOpen(false);
//   };

  
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target)
//       ) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Left Sidebar */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="text-center mb-6">
//               {/* <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
//                 MA
//               </div> */}
//                  <p className="text-xl font-semibold text-purple-900 ">Maxwell Admin</p>
//               <h2 className="text-sm font-semibold mt-2 text-gray-900">Pinky</h2>
           
//             </div>

//             <div className="space-y-3">
//               <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
//                 <Linkedin className="w-4 h-4" />
//                 LinkedIn Profile
//               </button>
//               <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
//                 <Award className="w-4 h-4" />
//                 Other Certifications
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
//             {/* Personal Details */}
//             <div className="mb-8">
//               <h3 className="text-2xl font-semibold text-purple-800 mb-6 flex items-center gap-2">
//                 <User className="w-6 h-6" />
//                 Personal Details
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-900 mb-2">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     value="Pinky"
//                     className="w-full px-4 py-3 border-2  rounded-lg focus:ring-2 focus:ring-purple-500   focus:border-transparent border-purple-600 transition-all duration-200"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-900 mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     value="pinkythakannn@gmail.com"
//                     className="w-full px-4 py-3 border-2 border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500  focus:border-transparent transition-all duration-200"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-900 mb-2">
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     value="4379333582"
//                     className="w-full px-4 py-3 border-2 border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500  focus:border-transparent transition-all duration-200"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-900 mb-2">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     value="522 Outram St, Lucknow, ON N0G 2H0, Canada"
//                     className="w-full px-4 py-3 border-2 border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500  focus:border-transparent transition-all duration-200"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Professional Details */}
//             <div className="mb-8">
//               <h3 className="text-2xl font-semibold text-purple-800 mb-6 flex items-center gap-2">
//                 <RefreshCw className="w-6 h-6" />
//                 Professional Details
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-900 mb-2">
//                     Experience (Years)
//                   </label>
//                   <input
//                     type="text"
//                     value="1-3 years"
//                     className="w-full px-4 py-3 border-2 border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500  focus:border-transparent transition-all duration-200"
//                   />
//                 </div>
//                 <div ref={dropdownRef}>
//                   <label className="block text-sm font-medium text-gray-900 mb-2">
//                     Work Authorization
//                   </label>
//                   <div className="relative">
//                     <button
//                       onClick={() => setDropdownOpen(!dropdownOpen)}
//                       className="w-full px-4 py-3 border-2 border-purple-600  cursor-pointer rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white text-left flex items-center justify-between"
//                     >
//                       <span>{workAuth}</span>
//                       <svg
//                         className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
//                           dropdownOpen ? "rotate-180" : ""
//                         }`}
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M19 9l-7 7-7-7"
//                         ></path>
//                       </svg>
//                     </button>
//                     {dropdownOpen && (
//                       <div className="absolute top-full left-0 right-0 mt-1  bg-white border border-gray-300 rounded-lg shadow-lg z-10">
//                         {[
//                           "Work Permit",
//                           "Permanent Resident (PR)",
//                           "Citizen",
//                         ].map((option) => (
//                           <button
//                             key={option}
//                             onClick={() => handleOptionSelect(option)}
//                             className="w-full px-4 py-3 text-left hover:bg-purple-50 hover:text-purple-700 cursor-pointer transition-colors duration-200"
//                           >
//                             {option}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Resume & Applied Jobs */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               <div>
//                 <label className="block text-sm font-medium text-gray-900 mb-2">
//                   Resume
//                 </label>
//                 <button className="inline-flex items-center gap-2 text-purple-800 cursor-pointer font-medium transition-colors duration-200">
//                   <Download className="w-4 h-4" />
//                   Download
//                 </button>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Applied Jobs
//                 </label>
//                 <div className="text-4xl font-bold text-gray-900">2</div>
//               </div>
//             </div>

//             {/* Update Button */}
//             <div className="flex justify-start">
//               <button className="bg-gradient-to-bl  from-purple-500 to-purple-600 cursor-pointer text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2">
//                 <RefreshCw className="w-4 h-4" />
//                 Update Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useRef, useEffect } from "react";
import { User, RefreshCw, Linkedin, Award, Download } from "lucide-react";
import toast from 'react-hot-toast';
import DownloadButton from "../candidates/DownloadButton";

const UserProfile = ({ candidate, isOpen, onClose, onUpdate,readOnly = false }) => {
  const [candidateData, setCandidateData] = useState({
    candidate_name: candidate?.candidate_name || "",
    candidate_email: candidate?.candidate_email || "",
    candidate_phonenumber: candidate?.candidate_phonenumber || "",
    candidate_address: candidate?.candidate_address || "",
    candidate_exp: candidate?.candidate_exp || "",
    candidateWorkAuthorization: candidate?.candidateWorkAuthorization || "Work Permit",
  });
const [loading, setLoading] = useState(false);
const [appliedJobsCount, setAppliedJobsCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();


  useEffect(() => {
    setCandidateData({
      candidate_name: candidate?.candidate_name || "",
      candidate_email: candidate?.candidate_email || "",
      candidate_phonenumber: candidate?.candidate_phonenumber || "",
      candidate_address: candidate?.candidate_address || "",
      candidate_exp: candidate?.candidate_exp || "",
      candidateWorkAuthorization: candidate?.candidateWorkAuthorization || "Work Permit",
    });
  
  }, [candidate]);
  

  const handleOptionSelect = (option) => {
    setCandidateData(prev => ({ ...prev, candidateWorkAuthorization: option }));
    setDropdownOpen(false);
  };

  const handleInputChange = (field, value) => {
    setCandidateData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

 const handleUpdateProfile = async () => {
  try {
     setLoading(true);
    const token = localStorage.getItem("token"); // get token from localStorage
    const response = await fetch(
      `https://app.blogpal.ai/ipartnerStaffingV1/candidate/${candidate?.CandidateID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // include token
        },
        body: JSON.stringify(candidateData),
      }
    );

    if (!response.ok) throw new Error("Update failed");

    const updatedCandidate = await response.json();

    toast.success("Candidate updated successfully!");

    onUpdate?.(updatedCandidate);
    onClose?.();
  } catch (error) {
    toast.error("Failed to update candidate. Try again!");
    console.error("Error updating candidate:", error);
  }finally {
    setLoading(false); // stop loading
  }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="bg-gray-50 w-full max-w-7xl p-6 rounded-xl relative">
        <button
          onClick={onClose}
          className="absolute top-8 cursor-pointer right-8 text-gray-700 font-bold"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 self-start bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center mb-6">
              <p className="text-xl font-semibold text-purple-900">
                {candidateData.candidate_name || "No Name"}
              </p>
              <h2 className="text-sm font-semibold mt-2 text-gray-900">
                {candidateData.candidate_email || "No Email"}
              </h2>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn Profile
              </button>
              <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                <Award className="w-4 h-4" />
                Other Certifications
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            {/* Personal Details */}
            <h3 className="text-2xl font-semibold text-purple-800 mb-6 flex items-center gap-2">
              <User className="w-6 h-6" />
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  disabled={readOnly}
                  value={candidateData.candidate_name}
                  onChange={(e) => handleInputChange("candidate_name", e.target.value)}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent border-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  disabled={readOnly}
                  value={candidateData.candidate_email}
                  onChange={(e) => handleInputChange("candidate_email", e.target.value)}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent border-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={candidateData.candidate_phonenumber}
                  disabled={readOnly}
                  onChange={(e) => handleInputChange("candidate_phonenumber", e.target.value)}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent border-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={candidateData.candidate_address}
                  disabled={readOnly}
                  onChange={(e) => handleInputChange("candidate_address", e.target.value)}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent border-purple-600"
                />
              </div>
            </div>

            {/* Professional Details */}
            <h3 className="text-2xl font-semibold text-purple-800 mb-6 flex items-center gap-2">
              <RefreshCw className="w-6 h-6" />
              Professional Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Experience (Years)
                </label>
                <input
                  type="text"
                  disabled={readOnly}
                  value={candidateData.candidate_exp}
                  onChange={(e) => handleInputChange("candidate_exp", e.target.value)}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent border-purple-600"
                />
              </div>
              <div ref={dropdownRef}>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Work Authorization
                </label>
                <div className="relative">
                  {/* <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full px-4 py-3 border-2 border-purple-600 cursor-pointer rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white flex items-center justify-between"
                  >
                    <span>{candidateData.candidateWorkAuthorization}</span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button> */}
                  <button
  onClick={() => !readOnly && setDropdownOpen(!dropdownOpen)}
  className="w-full px-4 py-3 border-2 border-purple-600 cursor-pointer rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white flex items-center justify-between"
>
  <span>{candidateData.candidateWorkAuthorization}</span>
  {!readOnly && (
    <svg
      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  )}
</button>

                  {dropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {["Work Permit", "Permanent Resident (PR)", "Citizen"].map(option => (
                        <button
                          key={option}
                          onClick={() => handleOptionSelect(option)}
                          className="w-full px-4 py-3 text-left hover:bg-purple-50 hover:text-purple-700 cursor-pointer"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Resume & Applied Jobs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Resume
                </label>
                {/* <button className="inline-flex items-center gap-2 text-purple-800 cursor-pointer font-medium">
                  <Download className="w-4 h-4" />
                  Download
                </button> */}
                <DownloadButton resumeId={candidate?.candidate_resumeid} candidateName={candidate?.candidate_name} />

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applied Jobs
                </label>
                <div className="text-4xl font-bold text-gray-900">
                  2
                </div>
                
              </div>
   

            </div>

            <div className="flex justify-start">
             {!readOnly && (
  <button
    onClick={handleUpdateProfile}
    className="bg-gradient-to-bl from-purple-500 to-purple-600 cursor-pointer text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2"
    disabled={loading}
  >
    <RefreshCw className="w-4 h-4" />
    {loading ? "Updating..." : "Update Profile"}
  </button>
)}

              {/* <button
  onClick={handleUpdateProfile}
  className="bg-gradient-to-bl from-purple-500 to-purple-600 cursor-pointer text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2"
  disabled={loading} // optional, prevents multiple clicks
>
  <RefreshCw className="w-4 h-4" />
  {loading ? "Updating..." : "Update Profile"}
</button> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
