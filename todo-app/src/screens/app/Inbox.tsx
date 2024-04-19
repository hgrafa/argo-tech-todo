import { TodoList } from "@components/TodoList";
import { Center, Text } from "@gluestack-ui/themed";

export function Inbox() {
  return (
    <Center flex={1} bg="$backgroundDark900">
      <TodoList />
    </Center>
  );
}
