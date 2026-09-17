import { useState, useContext } from "react";
import ToDoList from "./components/ToDoList.jsx";
import Header from "./components/Header.jsx";
import { TodoContext } from "./context/TodoContext.jsx";

function App() {
  const { todoData, sortOption } = useContext(TodoContext);

  //Lager en variabel som er en kopi av vår toDoData(..) men vi tar et filter på som sørger for at vi filtrerer det som er checked. Deretter adder vi .sort.
  const sortedData = [...todoData]
    .filter((task) => !task.completed || !sortOption.hideCompleted)
    // A og B representerer hva som skal bli sorted i forhold til hva.
    .sort((a, b) => {
      switch (sortOption.sortBy) {
        case "a-to-z":
          return a.name.localeCompare(b.name);
        case "z-to-a":
          return b.name.localeCompare(a.name);
        case "oldest":
          return a.timestamp - b.timestamp;
        case "newest":
          return b.timestamp - a.timestamp;
      }
    });

  return (
    <>
      {/* Vi sender sortOption og setSortOption til Header */}
      <Header />
      {/* Vi sender todoData, editTask og deleteTask til ToDoList data */}
      <ToDoList data={{ sortedData }} />
    </>
  );
}

export default App;
