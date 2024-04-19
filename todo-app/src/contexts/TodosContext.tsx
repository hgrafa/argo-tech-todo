import { TodoDTO } from "@dtos/todoDTO";
import { api } from "@services/api";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type TodoContextProps = {
  todos: TodoDTO[];
};

export const TodosContext = createContext<TodoContextProps>(
  {} as TodoContextProps
);

export function TodosContextProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<TodoDTO[]>([]);

  async function loadTodos() {
    try {
      const { data: response } = await api.get("/v1/todos");

      if (response.data) {
        setTodos(response.data as TodoDTO[]);
        console.log("from load:", todos);
      }
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <TodosContext.Provider value={{ todos }}>{children}</TodosContext.Provider>
  );
}

export const useTodos = () => useContext(TodosContext);
