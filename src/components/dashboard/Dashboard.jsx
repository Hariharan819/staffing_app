

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Eye,
  Users,
  Clock,
  Plus,
  UserPlus
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // States
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [stats, setStats] = useState({
    totalJobs: 0,
    liveJobs: 0,
    newResponses: 0,
    awaitingRTR: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Jobs
  const fetchJobs = async () => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const employerID = userData?.id;
    if (!token || !employerID) return;

    try {
      const res = await fetch(
        `https://app.blogpal.ai/ipartnerStaffingV1/jobs/${employerID}`,
        { method: "GET", headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("Jobs fetch error:", err);
    }
  };

  // Fetch Candidates
  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userdata = JSON.parse(localStorage.getItem("userData") || "{}");
      const employerId = userdata?.id;

      if (!token || !employerId) {
        setError("Authentication required");
        return;
      }

      const response = await fetch(
        `https://app.blogpal.ai/ipartnerStaffingV1/candidates/${employerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const raw = await response.text();
      if (!response.ok) throw new Error(`Failed: ${response.status} ${raw}`);
      if (!raw) throw new Error("API returned empty response");

      const data = JSON.parse(raw);
      const allCandidates = (data.Candidate || []).map((c) => ({
        ...c,
        candidate_status: (c.candidate_status || "").trim().toLowerCase(),
      }));
// console.log(allCandidates)
      setCandidates(allCandidates);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchJobs();
    fetchCandidates();
  }, []);

  // Update stats when jobs or candidates change
// Update stats when jobs or candidates change
useEffect(() => {
  setStats({
    totalJobs: jobs.filter(
      j => j.JobStatus === "Publish" || j.JobStatus === "Draft"
    ).length,
    liveJobs: jobs.filter(j => j.JobStatus === "Publish").length,
    newResponses: candidates.filter(c => c.candidate_status === "new").length,
    awaitingRTR: jobs.filter(j => j.JobStatus === "AwaitingRTR").length || 0,
  });
}, [jobs, candidates]);


  // StatCard Component
  const StatCard = ({ title, value, icon: Icon, iconBg, loading }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900 mb-1">{title}</p>
          {loading ? (
            <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconBg}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  // QuickAction Component
  const QuickAction = ({ title, description, icon: Icon, onClick, bgColor, loading }) => (
    <div
      onClick={loading ? undefined : onClick}
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all ${
        loading ? "cursor-default" : "hover:shadow-md cursor-pointer"
      } group`}
    >
      <div className="flex items-start space-x-4">
        {loading ? (
          <>
            <div className="h-12 w-12 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </>
        ) : (
          <>
            <div className={`p-3 rounded-xl ${bgColor} group-hover:scale-105 transition-transform`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-purple-900">Dashboard</h1>
            <p className="text-gray-900 mt-1">
              Welcome back! Here's what's happening with your recruitment today.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Jobs" value={stats.totalJobs} icon={Briefcase} iconBg="bg-blue-500" loading={loading} />
        <StatCard title="Live Jobs" value={stats.liveJobs} icon={Eye} iconBg="bg-green-500" loading={loading} />
        <StatCard title="New Responses" value={stats.newResponses} icon={Users} iconBg="bg-purple-500" loading={loading} />
        <StatCard title="Awaiting RTR" value={stats.awaitingRTR} icon={Clock} iconBg="bg-orange-500" loading={loading} />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuickAction
            title="Create New Job"
            description="Post a new job listing and start recruiting"
            icon={Plus}
            bgColor="bg-green-500"
            onClick={() => navigate("/add-job")}
            loading={loading}
          />
          <QuickAction
            title="View Responses"
            description="Review and manage candidate applications"
            icon={UserPlus}
            bgColor="bg-blue-500"
            onClick={() => navigate("/new-responses")}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
