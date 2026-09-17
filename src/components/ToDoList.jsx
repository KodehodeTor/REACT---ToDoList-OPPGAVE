import ToDoItem from "./ToDoItem.jsx";
import { useTodos } from "../context/useTodos.js";

export default function ToDoList() {
  const { sortedData } = useTodos();
  if (sortedData.length === 0) {
    return <h3>No tasks. Please add one to begin</h3>;
  }
  return (
    <ul>
      {sortedData.map((task) => {
        // Vi bruker uuid for å lage key. Vi må sende task data til toDoItem ved å skrive data=
        return <ToDoItem key={task.id} task={task} />;
      })}
    </ul>
  );
}
