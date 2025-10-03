// src/components/jobs/StatusChip.jsx
import React from "react";

const colorMap = {
  "blue-600": { bg: "bg-blue-50", border: "border-blue-500", text: "text-blue-800", dot: "bg-blue-600" },
  "gray-900": { bg: "bg-gray-100", border: "border-gray-500", text: "text-gray-800", dot: "bg-gray-600" },
  "green-500": { bg: "bg-green-50", border: "border-green-500", text: "text-green-800", dot: "bg-green-600" },
  "red-500": { bg: "bg-red-50", border: "border-red-500", text: "text-red-800", dot: "bg-red-600" },
};

const StatusChip = ({ label, color }) => {
  const classes = colorMap[color] || { bg: "bg-gray-100", border: "border-gray-300", text: "text-gray-600", dot: "bg-gray-600" };
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border ${classes.border} ${classes.bg} px-3 py-1 text-xs font-semibold uppercase ${classes.text}`}>
      <span className={`w-1 h-1 rounded-full ${classes.dot}`} aria-hidden="true"></span>
      {label}
    </span>
  );
};

export default StatusChip;
