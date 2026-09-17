import { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList.jsx";
import Header from "./components/Header.jsx";

function App() {
  // Vi lager en callback funksjon til useState så det blir initial state på useState. Dette er for LocalStorage.

  const [todoData, setToDoData] = useState(() => {
    const savedData = localStorage.getItem("todoData");
    // Finnes det noe i LocalStorage ? Hvis den er, lagre. Om ikke lager vi et tomt array.

    // Når vi stringify toDoData så klarer den ikke å hente ut date objektet grunnet kompleksistet. Som løsning så redefiner vi timestamp som new Date.
    return savedData
      ? JSON.parse(savedData).map((task) => ({
          ...task,
          timestamp: new Date(task.timestamp),
        }))
      : [];
  });

  // Noe av den samme logikken for sort for LocalStorage. Når en endring foregår så lagrer vi til LS.
  const [sortOption, setSortOption] = useState(() => {
    const savedSort = localStorage.getItem("sortOption");
    // Dersom savedSort er undefined så gjør vi om verdiene på sortBy til newest og hideCompleted blir satt som false.
    return JSON.parse(savedSort) || { sortBy: "newest", hideCompleted: false };
  });

  //Vi linker useEffect til state, todoData og sortOption. Så hver gang noe blir endret så blir useEffect brukt som gir oss en mulighet til å lagre til localStorage. Update data = lagre. Vi trenger deretter å rendre det som er lagt til i LS.
  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData));
    localStorage.setItem("sortOption", JSON.stringify(sortOption));
  }, [todoData, sortOption]);
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
      <Header data={{ addTask, sortOption, setSortOption }} />
      {/* Vi sender todoData, editTask og deleteTask til ToDoList data */}
      <ToDoList data={{ sortedData, editTask, deleteTask }} />
    </>
  );
}

export default App;
