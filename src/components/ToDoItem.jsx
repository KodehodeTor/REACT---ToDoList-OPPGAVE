import { useState } from "react";
import { useTodos } from "../context/useTodos";

export default function ToDoItem({ task }) {
  const { editTask, deleteTask } = useTodos();
  //VI ønsker en state som sjekker om input field er ReadOnly. Den starter som true (ReadOnly)
  const [isReadOnly, setIsReadOnly] = useState(true);
  // Den starter som navnet den får fra task data.
  const [updatedTaskName, setUpdatedTaskName] = useState(task.name);
  function changeCompleted() {
    // Toggle for task completed så vi kan skru den av og på. (complete flip)
    editTask(task.id, { ...task, completed: !task.completed });
  }

  // Går inn i timestamp i task objektet, som gjør dato til string, "en-GB" er locale format regler. (British English formatting)
  const formattedTime = task.timestamp.toLocaleString("en-GB");
  function handleEdit() {
    //Hvis ikke ReadOnly. Update task / edit. Når vi går i mellom task list, velger id og når editTask blir aktivert så henter vi oppdatert taskname og resetter det. Vi linker text input til state med en onChange.
    if (!isReadOnly) {
      editTask(task.id, { ...task, name: updatedTaskName });
    }
    //Vi flipper knappen fra edit til save (om den var ReadOnly) og visa versa.
    setIsReadOnly((prev) => !prev);
  }

  return (
    <li>
      {/* Checkbox med onCheck handler */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={changeCompleted}
      />

      <p>{formattedTime}</p>
      {/* Input field er fra start readOnly true så man ikke kan endre på den før man trykker på edit. Set updated taskname til {event} target.value */}
      <input
        type="text"
        value={updatedTaskName}
        readOnly={isReadOnly}
        onChange={(e) => setUpdatedTaskName(e.target.value)}
      />
      {/* Handle edit er litt mer involvert enn delete og trenger en egen funksjon. Vi setter JS i navnet på knappen for isReadONly flip (save/edit) */}
      <button onClick={handleEdit}>{isReadOnly ? "Edit" : "Save"}</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}
