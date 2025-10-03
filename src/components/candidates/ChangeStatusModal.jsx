import React, { useState } from "react";
import toast from "react-hot-toast";
import CustomDropdown from "./CustomDropdown";
import CustomDropdown2 from "./CustomDropdown2";

export default function ChangeStatusModal({
  isOpen,
  onClose,
  candidate,
  onUpdateStatus,
}) {
  const [status, setStatus] = useState(candidate?.candidate_status || "");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !candidate) return null;

  const handleUpdate = async () => {
    if (!status) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://app.blogpal.ai/ipartnerStaffingV1/candidate/${candidate.CandidateID}`,
        {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ candidate_status: status }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status");

      toast.success("Status updated successfully");
      onUpdateStatus && onUpdateStatus(candidate.CandidateID, status);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-11/12 max-w-md bg-white rounded-lg shadow-lg p-6">
        <button
          className="absolute right-4 cursor-pointer top-4 text-gray-600 text-lg font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-purple-900 mb-4">
          Change Candidate Status
        </h2>

        <div className="mb-4">
          <p>
            <span className="font-medium text-blue-950">Candidate Name:</span>{" "}
            {candidate.candidate_name}
          </p>
          <p>
            <span className="font-medium text-blue-950">Applied Position:</span>{" "}
            {candidate.candidate_jobtitle}
          </p>
        </div>

        
        <CustomDropdown2
  value={status}
  onChange={setStatus}
  options={["Selected", "Rejected", "Onhold"]}
/>


        <button
          onClick={handleUpdate}
          disabled={loading || !status}
          className="w-full bg-purple-600 text-white  mt-2 cursor-pointer px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
}
