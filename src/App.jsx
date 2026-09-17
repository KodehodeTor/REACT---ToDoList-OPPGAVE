import { useState, useContext } from "react";
import ToDoList from "./components/ToDoList.jsx";
import Header from "./components/Header.jsx";
import { TodoContext } from "./context/TodoContext.jsx";

function App() {
  const { sortedData } = useContext(TodoContext);

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
