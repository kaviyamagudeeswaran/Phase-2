// src/components/TaskForm.jsx
import React, { useState } from "react";
import api from "../api";

const TaskForm = ({ listId, onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await api.post("/tasks", {
        listId,
        title,
        description: "",
        priority: "low",
        dueDate: new Date(),
      });
      onTaskAdded(res.data);
      setTitle("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <form onSubmit={handleAddTask} style={{ marginTop: "10px" }}>
      <input
        type="text"
        placeholder="New task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
