import { useEffect, useState } from "react";
import api from "../api";

const BoardPage = () => {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");

  const fetchBoards = async () => {
    try {
      const res = await api.get("/boards");
      setBoards(res.data);
    } catch (err) {
      console.error("Error fetching boards", err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/boards", { title });
      setTitle("");
      fetchBoards();
    } catch (err) {
      console.error("Error creating board", err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div>
      <h2>My Boards</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Board Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Create Board</button>
      </form>

      <ul>
        {boards.map((board) => (
          <li key={board._id}>
            <a href={`/boards/${board._id}/lists`}>{board.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardPage;
