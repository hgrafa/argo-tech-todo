import { TodoDTO } from "@dtos/todoDTO";
import { Box, HStack, Pressable, Text } from "@gluestack-ui/themed";
import { api } from "@services/api";
import { CheckIcon, FileTextIcon } from "lucide-react-native";
import { useState } from "react";

export interface TodoItemProps {
  todo: TodoDTO;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { id, title, description, isCompleted } = todo;
  const [completed, setCompleted] = useState(isCompleted);

  async function toggleCompleted() {
    setCompleted(!completed);
    await api.patch(`/v1/todos/${id}/complete`);
  }

  return (
    <HStack alignItems="center">
      {completed ? (
        <Pressable
          w="$5"
          h="$5"
          borderWidth="$1"
          borderColor="$backgroundDark500"
          borderRadius="$full"
          bg="$backgroundDark500"
          mr="$1.5"
          alignItems="center"
          justifyContent="center"
          onPress={toggleCompleted}
        >
          <CheckIcon color="white" size={14} strokeWidth={3} />
        </Pressable>
      ) : (
        <Pressable
          w="$5"
          h="$5"
          borderWidth="$1"
          borderColor="$white"
          borderRadius="$full"
          bg="transparent"
          mr="$1.5"
          onPress={toggleCompleted}
        ></Pressable>
      )}
      <Text size="lg" color="$backgroundDark300" mr="$2">
        {title}
      </Text>
      {description && <FileTextIcon size={18} color="white" opacity={0.5} />}
    </HStack>
  );
}
