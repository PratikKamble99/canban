import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import initialData from "./data/data";
import { loadData, saveData } from "./utils/localStorage";

const App = () => {
  const [data, setData] = useState(loadData() || initialData);

  useEffect(() => {
    saveData(data);
  }, [data]);

  return (
    <div>
      <h1 className="text-3xl text-center py-4">TaskTrek</h1>
      <Board data={data} setData={setData} />;
    </div>
  );
};

export default App;
