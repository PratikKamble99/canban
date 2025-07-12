export const saveData = (data) => {
  localStorage.setItem("kanban-data", JSON.stringify(data));
};

export const loadData = () => {
  const data = localStorage.getItem("kanban-data");
  return data ? JSON.parse(data) : null;
};
