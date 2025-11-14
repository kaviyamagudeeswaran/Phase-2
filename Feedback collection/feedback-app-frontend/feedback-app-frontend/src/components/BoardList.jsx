import { useEffect, useState } from "react";
import api from "../api";

function BoardList() {
  const [boards, setBoards] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  // Fetch boards
  const fetchBoards = async () => {
    try {
      const res = await api.get("/boards");
      setBoards(res.data);
    } catch (err) {
      console.error("Failed to fetch boards", err);
    }
  };

  // Create new board
  const createBoard = async () => {
    if (!newTitle.trim()) return;
    try {
      const res = await api.post("/boards", { title: newTitle });
      setBoards([...boards, res.data]);
      setNewTitle("");
    } catch (err) {
      console.error("Error creating board", err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Your Boards</h2>

      <div>
        <input
          type="text"
          placeholder="New board title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={createBoard}>Create Board</button>
      </div>

      <ul>
        {boards.map((board) => (
          <li key={board._id}>{board.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default BoardList;
