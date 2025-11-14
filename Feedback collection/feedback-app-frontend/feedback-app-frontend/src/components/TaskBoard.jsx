import React, { useEffect, useState } from "react";
import api from "../api";
import ListView from "./ListView";

const TaskBoard = () => {
  const [boards, setBoards] = useState([]);

  const fetchBoards = async () => {
    try {
      const res = await api.get("/boards");
      setBoards(res.data);
    } catch (err) {
      console.error("Failed to fetch boards");
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="board-container">
      <h2>Boards</h2>
      <div className="board-list">
        {boards.map((board) => (
          <div key={board._id} className="board-card">
            <h3>{board.title}</h3>
            <ListView title="To-Do" />
            <ListView title="In Progress" />
            <ListView title="Done" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
