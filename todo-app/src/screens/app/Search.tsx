import { LoadingSpinner } from '@components/LoadingSpinner'
import { TodoItem } from '@components/TodoItem'
import {
  Button,
  ButtonText,
  Divider,
  Heading,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  ScrollView,
  VStack,
} from '@gluestack-ui/themed'
import { useTodos } from '@hooks/useTodos'
import { SearchIcon } from 'lucide-react-native'
import { useState } from 'react'

export function Search() {
  const { data: todoData, isLoading, error } = useTodos()
  const [filteredTodos, setFilteredTodos] = useState(todoData!.data)
  const [showOnlyPending, setShowOnlyPending] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')

  function handleSearch(query: string) {
    setSearchQuery(query)
    setFilteredTodos(
      todoData!.data.filter((todo) => todo.title.includes(searchQuery)),
    )
  }

  function handleShowOnlyCompleted() {
    setShowOnlyPending(!showOnlyPending)
    if (showOnlyPending) {
      setFilteredTodos(todoData!.data)
    } else {
      setFilteredTodos(todoData!.data.filter((todo) => !todo.isCompleted))
    }
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error || !todoData) {
    console.error('ops... something went wrong!')
    return <VStack>Error</VStack>
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, marginTop: 64 }}
      showsVerticalScrollIndicator={false}
      bg="$backgroundDark900"
    >
      <VStack flex={1} bg="$backgroundDark900">
        <Heading pl="$5" size="4xl" color="white">
          Search
        </Heading>

        <Divider w="$full" opacity="$5" h={2} bg="white" mb="$4" />

        <Input mx="$4">
          <InputSlot pl="$3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            color="$backgroundDark300"
            placeholder="Search..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </Input>

        <HStack flexDirection="row-reverse" w="$full" px="$6" gap="$3" mt="$4">
          <Button
            size="md"
            variant={showOnlyPending ? 'solid' : 'outline'}
            bg={showOnlyPending ? '$indigo600' : '$backgroundDark900'}
            borderColor={showOnlyPending ? '$indigo600' : '$indigo300'}
            onPress={handleShowOnlyCompleted}
          >
            <ButtonText color={showOnlyPending ? 'white' : '$indigo300'}>
              Show only pending todos{' '}
            </ButtonText>
          </Button>
        </HStack>

        <VStack w="$full" px="$6" gap="$3" flexDirection="column" mt="$4">
          {filteredTodos.map((todo, index) => (
            <VStack key={index} gap="$3">
              <TodoItem todo={todo} />
              <Divider w="$full" opacity="$5" />
            </VStack>
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  )
}
