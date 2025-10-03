import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const JobTitleDropdown = ({ filters, handleFilterChange, jobOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref}>
      {/* <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-purple-900">
        Job Title
      </label> */}

      <div
        className="relative w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Input-like box */}
        <div className="w-full rounded-xl bg-white border border-purple-200 px-3 py-2 shadow-sm text-gray-900 flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500">
          {filters.jobTitle || "All Jobs"}
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        
        {/* Dropdown menu */}
        {isOpen && (
          <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white border border-purple-200 shadow-lg">
            <li
              className="px-3 py-2 hover:bg-purple-50 cursor-pointer"
              onClick={() => {
                handleFilterChange("jobTitle", "");
                setIsOpen(false);
              }}
            >
              All Jobs
            </li>
            {jobOptions.map((job, idx) => (
              <li
                key={idx}
                className="px-3 py-2 hover:bg-purple-50 cursor-pointer"
                onClick={() => {
                  handleFilterChange("jobTitle", job);
                  setIsOpen(false);
                }}
              >
                {job}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobTitleDropdown;
