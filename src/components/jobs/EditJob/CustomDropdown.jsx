// import React, { useState, useEffect, useRef } from "react";
// import { ChevronDown } from "lucide-react";

// export default function CustomDropdown({ name, value, options, onChange, error, placeholder, openDropdown, setOpenDropdown }) {
//   const [open, setOpen] = useState(false);
//   const selectedOption = options.find(opt => opt.value === value);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//         if (openDropdown === name) setOpenDropdown(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [name, openDropdown, setOpenDropdown]);

//   useEffect(() => setOpen(openDropdown === name), [openDropdown, name]);

//   const handleToggle = () => setOpenDropdown(open ? null : name);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         type="button"
//         onClick={handleToggle}
//         className={`w-full px-4 py-3 border rounded-xl flex justify-between items-center text-left transition-all duration-200 hover:border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm ${error ? "border-red-300" : "border-gray-200"} ${open ? "ring-2 ring-purple-500 border-purple-500" : ""}`}
//       >
//         <div className="flex items-center space-x-3">
//           {selectedOption && <selectedOption.icon className="h-5 w-5 text-purple-600" />}
//           <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
//             {selectedOption?.value || placeholder || `Select ${name}`}
//           </span>
//         </div>
//         <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
//       </button>

//       {open && (
//         <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-auto">
//           {options.map((option) => (
//             <button
//               key={option.value}
//               type="button"
//               onClick={() => { onChange({ target: { name, value: option.value } }); setOpenDropdown(null); }}
//               className="w-full px-4 py-3 hover:bg-purple-50 transition-colors duration-150 flex items-center space-x-3 text-left"
//             >
//               <option.icon className="h-5 w-5 text-purple-600" />
//               <span className="text-gray-900">{option.value}</span>
//             </button>
//           ))}
//         </div>
//       )}

//       {error && <p className="text-red-500 text-sm mt-2 flex items-center space-x-1"><span className="w-1 h-1 bg-red-500 rounded-full"></span><span>{error}</span></p>}
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomDropdown({
  name,
  value,
  options,
  onChange,
  error,
  placeholder,
  openDropdown,
  setOpenDropdown,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // normalize matching
  const selectedOption = options.find(
    (opt) => opt.value.toLowerCase() === (value || "").toLowerCase()
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        if (openDropdown === name) setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [name, openDropdown, setOpenDropdown]);

  useEffect(() => setOpen(openDropdown === name), [openDropdown, name]);

  const handleToggle = () => setOpenDropdown(open ? null : name);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        className={`w-full px-4 py-3 border rounded-xl  cursor-pointer flex justify-between items-center text-left transition-all duration-200 hover:border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm ${
          error ? "border-red-300" : "border-gray-200"
        } ${open ? "ring-2 ring-purple-500 border-purple-500" : ""}`}
      >
        <div className="flex items-center space-x-3">
          {selectedOption && (
            <selectedOption.icon className="h-5 w-5 text-purple-600" />
          )}
          <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
            {selectedOption?.value || value || placeholder || `Select ${name}`}
          </span>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange({ target: { name, value: option.value } });
                setOpenDropdown(null);
              }}
              className="w-full px-4 py-3 hover:bg-purple-50 cursor-pointer transition-colors duration-150 flex items-center space-x-3 text-left"
            >
              <option.icon className="h-5 w-5 text-purple-600" />
              <span className="text-gray-900">{option.value}</span>
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

