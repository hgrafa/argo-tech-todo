import { Todo } from '@dtos/todo'
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
} from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@utils/api'
import { SendIcon } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import { z } from 'zod'

interface EditTodoActiveSheetProps {
  showActionsheet: boolean
  toggleActionsheet: () => void
  setTodo: (todo: Todo) => void
  todo: Todo
}

const EditTodoSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
})

type EditTodoInputs = z.infer<typeof EditTodoSchema>

export function EditTodoActiveSheet({
  showActionsheet,
  toggleActionsheet,
  setTodo,
  todo,
}: EditTodoActiveSheetProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditTodoInputs>({
    resolver: zodResolver(EditTodoSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description,
    },
  })

  const { mutate } = useSWRConfig()

  async function handleEditTodo(editedTodo: EditTodoInputs) {
    toggleActionsheet()

    let editRequestBody = {}

    if (editedTodo.title)
      editRequestBody = { ...editRequestBody, title: editedTodo.title }

    if (editedTodo.description)
      editRequestBody = {
        ...editRequestBody,
        description: editedTodo.description,
      }

    console.log(editRequestBody)

    await api.patch(`/v1/todos/${todo.id}`, editRequestBody)

    if (editedTodo.title) todo.title = editedTodo.title

    if (editedTodo.description) todo.description = editedTodo.description

    setTodo(todo)
    mutate('/v1/todos')
    reset()
  }

  return (
    <Actionsheet isOpen={showActionsheet} onClose={toggleActionsheet}>
      <KeyboardAvoidingView
        behavior="position"
        style={{
          position: 'relative',
          flex: 1,
          justifyContent: 'flex-end',
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
              onPress={handleSubmit(handleEditTodo)}
              isDisabled={!!errors?.title}
            >
              <ButtonIcon as={SendIcon}></ButtonIcon>
            </Button>
          </VStack>
        </ActionsheetContent>
      </KeyboardAvoidingView>
    </Actionsheet>
  )
}
