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
  createTodo: (todo: TodoDTO) => void;
  updateTodo: (todo: TodoDTO) => void;
  deleteTodo: (id: number) => void;
};

export const TodosContext = createContext<TodoContextProps>(
  {} as TodoContextProps
);

export function TodosContextProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<TodoDTO[]>([]);

  function createTodo(todo: TodoDTO) {
    setTodos([...todos, todo]);
  }

  function updateTodo(todo: TodoDTO) {
    const todoIndex = todos.findIndex((t) => t.id === todo.id);
    if (todoIndex !== -1) {
      const newTodos = [...todos];
      newTodos[todoIndex] = todo;
      setTodos(newTodos);
    }
  }

  function deleteTodo(id: number) {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  }

  async function loadTodos() {
    try {
      const { data: response } = await api.get("/v1/todos");

      console.log(response);

      if (response.data) {
        setTodos(response.data);
      }
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    loadTodos().then(() => console.log("todos: ", todos));
  }, []);

  return (
    <TodosContext.Provider
      value={{ todos, createTodo, updateTodo, deleteTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export const useTodos = () => useContext(TodosContext);
