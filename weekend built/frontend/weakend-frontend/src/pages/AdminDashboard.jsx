// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";

const AdminDashboard = () => {
  const [flaggedBuilds, setFlaggedBuilds] = useState([]);
  const [flaggedComments, setFlaggedComments] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchFlaggedData();
    fetchStats();
  }, []);

  const fetchFlaggedData = async () => {
    try {
      const res = await API.get("/admin/flagged");
      setFlaggedBuilds(res.data.flaggedBuilds || []);
      setFlaggedComments(res.data.flaggedComments || []);
    } catch (err) {
      alert("Error fetching flagged content");
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      alert("Error fetching stats");
    }
  };

  const handleDeleteBuild = async (id) => {
    if (!window.confirm("Are you sure to remove this build?")) return;
    await API.delete(`/admin/remove-build/${id}`);
    fetchFlaggedData();
  };

  const handleDeleteComment = async (id) => {
    if (!window.confirm("Are you sure to delete this comment?")) return;
    await API.delete(`/admin/remove-comment/${id}`);
    fetchFlaggedData();
  };

  return (
    <div className="container mt-4">
      <h2>🛡️ Admin Dashboard</h2>

      <div className="my-4">
        <h4>📊 Stats</h4>
        <ul>
          <li>Active Builders: {stats.activeBuilders || 0}</li>
          <li>Top Builds: {stats.topBuilds || 0}</li>
        </ul>
      </div>

      <div className="my-4">
        <h4>🚩 Flagged Builds</h4>
        {flaggedBuilds.length === 0 ? (
          <p>No flagged builds</p>
        ) : (
          flaggedBuilds.map((build) => (
            <div key={build._id} className="border p-2 mb-2">
              <h5>{build.title}</h5>
              <p>{build.description}</p>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteBuild(build._id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="my-4">
        <h4>🚩 Flagged Comments</h4>
        {flaggedComments.length === 0 ? (
          <p>No flagged comments</p>
        ) : (
          flaggedComments.map((comment) => (
            <div key={comment._id} className="border p-2 mb-2">
              <p>{comment.content}</p>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteComment(comment._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
