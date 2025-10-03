import React from "react";

export default function ViewResumeModal({ isOpen, onClose, resumeUrl }) {
  if (!isOpen) return null;

  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
    resumeUrl
  )}&embedded=true`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Semi-transparent overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}  // clicking outside closes modal
      ></div>

      {/* Modal popup */}
      <div className="relative w-11/12 max-w-4xl h-[80vh] bg-white rounded-lg shadow-lg z-50">
        <button
          className="absolute left-4 top-4 cursor-pointer text-white font-bold text-lg"
          onClick={onClose}
        >
          ✕
        </button>
        <iframe
          src={googleViewerUrl}
          className="w-full h-full rounded-b-lg"
          title="Resume Viewer"
        />
      </div>
    </div>
  );
}
