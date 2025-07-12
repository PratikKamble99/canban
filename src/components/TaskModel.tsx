import React, { useState } from "react";

const TaskModal = ({ task, onClose, onSave }) => {
  const [form, setForm] = useState({
    id: task.id || "",
    columnId: task.columnId,
    title: task.title || "",
    description: task.description || "",
    dueDate: task.dueDate || "",
    priority: task.priority || "Medium",
    tags: Array.isArray(task.tags) ? task.tags.join(", ") : task.tags || "",
    assignee: task.assignee || "",
    subtasks: task.subtasks || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave({
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
      subtasks: form.subtasks.filter((s) => s.trim() !== ""),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-white/10">
      <div className="bg-white rounded-lg shadow-lg w-[600px] max-h-[90vh] flex flex-col border">
        {/* Header */}
        <div className="bg-gray-100 px-4 py-3 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            {form.id ? "Edit Task" : "Create Task"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Task title"
              className="border border-gray-300 rounded w-full px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Task description"
              className="border border-gray-300 rounded w-full px-3 py-2 h-24 resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full px-3 py-2"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Tags (comma separated)
            </label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="e.g., UI, Backend"
              className="border border-gray-300 rounded w-full px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Assignee
            </label>
            <input
              name="assignee"
              value={form.assignee}
              onChange={handleChange}
              placeholder="Enter assignee name or email"
              className="border border-gray-300 rounded w-full px-3 py-2"
            />
          </div>
        </div>

        <div className="px-6">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Subtasks
          </label>
          <div className="space-y-2">
            {form.subtasks.map((sub, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  value={sub}
                  onChange={(e) => {
                    const updated = [...form.subtasks];
                    updated[i] = e.target.value;
                    setForm({ ...form, subtasks: updated });
                  }}
                  className="border border-gray-300 rounded w-full px-3 py-1"
                  placeholder={`Subtask ${i + 1}`}
                />
                <button
                  onClick={() => {
                    const updated = form.subtasks.filter(
                      (_, index) => index !== i
                    );
                    setForm({ ...form, subtasks: updated });
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                setForm({ ...form, subtasks: [...form.subtasks, ""] })
              }
              className="text-blue-500 hover:underline text-sm mt-1"
            >
              + Add Subtask
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-100 border-t flex justify-between">
          <button
            onClick={onClose}
            className=" bg-red-400 hover:text-black font-medium cursor-pointer p-2 rounded-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
