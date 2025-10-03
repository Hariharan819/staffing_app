import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomDropdown({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <label className="block text-sm font-medium text-indigo-700">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mt-2 w-full rounded-md border cursor-pointer border-slate-300 bg-white px-3 py-2 text-left text-sm shadow-sm outline-none flex justify-between items-center focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
      >
        {value || "Select pay type"}
        <ChevronDown size={16} className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <ul className="absolute z-50 mt-1 w-full rounded-md border border-slate-300 bg-white shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="cursor-pointer px-3 py-2 text-sm hover:bg-purple-100 "
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
