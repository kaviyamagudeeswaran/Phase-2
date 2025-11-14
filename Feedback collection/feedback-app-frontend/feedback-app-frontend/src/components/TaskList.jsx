// src/components/TaskList.jsx
import React from "react";

const TaskList = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <strong>{task.title}</strong>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
