// import React from "react";
// import CustomDropdown from "./CustomDropdown";
// import { Clock, Calendar, FileText, Home, Building, Laptop,Briefcase ,GraduationCap} from "lucide-react";

// const jobTypes = [
//   { value: "Full-Time", icon: Briefcase },
//   { value: "Part-Time", icon: Clock },
//   { value: "Contract", icon: FileText },
//   { value: "Temporary", icon: Calendar },
//   { value: "Internship", icon: GraduationCap },
// ];

// const payTypes = [
//   { value: "Per Hour", icon: Clock },
//   { value: "Per Day", icon: Calendar },
//   { value: "Per Month", icon: Calendar },
//   { value: "Per Annual", icon: Calendar },
//   // { value: "Annually", icon: Calendar },
// ];

// const workModes = [
//   { value: "Remote", icon: Home },
//   { value: "OnSite", icon: Building },
//   { value: "Hybrid", icon: Laptop },
// ];

// export default function LocationSection({ formData, handleChange, openDropdown, setOpenDropdown }) {
//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-purple-700">
//             Location Address <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="JobLocation"
//             value={formData.JobLocation || ""}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 bg-white shadow-sm"
//             placeholder="New York, NY or Remote"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-purple-700">
//             Employment Type
//           </label>
//           <CustomDropdown
//             name="JobType"
//             value={formData.JobType || ""}
//             options={jobTypes}
//             onChange={handleChange}
//             placeholder="Select job type"
//             openDropdown={openDropdown}
//             setOpenDropdown={setOpenDropdown}
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-purple-700">
//             Pay Structure
//           </label>
//           <CustomDropdown
//             name="JobPayType"
//             value={formData.JobPayType || ""}
//             options={payTypes}
//             onChange={handleChange}
//             placeholder="Select pay frequency"
//             openDropdown={openDropdown}
//             setOpenDropdown={setOpenDropdown}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useRef } from "react";
import CustomDropdown from "./CustomDropdown";
import { Clock, Calendar, FileText, Home, Building, Laptop, Briefcase, GraduationCap } from "lucide-react";

const jobTypes = [
  { value: "Full-Time", icon: Briefcase },
  { value: "Part-Time", icon: Clock },
  { value: "Contract", icon: FileText },
  { value: "Temporary", icon: Calendar },
  { value: "Internship", icon: GraduationCap },
];

const payTypes = [
  { value: "Per Hour", icon: Clock },
  { value: "Per Day", icon: Calendar },
  { value: "Per Month", icon: Calendar },
  { value: "Per Annual", icon: Calendar },
];

export default function LocationSection({ formData, handleChange, openDropdown, setOpenDropdown }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  // Debounced autocomplete fetch
  const fetchSuggestions = async (query) => {
    const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    setSuggestions([]);
    return;
  }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
     const params = new URLSearchParams({ query: trimmedQuery });

      const response = await fetch(
        `https://app.blogpal.ai/ipartnerStaffingV1/autocomplete?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apikey:
              "BboPK6xBapbmJUVBK8FezfQFvXEuisRLQcvO0SiKtIg1rrQwUhvSn71MSCfmuejZUbQuf4XkMu0zqFpFzJZfhB2wEtcKERs8OxwGVGVM1n87rlhGfMcnu8rDcLsBfzBikL0gy47IVb8jOFLyo7KH3c",
          },
        }
      );

      const data = await response.json();
      setSuggestions(data.predictions || []);
    } catch (err) {
      console.error("Autocomplete fetch error:", err);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    handleChange(e);
    const value = e.target.value;
    setShowSuggestions(true);

    // Clear previous debounce
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Set new debounce
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300); // 300ms delay
  };

  const handleSelectSuggestion = (value) => {
    handleChange({ target: { name: "JobLocation", value } });
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="space-y-6 relative">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-2 relative">
          <label className="block text-sm font-semibold text-purple-700">
            Location Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="JobLocation"
            value={formData.JobLocation || ""}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 bg-white shadow-sm"
            placeholder="New York, NY or Remote"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-50 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-auto mt-1">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                  onMouseDown={() => handleSelectSuggestion(item.description || item)}
                >
                  {item.description || item}
                </li>
              ))}
            </ul>
          )}
          {loading && <div className="absolute top-full mt-1 text-sm text-gray-500">Loading...</div>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-purple-700">
            Employment Type
          </label>
          <CustomDropdown
            name="JobType"
            value={formData.JobType || ""}
            options={jobTypes}
            onChange={handleChange}
            placeholder="Select job type"
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-purple-700">
            Pay Structure
          </label>
          <CustomDropdown
            name="JobPayType"
            value={formData.JobPayType || ""}
            options={payTypes}
            onChange={handleChange}
            placeholder="Select pay frequency"
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        </div>
      </div>
    </div>
  );
}
