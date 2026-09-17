import { TodoContext } from "./TodoContext";
import { useState } from "react";

export default function TodoProvider({ children }) {
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

  return (
    <TodoContext.Provider value={{ todoData }}>{children}</TodoContext.Provider>
  );
}
