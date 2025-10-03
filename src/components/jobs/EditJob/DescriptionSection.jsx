import React, { useState, useRef } from "react";
import QuillEditor from "./QuillEditor";

export default function DescriptionSection({ formData, handleChange }) {
  const [wordCount, setWordCount] = useState(0);
  const quillRef = useRef(null); // Safe ref for ReactQuill

  const handleShortDescChange = (e) => {
    handleChange(e);
    const words = e.target.value.trim().split(/\s+/).filter((w) => w.length > 0);
    setWordCount(words.length);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
        <span>Job Description</span>
      </h3>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-purple-700">Short Description</label>
        <div className="relative">
          <textarea
            name="JobShortDescription"
            value={formData.JobShortDescription || ""}
            onChange={handleShortDescChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 bg-white shadow-sm resize-none"
            placeholder="Brief overview of the role and key responsibilities..."
          />
          <div
            className={`absolute bottom-3 right-3 text-sm px-2 py-1 rounded-lg ${
              wordCount > 30 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
            }`}
          >
            {wordCount} / 30 words
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-purple-700">Detailed Description</label>
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <QuillEditor
            ref={quillRef}
            theme="snow"
            value={formData.JobLongDescription || ""}
            onChange={(value) => handleChange({ target: { name: "JobLongDescription", value } })}
            className="bg-white"
            placeholder="Provide comprehensive details about the role, requirements, qualifications, and company culture..."
          />
        </div>
      </div>
    </div>
  );
}
