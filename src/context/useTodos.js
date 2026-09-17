import { useContext } from "react";
import { TodoContext } from "./TodoContext";

export function useTodos() {
  return useContext(TodoContext);
}
