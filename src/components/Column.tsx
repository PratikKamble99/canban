import React, { useState } from "react";
import Card from "./Card";
import TaskModal from "./TaskModel";

const Column = ({ column, data, setData, onEdit, onDelete }) => {
  const [editingTask, setEditingTask] = useState(null);

  const getTaskProgress = () => {
    const total = column.cards.length;
    const completed = column.cards.filter(
      (card) => card.status === "done" || card.completed === true
    ).length;

    return { total, completed };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const taskData = JSON.parse(e.dataTransfer.getData("taskData"));

    if (column.cards.find((c) => c.id === taskId)) return; // skip if task already in column

    const newColumns = data.columns.map((col) => {
      if (col.cards.some((c) => c.id === taskId)) {
        return {
          ...col,
          cards: col.cards.filter((c) => c.id !== taskId),
        };
      }
      return col;
    });

    const updatedColumns = newColumns.map((col) => {
      if (col.id === column.id) {
        return { ...col, cards: [...col.cards, taskData] };
      }
      return col;
    });

    setData({ ...data, columns: updatedColumns });
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleAddTask = () => setEditingTask({ columnId: column.id });

  const handleEditTask = (task) =>
    setEditingTask({ ...task, columnId: column.id });

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Delete this task?")) {
      const newCols = data.columns.map((col) =>
        col.id === column.id
          ? { ...col, cards: col.cards.filter((c) => c.id !== taskId) }
          : col
      );
      setData({ ...data, columns: newCols });
    }
  };

  const handleSaveTask = (task) => {
    const newCols = data.columns.map((col) => {
      if (col.id !== task.columnId) return col;

      if (task.id) {
        return {
          ...col,
          cards: col.cards.map((c) => (c.id === task.id ? task : c)),
        };
      } else {
        const newTask = { ...task, id: `task-${Date.now()}` };
        return { ...col, cards: [...col.cards, newTask] };
      }
    });

    setData({ ...data, columns: newCols });
    setEditingTask(null);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="bg-gray-100 p-4 min-w-[250px] rounded shadow"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-lg">{column.title}</h2>
        <div>
          <button
            onClick={onEdit}
            className="text-sm text-blue-500 mr-2 cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-sm text-red-500 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      <button
        onClick={handleAddTask}
        className="text-sm text-green-500 mb-2 hover:underline"
      >
        + Add Task
      </button>

      {column.cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          columnTitle={column.title}
          onEdit={() => handleEditTask(card)}
          onDelete={() => handleDeleteTask(card.id)}
          // onMarkComplete={handleMarkComplete}
        />
      ))}

      {editingTask && (
        <TaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default Column;
