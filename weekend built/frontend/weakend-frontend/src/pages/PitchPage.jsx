import React, { useState } from "react";
import API from "../services/api";

const PitchPage = () => {
  const [pitch, setPitch] = useState({ title: "", description: "", link: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/build/pitch", pitch);
      alert("Pitch submitted successfully!");
    } catch (err) {
      alert(err.response.data.message || "Pitch submission failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Submit Your Weekend Pitch</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Title"
          onChange={(e) => setPitch({ ...pitch, title: e.target.value })}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          onChange={(e) => setPitch({ ...pitch, description: e.target.value })}
        ></textarea>
        <input
          className="form-control mb-2"
          placeholder="Optional Link"
          onChange={(e) => setPitch({ ...pitch, link: e.target.value })}
        />
        <button className="btn btn-primary" type="submit">
          Submit Pitch
        </button>
      </form>
    </div>
  );
};

export default PitchPage;
