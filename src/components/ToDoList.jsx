import ToDoItem from "./ToDoItem.jsx";

export default function ToDoList({
  data: { sortedData, deleteTask, editTask },
}) {
  if (sortedData.length === 0) {
    return <h3>No tasks. Please add one to begin</h3>;
  }
  return (
    <ul>
      {sortedData.map((task) => {
        // Vi bruker uuid for å lage key. Vi må sende task data til toDoItem ved å skrive data=
        return <ToDoItem key={task.id} data={{ task, deleteTask, editTask }} />;
      })}
    </ul>
  );
}
