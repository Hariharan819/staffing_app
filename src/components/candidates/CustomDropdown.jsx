

// import { useState, useRef, useEffect } from "react"
// import { ChevronDown } from "lucide-react"

// const options = [
//   { label: "Any status", value: "" },
//   { label: "New", value: "New" },
//   { label: "Selected", value: "Selected" },
//   { label: "On hold", value: "On hold" },
//   { label: "Rejected", value: "Rejected" },
//   { label: "Archived", value: "Archived" },
// ]

// export default function CustomDropdown({ value, onChange }) {
//   const [open, setOpen] = useState(false)
//   const dropdownRef = useRef(null)

//   // Close when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   return (
//     <div className="w-full" ref={dropdownRef}>
//       <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-900">
//         STATUS
//       </label>

//       {/* relative wrapper so dropdown aligns with this box */}
//       <div className="relative">
//         <div
//           onClick={() => setOpen(!open)}
//           className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus-within:ring-2 focus-within:ring-purple-500"
//         >
//           <span>{value || "Any status"}</span>
//           <ChevronDown
//             className={`ml-2 h-5 w-5 text-gray-400 transition-transform ${
//               open ? "rotate-180" : ""
//             }`}
//           />
//         </div>

//         {open && (
//           <ul className="absolute left-0 top-full mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg z-20">
//             {options.map((opt) => (
//               <li
//                 key={opt.value}
//                 onClick={() => {
//                   onChange(opt.value)
//                   setOpen(false)
//                 }}
//                 className={`cursor-pointer px-4 py-2 text-sm hover:bg-purple-50 ${
//                   value === opt.value ? "bg-purple-100 font-medium" : ""
//                 }`}
//               >
//                 {opt.label}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   )
// }



import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function CustomDropdown({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (val) => {
    onChange(val)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-white cursor-pointer rounded-xl border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      >
        {value || "Select"}
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 cursor-pointer max-h-60 w-full overflow-auto rounded-xl border border-gray-300 bg-white shadow-lg">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`cursor-pointer px-3 py-2 hover:bg-purple-100 ${
                value === opt.value ? "bg-purple-50 text-purple-700" : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
