import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomDropdown2({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm font-medium text-gray-700 shadow-sm hover:border-gray-400 flex justify-between items-center"
      >
        {value || "Select status"}
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`cursor-pointer px-4 py-2 text-sm hover:bg-purple-100 ${
                value === opt ? "bg-purple-100 font-medium" : ""
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
