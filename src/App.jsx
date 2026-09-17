import ToDoList from "./components/ToDoList.jsx";
import Header from "./components/Header.jsx";
import { useTodos } from "./context/useTodos.js";

function App() {
  const { sortedData } = useTodos();

  return (
    <>
      <Header />
      <ToDoList data={{ sortedData }} />
    </>
  );
}

export default App;
