import React, { useState } from "react";
import toast from "react-hot-toast";

export default function UnarchiveButton({ candidateId, onUnarchived , disabled }) {
  const [loading, setLoading] = useState(false);

  const handleUnarchive = async () => {
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
          body: JSON.stringify({ candidate_status: "onhold" }), // 👈 Unarchive = Onhold
        }
      );

      if (!response.ok) throw new Error("Failed to unarchive candidate");

      toast.success("Candidate moved to Onhold successfully");
     onUnarchived && onUnarchived(candidateId);

    } catch (error) {
      console.error(error);
      toast.error("Failed to unarchive candidate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleUnarchive}
      disabled={disabled || loading}
      className={`rounded-xl border border-gray-300 cursor-pointer px-4 py-2 text-sm font-medium tracking-wide text-gray-700 hover:bg-gray-50 ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Unarchiving..." : "UNARCHIVE"}
    </button>
  );
}
