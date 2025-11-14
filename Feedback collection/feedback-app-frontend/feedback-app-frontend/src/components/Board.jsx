import React, { useEffect, useState } from "react";
import api from "../api";

const Board = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await api.get("/boards"); // 🔁 Make sure this matches your backend
        setBoards(res.data);
        console.log("Boards fetched:", res.data);
      } catch (err) {
        console.error("Error fetching boards:", err);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div>
      <h2>Boards</h2>
      {boards.length === 0 ? (
        <p>No boards found.</p>
      ) : (
        boards.map((board) => <div key={board._id}>{board.title}</div>)
      )}
    </div>
  );
};

export default Board;
