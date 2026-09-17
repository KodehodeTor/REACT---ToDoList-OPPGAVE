import { useContext } from "react";
import ToDoList from "./components/ToDoList.jsx";
import Header from "./components/Header.jsx";
import { TodoContext } from "./context/TodoContext.jsx";

function App() {
  const { sortedData } = useContext(TodoContext);

  return (
    <>
      <Header />
      <ToDoList data={{ sortedData }} />
    </>
  );
}

export default App;
