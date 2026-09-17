import { TodoContext } from "./TodoContext";
import { useState } from "react";

export default function TodoProvider({ children }) {
  const [todoData, setToDoData] = useState(() => {
    const savedData = localStorage.getItem("todoData");

    // Når vi stringify toDoData så klarer den ikke å hente ut date objektet grunnet kompleksistet. Som løsning så redefiner vi timestamp som new Date.
    return savedData
      ? JSON.parse(savedData).map((task) => ({
          ...task,
          timestamp: new Date(task.timestamp),
        }))
      : [];
  });

  //  Sort state: Når en endring foregår så lagrer vi til LS.
  const [sortOption, setSortOption] = useState(() => {
    const savedSort = localStorage.getItem("sortOption");
    // Dersom savedSort er undefined så gjør vi om verdiene på sortBy til newest og hideCompleted blir satt som false.
    return JSON.parse(savedSort) || { sortBy: "newest", hideCompleted: false };
  });

  //New task function.
  function addTask(newTask) {
    setToDoData((prev) => [...prev, newTask]);
  }

  // Delete task function, oppdaterer setToDoData, men kun uten IDen som vi velger. (Task ID matcher ikke så den blir tatt ut)
  function deleteTask(id) {
    setToDoData((prev) => prev.filter((task) => task.id !== id));
  }

  //Edit task function, trenger ID for å vite hvilken task som skal oppdateres. Så trenger vi dataen som skal oppdateres inn. Mapper over previous state som er task. Ternary; Hvis task ID er samme ID som vi har sendt til funksjon = return et nytt objekt der vi henter ut ...spreaded task og legger til updated task. Og om ID ikke matcher så skal task være uendret.

  function editTask(id, updatedTask) {
    setToDoData((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)),
    );
  }

  return (
    <TodoContext.Provider
      value={{
        todoData,
        addTask,
        deleteTask,
        editTask,
        sortOption,
        setSortOption,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
