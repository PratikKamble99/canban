import React, { useState } from "react";
import Column from "./Column";
import ColumnModal from "./ColumnModal";

const Board = ({ data, setData }) => {
  const [editingCol, setEditingCol] = useState(null);

  const handleAddColumn = () => {
    setEditingCol({ id: "", title: "" });
  };

  const handleSaveColumn = (col) => {
    if (!col.title) return;

    if (col.id) {
      // Edit column
      setData({
        ...data,
        columns: data.columns.map((c) =>
          c.id === col.id ? { ...c, title: col.title } : c
        ),
      });
    } else {
      // Add column
      const newCol = {
        id: `col-${Date.now()}`,
        title: col.title,
        cards: [],
      };
      setData({ ...data, columns: [...data.columns, newCol] });
    }
    setEditingCol(null);
  };

  const handleDeleteColumn = (id) => {
    if (window.confirm("Delete this column?")) {
      setData({
        ...data,
        columns: data.columns.filter((c) => c.id !== id),
      });
    }
  };

  const getBoardProgress = () => {
    let total = 0;
    let completed = 0;

    data.columns.forEach((column) => {
      total += column.cards.length;

      // You can mark "Done" column as completed
      if (column.title.toLowerCase() === "done") {
        completed += column.cards.length;
      }

      // OR use column.id === 'col-3' if you prefer
    });

    return { total, completed };
  };

  const { total, completed } = getBoardProgress();

  return (
    <div>
      <div className="flex justify-center">
        {total > 0 && (
          <div className="mb-4 px-4">
            <div className="text-sm text-gray-600 mb-1 font-medium">
              Board Progress: {completed}/{total} tasks completed
            </div>
            <div className="h-3 bg-gray-200 rounded overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-300"
                style={{ width: `${(completed / total) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className=" flex justify-center p-4">
        <div className="flex gap-4 flex-wrap">
          {data.columns.map((col) => (
            <Column
              key={col.id}
              column={col}
              data={data}
              setData={setData}
              onEdit={() => setEditingCol(col)}
              onDelete={() => handleDeleteColumn(col.id)}
            />
          ))}
          <button
            onClick={handleAddColumn}
            className="min-w-[250px] h-[80px] border-2 border-dashed rounded text-blue-500"
          >
            + Add Column
          </button>
        </div>
        <div>
          {editingCol && (
            <ColumnModal
              column={editingCol}
              onClose={() => setEditingCol(null)}
              onSave={handleSaveColumn}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
