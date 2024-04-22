import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Button,
  ButtonIcon,
  FormControl,
  Input,
  InputField,
  KeyboardAvoidingView,
  VStack,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTodos } from "@hooks/useTodos";
import { api } from "@services/api";

import { SendIcon } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { z } from "zod";

interface CreateTodoActiveSheetProps {
  showActionsheet: boolean;
  toggleActionsheet: () => void;
}

const NewTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

type NewTodoInputs = z.infer<typeof NewTodoSchema>;

export function CreateTodoActiveSheet({
  showActionsheet,
  toggleActionsheet,
}: CreateTodoActiveSheetProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isValidating },
  } = useForm<NewTodoInputs>({
    resolver: zodResolver(NewTodoSchema),
  });

  const { mutate } = useSWRConfig();

  async function handleNewTodo(newTodo: NewTodoInputs) {
    toggleActionsheet();
    await api.post("/v1/todos", newTodo);
    mutate("/v1/todos");
    reset();
  }

  return (
    <Actionsheet isOpen={showActionsheet} onClose={toggleActionsheet}>
      <KeyboardAvoidingView
        behavior="position"
        style={{
          position: "relative",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent maxHeight="75%" bg="$backgroundDark900" mb="$8">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <VStack w="$full" gap="$6" mb="$10">
            <FormControl mt="$8" gap="$2">
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, value } }) => (
                  <Input w="$full" borderWidth="$0">
                    <InputField
                      overflow="hidden"
                      onChangeText={onChange}
                      value={value}
                      fontWeight="bold"
                      fontSize="$xl"
                      color="white"
                      placeholder="Create a task"
                    />
                  </Input>
                )}
              />
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <Input w="$full" borderWidth="$0">
                    <InputField
                      onChangeText={onChange}
                      value={value}
                      color="white"
                      placeholder="Add a description..."
                    />
                  </Input>
                )}
              />
            </FormControl>
            <Button
              borderRadius="$full"
              size="lg"
              p="$3.5"
              bg="$indigo600"
              borderColor="$indigo600"
              onPress={handleSubmit(handleNewTodo)}
              isDisabled={!isValid || isValidating}
            >
              <ButtonIcon as={SendIcon}></ButtonIcon>
            </Button>
          </VStack>
        </ActionsheetContent>
      </KeyboardAvoidingView>
    </Actionsheet>
  );
}
