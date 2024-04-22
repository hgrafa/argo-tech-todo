import { Divider, VStack } from '@gluestack-ui/themed'
import { useTodos } from '@hooks/useTodos'

import { LoadingSpinner } from './LoadingSpinner'
import { TodoItem } from './TodoItem'

export function TodoList() {
  const { data: todos, isLoading, error } = useTodos()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error || !todos) {
    console.error('ops... something went wrong!')
    return <VStack>Error</VStack>
  }

  return (
    <VStack w="$full" px="$6" gap="$3" flexDirection="column">
      {todos.data.map((todo, index) => (
        <VStack key={index} gap="$3">
          <TodoItem todo={todo} />
          <Divider w="$full" opacity="$5" />
        </VStack>
      ))}
      {}
    </VStack>
  )
}
