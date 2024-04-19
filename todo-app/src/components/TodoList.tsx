import { useTodos } from "@contexts/TodosContext";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  VStack,
} from "@gluestack-ui/themed";

export function TodoList() {
  const { todos } = useTodos();

  return (
    <VStack mt="$24" flex={1} gap="$3" flexDirection="column">
      {todos.map(({ id, title }) => (
        <Checkbox
          key={id}
          size="md"
          isInvalid={false}
          isDisabled={false}
          value={title}
        >
          <CheckboxIndicator mr="$2">
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>{title}</CheckboxLabel>
        </Checkbox>
      ))}
    </VStack>
  );
}
