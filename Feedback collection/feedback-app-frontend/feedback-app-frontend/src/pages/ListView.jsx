// src/components/ListView.jsx
import React from "react";
import TaskForm from "./TaskForm";

const ListView = () => {
  const boardTitle = "Project Board";

  const dummyLists = [
    { id: "1", title: "To Do" },
    { id: "2", title: "In Progress" },
    { id: "3", title: "Done" },
  ];

  const handleTaskAdded = (newTask) => {
    console.log("Task added:", newTask);
    // Later: Update state to show added task
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{boardTitle}</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {dummyLists.map((list) => (
          <div
            key={list.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              width: "30%",
            }}
          >
            <h4>{list.title}</h4>
            <ul>
              {/* Dummy task list - update later with real tasks */}
              <li>Task 1</li>
              <li>Task 2</li>
            </ul>
            <TaskForm listId={list.id} onTaskAdded={handleTaskAdded} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListView;
