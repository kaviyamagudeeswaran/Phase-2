import React from "react";

export default function BuildCard() {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Project Title</h5>
        <p className="card-text">Project description here...</p>
        <button className="btn btn-primary">Upvote</button>
      </div>
    </div>
  );
}
