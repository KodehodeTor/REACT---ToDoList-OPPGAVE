// useState fra REACT
import { useState } from "react";
import { useTodos } from "../context/useTodos";
// NPM pakke som lar os genere unike IDer på en enkel måte.
import { v4 as uuid } from "uuid";

export default function Header() {
  const { addTask, sortOption, setSortOption } = useTodos();
  // useState starter som en tom string.
  const [newTaskName, setNewTaskName] = useState("");

  function handleAddTask(e) {
    //Standard addition for forms som skal ha en submit action:
    e.preventDefault();

    const newTask = {
      name: newTaskName,
      timestamp: new Date(),
      completed: false,
      // npm pakke for id creating
      id: uuid(),
    };
    addTask(newTask);
  }

  return (
    <div>
      <h1>ToDoList</h1>
      <form onSubmit={handleAddTask}>
        {/* e.target referer til seg selv, så henter vi ut value og oppdater newTaskName til hva som står inni input field */}
        <input type="text" onChange={(e) => setNewTaskName(e.target.value)} />
        <button type="subtmit">Submit Task</button>
        {/* Form for å kunne trykke enter og submit */}
      </form>
      {/* Sortering */}
      <select
        name=""
        id=""
        onChange={(e) =>
          // Sort objekt, vi beholder previous, sorter by target value.
          setSortOption((prev) => ({ ...prev, sortBy: e.target.value }))
        }
      >
        {/* Filter */}
        <option value="newest">Newest to Oldest</option>
        <option value="oldest">Oldest to Newest</option>
        <option value="a-to-z">A to Z</option>
        <option value="z-to-a">Z to A</option>
      </select>
      {/* Hide or show completed  */}
      <label htmlFor="hideorshow">
        Hide completed tasks:
        <input
          type="checkbox"
          id="hideorshow"
          checked={sortOption.hideCompleted}
          onChange={(e) =>
            setSortOption((prev) => ({
              ...prev,
              hideCompleted: e.target.checked,
            }))
          }
        />
      </label>
    </div>
  );
}
