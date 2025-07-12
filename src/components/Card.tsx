import React from "react";

const Card = ({ card, onEdit, onDelete, columnTitle }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", card.id);
    e.dataTransfer.setData("taskData", JSON.stringify(card));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white shadow p-3 rounded mb-2 cursor-move outline-1 outline-blue-300"
    >
      <div className="font-semibold">{card.title}</div>
      <div className="text-xs text-gray-600">{card.dueDate}</div>
      <div className="text-sm text-gray-700">{card.description}</div>
      <div className="mt-1 text-xs">
        <span className={`${card.priority == "High" ? "text-red-500" : ""}`}>
          {card.priority}
        </span>
        • {card.tags?.join(", ")} • {card.assignee}
      </div>
      <div className="">
        {/* <p className="">Sub Tasks</p> */}
        {card.subtasks?.length > 0 && (
          <ul className="mt-2 pl-4 text-sm list-disc text-gray-600">
            {card.subtasks.map((sub, i) => (
              <li key={i}>{sub}</li>
            ))}
          </ul>
        )}
      </div>
      {/* {columnTitle === "In Progress" && (
        <button
          onClick={() => onMarkComplete(card)}
          className="mt-2 bg-green-500 text-white text-xs px-2 py-1 rounded hover:bg-green-600"
        >
          ✅ Mark as Complete
        </button>
      )} */}
      <div className="flex gap-2 mt-2 text-sm">
        <button onClick={onEdit} className="text-blue-500 cursor-pointer ">
          Edit
        </button>
        <button onClick={onDelete} className="text-red-500 cursor-pointer">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
