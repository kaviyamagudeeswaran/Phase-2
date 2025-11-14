// src/components/CommentSection.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";

const CommentSection = ({ pitchId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/build/comments/${pitchId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [pitchId]);

  const handleComment = async () => {
    try {
      await API.post("/build/comment", { pitchId, content: comment });
      setComment("");
      fetchComments();
    } catch (err) {
      alert("Error posting comment");
    }
  };

  const handleUpvote = async () => {
    try {
      await API.post(`/build/upvote/${pitchId}`);
      alert("Upvoted!");
    } catch (err) {
      alert("Error upvoting");
    }
  };

  return (
    <div className="mt-3">
      <h5>Comments</h5>
      {comments.map((c) => (
        <div key={c._id} className="border rounded p-2 my-1">
          <strong>{c.user?.username || "Anonymous"}:</strong> {c.content}
        </div>
      ))}
      <textarea
        className="form-control my-2"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button className="btn btn-primary me-2" onClick={handleComment}>
        Comment
      </button>
      <button className="btn btn-outline-success" onClick={handleUpvote}>
        Upvote
      </button>
    </div>
  );
};

export default CommentSection;
