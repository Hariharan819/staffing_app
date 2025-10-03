
// import React, { useState } from "react";
// import BasicInfoSection from "../EditJob/BasicInfoSection";
// import JobDetailsSection from "../EditJob/JobDetailsSection";
// import LocationSection from "../EditJob/LocationSection";
// import CompensationSection from "../EditJob/CompensationSection";
// import DescriptionSection from "../EditJob/DescriptionSection"; 
// import PublicationSection from "../EditJob/PublicationSection";
// import { Loader2, Eye, FileText } from "lucide-react";
// export default function AddJob({ job, onClose }) {
//  const [formData, setFormData] = useState({/* same as before */});
//   const [errors, setErrors] = useState({});
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => { setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); };

//   const handleSubmit = (e, action) => { e.preventDefault(); /* your submit logic */ };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
//       <div className="text-center space-y-4">
//           <div className="flex items-center justify-center space-x-3">
//             {/* <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg">
//               <Briefcase className="h-8 w-8 text-white" />
//             </div> */}
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//               Post a New Job
//             </h1>
//           </div>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Create an engaging job posting to attract the best talent for your organization
//           </p>
//           {/* <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto"></div> */}
//         </div>
//       <BasicInfoSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
//       <JobDetailsSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
//       <LocationSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
//       <CompensationSection {...{ formData, errors, handleChange }} />
//       <DescriptionSection {...{ formData, handleChange }} />
//       <PublicationSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
//       {/* Action Button */}
     
// <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-center">
//               <button
//                 type="button"
//                 onClick={(e) => handleSubmit(e, "post")}
//                 disabled={loading}
//                 className="px-8 py-4 bg-purple-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="animate-spin h-5 w-5" />}
//                 <Eye className="h-5 w-5" />
//                 <span>{loading ? "Publishing..." : "Publish Job"}</span>
//               </button>

//               <button
//                 type="button"
//                 onClick={(e) => handleSubmit(e, "draft")}
//                 disabled={loading}
//                 className="px-8 py-4 bg-gray-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="animate-spin h-5 w-5" />}
//                 <FileText className="h-5 w-5" />
//                 <span>{loading ? "Saving..." : "Save as Draft"}</span>
//               </button>
//             </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import BasicInfoSection from "../EditJob/BasicInfoSection";
// import JobDetailsSection from "../EditJob/JobDetailsSection";
// import LocationSection from "../EditJob/LocationSection";
// import CompensationSection from "../EditJob/CompensationSection";
// import DescriptionSection from "../EditJob/DescriptionSection";
// import PublicationSection from "../EditJob/PublicationSection";
// import { Loader2, Eye, FileText } from "lucide-react";
// import toast from "react-hot-toast";

// export default function AddJob() {
//   const navigate = useNavigate();

//   // Get EmployerID dynamically from localStorage
//   const userData = JSON.parse(localStorage.getItem("userData")) || {};
//   const employerId = userData.id || 0;

//   const [formData, setFormData] = useState({
//     EmployerID: employerId,
//     JobCategory: "",
//     JobLevelofexpertise: "",
//     JobLocation: "",
//     JobLongDescription: "",
//     JobModeofWork: "",
//     JobPayType: "",
//     // JobPostedDate: new Date().toUTCString(),
//     JobRateMax: "",
//     JobRateMin: "",
//     JobSendResume: "",
//     JobShortDescription: "",
//     // JobShortLink: "",
//     // JobSlug: "",
//     JobStatus: "Draft",
//     JobTitle: "",
//     JobType: "",
//     // JobUpdatedDate: new Date().toUTCString(),
//     // Jobseconduid: "",
//     JobMinistry: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e, action) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No token found");

//       const payload = {
//         ...formData,
//         JobStatus: action === "post" ? "Publish" : "Draft",
//         // JobPostedDate: new Date().toUTCString(),
//         // JobUpdatedDate: new Date().toUTCString(),
//       };

//       const response = await fetch(
//         "https://app.blogpal.ai/ipartnerStaffingV1/job/create",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       let data;
//       try {
//         data = await response.json();
//       } catch {
//         data = {};
//       }

//       if (!response.ok) {
//         toast.error(data.message || "Failed to create job!");
//         console.error("API Error:", data);
//       } else {
//         toast.success(action === "post" ? "Job Published!" : "Saved as Draft!");
//         navigate("/live-jobs"); // redirect back to LiveJobs
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong while creating the job.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
//       <div className="text-center space-y-4">
//         <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//           Post a New Job
//         </h1>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//           Create an engaging job posting to attract the best talent for your organization
//         </p>
//       </div>

//       <BasicInfoSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
//       <JobDetailsSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
//       <LocationSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
//       <CompensationSection {...{ formData, errors, handleChange }} />
//       <DescriptionSection {...{ formData, handleChange }} />
//       <PublicationSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />

//       <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-center">
//         <button
//           type="button"
//           onClick={(e) => handleSubmit(e, "post")}
//           disabled={loading}
//           className="px-8 py-4 bg-purple-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading && <Loader2 className="animate-spin h-5 w-5" />}
//           <Eye className="h-5 w-5" />
//           <span>{loading ? "Publishing..." : "Publish Job"}</span>
//         </button>

//         <button
//           type="button"
//           onClick={(e) => handleSubmit(e, "Draft")}
//           disabled={loading}
//           className="px-8 py-4 bg-gray-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading && <Loader2 className="animate-spin h-5 w-5" />}
//           <FileText className="h-5 w-5" />
//           <span>{loading ? "Saving..." : "Save as Draft"}</span>
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicInfoSection from "../EditJob/BasicInfoSection";
import JobDetailsSection from "../EditJob/JobDetailsSection";
import LocationSection from "../EditJob/LocationSection";
import CompensationSection from "../EditJob/CompensationSection";
import DescriptionSection from "../EditJob/DescriptionSection";
import PublicationSection from "../EditJob/PublicationSection";
import { Loader2, Eye, FileText } from "lucide-react";
import toast from "react-hot-toast";

export default function AddJob() {
  const navigate = useNavigate();

  // Get EmployerID dynamically from localStorage
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const employerId = userData.id || 0;

  const [formData, setFormData] = useState({
    EmployerID: employerId,
    JobCompanyID: employerId,
    JobUniqueID: "",
    JobReqID: "",
    JobCategory: "",
    JobLevelofexpertise: "",
    JobLocation: "",
    JobLongDescription: "",
    JobModeofWork: "",
    JobPayType: "",
    JobRateMax: "",
    JobRateMin: "",
    JobSendResume: "",
    JobShortDescription: "",
    JobShortLink: "",
    JobSlug: "",
    JobStatus: "Draft",
    JobTitle: "",
    JobType: "",
    JobMinistry: "",
    prescreenQuestions: "[]",
  });

  const [errors, setErrors] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Generate slug like: job-title-java-developer-location-12345
  const generateSlug = (title, location) => {
    const randomNumber = Math.floor(Math.random() * 100000);
    const safeTitle = title?.toLowerCase().replace(/\s+/g, "-") || "job";
    const safeLocation = location?.toLowerCase().replace(/\s+/g, "-") || "location";
    return `job-title-${safeTitle}-location-${safeLocation}-${randomNumber}`;
  };

  const generateShortLink = () => Math.random().toString(36).substring(2, 7).toUpperCase();
  const generateUniqueID = () => Math.random().toString(36).substring(2, 15);
  const generateReqID = () => Date.now().toString().slice(-6);

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const payload = {
        ...formData,
        JobStatus: action === "post" ? "Publish" : "Draft",
        JobUniqueID: formData.JobUniqueID || generateUniqueID(),
        JobSlug: formData.JobSlug || generateSlug(formData.JobTitle, formData.JobLocation),
        JobShortLink: formData.JobShortLink || generateShortLink(),
        JobCompanyID: formData.JobCompanyID || employerId,
        JobReqID: formData.JobReqID || generateReqID(),
        JobLevelofexpertise: formData.JobLevelofexpertise || "",
      };

      const response = await fetch(
        "https://app.blogpal.ai/ipartnerStaffingV1/job/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        toast.error(data.message || "Failed to create job!");
        console.error("API Error:", data);
      } else {
        toast.success(action === "post" ? "Job Published!" : "Saved as Draft!");
        navigate("/live-jobs");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while creating the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Post a New Job
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create an engaging job posting to attract the best talent for your organization
        </p>
      </div>

      <BasicInfoSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
      <JobDetailsSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
      <LocationSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
      <CompensationSection {...{ formData, errors, handleChange }} />
      <DescriptionSection {...{ formData, handleChange }} />
      <PublicationSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />

      <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "post")}
          disabled={loading}
          className="px-8 py-4 bg-purple-700 text-white font-semibold  cursor-pointer rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="animate-spin h-5 w-5" />}
          <Eye className="h-5 w-5" />
          <span>{loading ? "Publishing..." : "Publish Job"}</span>
        </button>

        <button
          type="button"
          onClick={(e) => handleSubmit(e, "Draft")}
          disabled={loading}
          className="px-8 py-4 bg-gray-600 text-white cursor-pointer font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="animate-spin h-5 w-5" />}
          <FileText className="h-5 w-5" />
          <span>{loading ? "Saving..." : "Save as Draft"}</span>
        </button>
      </div>
    </div>
  );
}
