import { Download } from "lucide-react";

export default function DownloadButton({ resumeId, candidateName }) {
  const handleDownload = async () => {
    if (!resumeId) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token not found.");
        return;
      }

      const response = await fetch(`https://app.blogpal.ai/ipartnerStaffingV1/pdf/${resumeId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${candidateName ? candidateName : resumeId}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download resume.");
    }
  };

  return (
     <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 text-green-700 cursor-pointer font-medium transition-colors duration-200"
    >
      <Download className="w-4 h-4" />
      Download
    </button>
  );
}
