import { Divider, VStack } from "@gluestack-ui/themed";
import { useTodos } from "@hooks/useTodos";
import { LoadingSpinner } from "./LoadingSpinner";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !todos) {
    console.error("ops... something went wrong!");
    return <VStack>Error</VStack>;
  }

  return (
    <VStack w="$full" px="$6" gap="$4" flexDirection="column">
      {todos.data.map((todo, index) => (
        <>
          <TodoItem key={index} todo={todo} />
          <Divider w="$full" opacity="$5" />
        </>
      ))}
      {}
    </VStack>
  );
}
