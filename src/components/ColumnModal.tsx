import React, { useState } from "react";

const ColumnModal = ({ column, onClose, onSave }) => {
  const [title, setTitle] = useState(column.title || "");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSave({ ...column, title: title.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm rounded-lg bg-white/10 border border-gray-400">
      <div className="bg-white rounded-lg shadow-lg w-[500px] flex flex-col border border-gray-600">
        {/* Header */}
        <div className="bg-gray-100 px-4 py-3 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            {column.id ? "Edit Column" : "Create Column"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Column Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Backlog, In Progress, Done"
              className="border border-gray-300 rounded w-full px-3 py-2"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-100 border-t flex justify-between">
          <button
            onClick={onClose}
            className="bg-red-400 hover:text-black font-medium cursor-pointer p-2 rounded-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnModal;
