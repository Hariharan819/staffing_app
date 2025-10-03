import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ArchiveButton({ candidateId, onArchived, disabled }) {
  const [loading, setLoading] = useState(false);

  const handleArchive = async () => {
    if (disabled) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://app.blogpal.ai/ipartnerStaffingV1/candidate/${candidateId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ candidate_status: "archived" }), // exact lowercase
        }
      );

      if (!response.ok) {
        throw new Error("Failed to archive candidate");
      }

      toast.success("Candidate archived successfully");
      onArchived && onArchived(candidateId); // Notify parent
    } catch (error) {
      console.error(error);
      toast.error("Failed to archive candidate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleArchive}
      disabled={disabled || loading}
      className={`rounded-xl border border-gray-300  px-4 py-2 text-sm font-medium tracking-wide text-gray-700 hover:bg-gray-50 ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Archiving..." : "ARCHIVE"}
    </button>
  );
}
  