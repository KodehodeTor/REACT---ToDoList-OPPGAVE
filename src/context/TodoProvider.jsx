import { TodoContext } from "./TodoContext";

export default function TodoProvider({ children }) {
  return <TodoContext.Provider value={{}}>{children}</TodoContext.Provider>;
}
