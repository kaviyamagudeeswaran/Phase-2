// src/components/ListView.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ListView = () => {
  const [boards, setBoards] = useState([]);
  const [tasks, setTasks] = useState({}); // { listId: [tasks] }

  useEffect(() => {
    const fetchBoards = async () => {
      const res = await api.get("/boards");
      setBoards(res.data);

      const tasksData = {};
      for (let board of res.data) {
        for (let list of board.lists) {
          const listTasks = await api.get(
            `/boards/${board._id}/lists/${list._id}/tasks`
          );
          tasksData[list._id] = listTasks.data;
        }
      }
      setTasks(tasksData);
    };

    fetchBoards();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList = [...tasks[source.droppableId]];
    const [movedTask] = sourceList.splice(source.index, 1);
    const destList = [...(tasks[destination.droppableId] || [])];
    destList.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    });

    // Optionally call API to persist changes
    await api.put(`/tasks/${movedTask._id}/move`, {
      toListId: destination.droppableId,
      toIndex: destination.index,
    });
  };

  return (
    <div className="listview-container">
      <h2>Boards</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        {boards.map((board) => (
          <div key={board._id} className="board">
            <h3>{board.title}</h3>
            <div className="lists">
              {board.lists.map((list) => (
                <Droppable droppableId={list._id} key={list._id}>
                  {(provided) => (
                    <div
                      className="list"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <h4>{list.title}</h4>
                      {tasks[list._id] &&
                        tasks[list._id].map((task, index) => (
                          <Draggable
                            key={task._id}
                            draggableId={task._id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="task"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <p>{task.title}</p>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default ListView;
