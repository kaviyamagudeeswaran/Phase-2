import React, { useState } from "react";
import axios from "axios";

const OutcomePage = () => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/build/outcome",
        { description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Outcome submitted:", response.data);
      alert("Outcome submitted successfully!");
      setDescription("");
    } catch (error) {
      console.error("Error submitting outcome:", error);
      alert(
        "Outcome submission failed. Please check your connection or login."
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2>Submit Outcome</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="description">Outcome Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Write about what you completed this weekend..."
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit Outcome
        </button>
      </form>
    </div>
  );
};

export default OutcomePage;
