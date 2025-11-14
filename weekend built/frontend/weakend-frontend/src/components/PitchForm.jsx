import React, { useState } from "react";
import { submitPitch } from "../services/api";

export default function PitchForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitPitch({ title, description, image, link });
      alert("🎉 Pitch submitted!");
      setTitle("");
      setDescription("");
      setImage("");
      setLink("");
    } catch (err) {
      alert("❌ Error submitting pitch.");
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-4">Submit Your Project Pitch</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Optional Image URL</label>
          <input
            type="url"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Optional Project Link</label>
          <input
            type="url"
            className="form-control"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <button className="btn btn-success w-100" type="submit">
          🚀 Submit Pitch
        </button>
      </form>
    </div>
  );
}
