// import React, { useState } from "react";
// import BasicInfoSection from "./BasicInfoSection.jsx";
// import JobDetailsSection from "./JobDetailsSection";
// import LocationSection from "./LocationSection";
// import CompensationSection from "./CompensationSection";
// import DescriptionSection from "./DescriptionSection";
// import PublicationSection from "./PublicationSection";

// export default function EditJob({ job, closeEdit  }) {
//   const [formData, setFormData] = useState({
//     sector: "", reqId: "", client: "", modeOfWork: "", levelOfExpertise: "",
//     jobTitle: "", locationAddress: "", jobType: "", minRate: "", maxRate: "",
//     payType: "", shortDescription: "", longDescription: "", status: "Draft",
//     sendResumesTo: ""
//   });
//   const [errors, setErrors] = useState({});
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const handleChange = (e) => { /* same as original */ };
//   const handleSubmit = (e, action) => { /* same as original */ };
// console.log(job)
//   return (
//     <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
//        <div className="text-center space-y-4">
//           <div className="flex items-center justify-center space-x-3">
//             {/* <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg">
//               <Briefcase className="h-8 w-8 text-white" />
//             </div> */}
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//            Edit a  Job 
//             </h1>
            
//       </div>
//       </div>
//       <BasicInfoSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
//       <JobDetailsSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
//       <LocationSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
//       <CompensationSection {...{ formData, errors, handleChange }} />
//       <DescriptionSection {...{ formData, handleChange }} />
//       <PublicationSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
//       {/* Action Button */}
//       <div className="flex justify-center mt-6">
//         <button type="button" onClick={(e) => handleSubmit(e, "update")} className="px-8 py-4 bg-blue-700 text-white font-semibold rounded-xl focus:ring-4 focus:ring-blue-200 flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
//           Update Job
//         </button>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import BasicInfoSection from "./BasicInfoSection.jsx";
// import JobDetailsSection from "./JobDetailsSection";
// import LocationSection from "./LocationSection";
// import CompensationSection from "./CompensationSection";
// import DescriptionSection from "./DescriptionSection";
// import PublicationSection from "./PublicationSection";

// export default function EditJob({ job, closeEdit }) {
//   const [formData, setFormData] = useState({
//     sector: "",
//     reqId: "",
//     client: "",
//     modeOfWork: "",
//     levelOfExpertise: "",
//     jobTitle: "",
//     locationAddress: "",
//     jobType: "",
//     minRate: "",
//     maxRate: "",
//     payType: "",
//     shortDescription: "",
//     longDescription: "",
//     status: "Draft",
//     sendResumesTo: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [openDropdown, setOpenDropdown] = useState(null);

//   // Initialize form with job data when pop-up opens
//   useEffect(() => {
//     if (job) {
//       setFormData({
//         sector: job.sector || "",
//         reqId: job.reqId || "",
//         client: job.client || "",
//         modeOfWork: job.modeOfWork || "",
//         levelOfExpertise: job.levelOfExpertise || "",
//         jobTitle: job.JobTitle || "",
//         locationAddress: job.JobLocation || "",
//         jobType: job.jobType || "",
//         minRate: job.minRate || "",
//         maxRate: job.maxRate || "",
//         payType: job.payType || "",
//         shortDescription: job.shortDescription || "",
//         longDescription: job.longDescription || "",
//         status: job.JobStatus || "Draft",
//         sendResumesTo: job.JobSendResume || "",
//       });
//     }
//   }, [job]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e, action) => {
//     e.preventDefault();
//     console.log("Submitting form:", formData, "Action:", action);
//     // TODO: Add API call to update job
//     closeEdit(); // Close pop-up after save
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-8 space-y-8 bg-white rounded-2xl shadow-lg relative">
//       {/* Close button */}
//       <button
//         onClick={closeEdit}
//         className="absolute top-4 cursor-pointer right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
//       >
//         ✕
//       </button>

//       {/* Heading */}
//       <div className="text-center space-y-4">
//         <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//           Edit a Job
//         </h1>
//       </div>

//       {/* Sections */}
//       <BasicInfoSection
//         {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }}
//       />
//       <JobDetailsSection
//         {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }}
//       />
//       <LocationSection
//         {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }}
//       />
//       <CompensationSection {...{ formData, errors, handleChange }} />
//       <DescriptionSection {...{ formData, handleChange }} />
//       <PublicationSection
//         {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }}
//       />

//       {/* Action Button */}
//       <div className="flex justify-center mt-6">
//         <button
//           type="button"
//           onClick={(e) => handleSubmit(e, "update")}
//           className="px-8 py-4 bg-blue-900 text-white font-semibold rounded-xl focus:ring-4 focus:ring-blue-200 flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//         >
//           Update Job
//         </button>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import BasicInfoSection from "./BasicInfoSection.jsx";
// import JobDetailsSection from "./JobDetailsSection";
// import LocationSection from "./LocationSection";
// import CompensationSection from "./CompensationSection";
// import DescriptionSection from "./DescriptionSection";
// import PublicationSection from "./PublicationSection";
// import { sectorOptions, experienceLevels, jobTypes, payTypes, workModes, statusOptions } from "./dropdownData";

// export default function EditJob({ job, closeEdit }) {
//   const [formData, setFormData] = useState({
//     sector: "",
//     reqId: "",
//     client: "",
//     modeOfWork: "",
//     levelOfExpertise: "",
//     jobTitle: "",
//     locationAddress: "",
//     jobType: "",
//     minRate: "",
//     maxRate: "",
//     payType: "",
//     shortDescription: "",
//     longDescription: "",
//     status: "Draft",
//     sendResumesTo: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [openDropdown, setOpenDropdown] = useState(null);

//   // Prefill form when job data is available
//  useEffect(() => {
//   if (job) {
//     setFormData({
//       sector: sectorOptions.find(opt => opt.value.toLowerCase() === (job.JobCategory || "").toLowerCase())?.value || "",
//       reqId: job.JobReqID || "",
//       client: job.EmployerID || "",
//       modeOfWork: workModes.find(opt => opt.value.toLowerCase() === (job.JobModeofWork || "").toLowerCase())?.value || "",
//       levelOfExpertise: experienceLevels.find(opt => opt.value.toLowerCase().includes((job.JobLevelofExpertise || "").toLowerCase()))?.value || "",
//       jobTitle: job.JobTitle || "",
//       locationAddress: job.JobLocation || "",
//       jobType: jobTypes.find(opt => opt.value.toLowerCase() === (job.JobType || "").toLowerCase())?.value || "",
//       minRate: job.JobRateMin || "",
//       maxRate: job.JobRateMax || "",
//       payType: payTypes.find(opt => opt.value.toLowerCase() === (job.JobPayType || "").toLowerCase())?.value || "",
//       shortDescription: job.JobShortDescription || "",
//       longDescription: job.JobLongDescription || "",
//       status: statusOptions.find(opt => {
//         const mapStatus = { archived: "Closed", Publish: "Published", Draft: "Draft" };
//         return opt.value === mapStatus[job.JobStatus] || opt.value === job.JobStatus;
//       })?.value || "Draft",
//       sendResumesTo: job.JobSendResume || "",
//     });
//   }
// }, [job]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // const handleSubmit = (e, action) => {
//   //   e.preventDefault();
//   //   console.log("Submitting form:", formData, "Action:", action);
//   //   // TODO: call API to update job
//   //   closeEdit();
//   // };

//   const handleSubmit = async (e, action) => {
//   e.preventDefault();

//   try {
//     const token = localStorage.getItem("token"); // Get token from localStorage
//     if (!token) {
//       alert("You are not authenticated!");
//       return;
//     }

//     // Prepare payload for API
//     const payload = {
//       JobCategory: formData.sector,
//       JobReqID: formData.reqId,
//       EmployerID: formData.client,
//       JobModeofWork: formData.modeOfWork,
//       JobLevelofExpertise: formData.levelOfExpertise,
//       JobTitle: formData.jobTitle,
//       JobLocation: formData.locationAddress,
//       JobType: formData.jobType,
//       JobRateMin: formData.minRate,
//       JobRateMax: formData.maxRate,
//       JobPayType: formData.payType,
//       JobShortDescription: formData.shortDescription,
//       JobLongDescription: formData.longDescription,
//       JobStatus: formData.status === "Published" ? "Publish" : formData.status === "Closed" ? "archived" : "Draft",
//       JobSendResume: formData.sendResumesTo,
//     };

//     const response = await fetch(`https://app.blogpal.ai/ipartnerStaffingV1/job/u/${job.Jobseconduid}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       console.log("Job updated successfully:", data);
//       alert("Job updated successfully!");
//       closeEdit(); // Close the edit modal
//     } else {
//       console.error("Failed to update job:", data);
//       alert(`Error: ${data.message || "Failed to update job"}`);
//     }
//   } catch (error) {
//     console.error("Error updating job:", error);
//     alert("Something went wrong. Please try again.");
//   }
// };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-8 space-y-8 bg-white rounded-2xl shadow-lg relative">
//       <button
//         onClick={closeEdit}
//         className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
//       >
//         ✕
//       </button>

//       <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-center">
//         Edit a Job
//       </h1>

//       <BasicInfoSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
//       <JobDetailsSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
//       <LocationSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
//       <CompensationSection {...{ formData, errors, handleChange }} />
//       <DescriptionSection {...{ formData, handleChange }} />
//       <PublicationSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />

//       <div className="flex justify-center mt-6">
//         <button
//           type="button"
//           onClick={(e) => handleSubmit(e, "update")}
//           className="px-8 py-4 bg-blue-900 text-white cursor-pointer font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
//         >
//           Update Job
//         </button>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import BasicInfoSection from "./BasicInfoSection.jsx";
import JobDetailsSection from "./JobDetailsSection";
import LocationSection from "./LocationSection";
import CompensationSection from "./CompensationSection";
import DescriptionSection from "./DescriptionSection";
import PublicationSection from "./PublicationSection";
import { sectorOptions, experienceLevels, jobTypes, payTypes, workModes, statusOptions } from "./dropdownData";
import toast from "react-hot-toast";

export default function EditJob({ job, closeEdit, onUpdate }) {
  const [formData, setFormData] = useState({
    EmployerID: "",
    JobCategory: "",
    JobLevelofExpertise: "",
    JobLocation: "",
    JobLongDescription: "",
    JobModeofWork: "",
    JobMinistry:"",
    JobPayType: "",
    JobRateMax: "",
    JobRateMin: "",
    JobReqID: "",
    JobSendResume: "",
    JobShortDescription: "",
    JobStatus: "Draft",
    JobTitle: "",
    JobType: "",
  });

  const [errors, setErrors] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);

  // Prefill form when job data is available
  useEffect(() => {
    if (job) {
      setFormData({
        EmployerID: job.EmployerID || "",
        JobCategory: job.JobCategory || "",
        JobMinistry:job.JobMinistry || "",
        JobLevelofExpertise: job.JobLevelofExpertise || "",
        JobLevelofexpertise: job.JobLevelofExpertise || "",
        JobLocation: job.JobLocation || "",
        JobLongDescription: job.JobLongDescription || "",
        JobModeofWork: job.JobModeofWork || "",
        JobPayType: job.JobPayType || "",
        JobRateMax: job.JobRateMax || "",
        JobRateMin: job.JobRateMin || "",
        JobReqID: job.JobReqID || "",
        JobSendResume: job.JobSendResume || "",
        JobShortDescription: job.JobShortDescription || "",
        JobStatus: job.JobStatus || "Draft",
        JobTitle: job.JobTitle || "",
        JobType: job.JobType || "",
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    const newErrors = {};
    if (!formData.JobCategory) newErrors.JobCategory = "Job category is required";
    if (!formData.JobTitle) newErrors.JobTitle = "Job title is required";
    if (!formData.JobLocation) newErrors.JobLocation = "Location is required";
    if (!formData.JobShortDescription) newErrors.JobShortDescription = "Short description is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not authenticated!");
        return;
      }

      const response = await fetch(`https://app.blogpal.ai/ipartnerStaffingV1/job/u/${job.Jobseconduid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Job updated successfully!");
        if (onUpdate) onUpdate({ ...job, ...formData });
        closeEdit();

      } else {
        toast.error(data.message || "Failed to update job");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8 bg-white rounded-2xl shadow-lg relative">
      <button
        onClick={closeEdit}
        className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700 text-xl font-bold"
      >
        ✕
      </button>

      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-center">
        Edit a Job
      </h1>

      <BasicInfoSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
  <JobDetailsSection
  formData={formData}
  errors={errors}
  handleChange={handleChange}
  openDropdown={openDropdown}
  setOpenDropdown={setOpenDropdown}
  isEditJob={false} // AddJob uses lowercase key
/>

      <LocationSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />
      <CompensationSection {...{ formData, errors, handleChange }} />
      <DescriptionSection {...{ formData, handleChange }} />
      <PublicationSection {...{ formData, errors, handleChange, openDropdown, setOpenDropdown }} />

      <div className="flex justify-center mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="px-8 py-4 bg-blue-900 text-white cursor-pointer font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Update Job
        </button>
      </div> 
    </div>
  );
}
