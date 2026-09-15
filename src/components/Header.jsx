// useState fra REACT
import { useState } from "react";
// NPM pakke som lar os genere unike IDer på en enkel måte.
import { v4 as uuid } from "uuid";

export default function Header({
    data: { addTask, setSortOption, sortOption},
})
// useState starter som en tom string.
const [newTaskName, setNewTaskName] = useState("")

function handleAddTask(e) {
    //Standard addition for forms som skal ha en submit action:
    e.preventDefault();

    const newTask = {
        name: newTaskName,
        timestamp: new Date(),
        completed: false,
        // npm pakke for id creating
        id: uuid()
    };
addTask(newTask)
}

return ( 
    <>
    </>
)