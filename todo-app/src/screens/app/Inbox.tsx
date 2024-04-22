import { CreateTodoActiveSheet } from '@components/CreateTodoActiveSheet'
import { TodoList } from '@components/TodoList'
import {
  Button,
  ButtonIcon,
  Divider,
  Heading,
  ScrollView,
  VStack,
} from '@gluestack-ui/themed'
import { PlusIcon } from 'lucide-react-native'
import { useState } from 'react'

export function Inbox() {
  const [showActionsheet, setShowActionsheet] = useState(false)

  const toggleActionsheet = () => setShowActionsheet(!showActionsheet)

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, marginTop: 64 }}
        showsVerticalScrollIndicator={false}
        bg="$backgroundDark900"
      >
        <VStack flex={1} bg="$backgroundDark900">
          <Heading pl="$5" size="4xl" color="white">
            Inbox
          </Heading>

          <Divider w="$full" opacity="$5" h={2} bg="white" mb="$4" />

          <TodoList />
        </VStack>
        <CreateTodoActiveSheet
          showActionsheet={showActionsheet}
          toggleActionsheet={toggleActionsheet}
        />
      </ScrollView>

      <Button
        borderRadius="$full"
        h="$16"
        w="$16"
        bg="$indigo600"
        borderColor="$indigo600"
        onPress={toggleActionsheet}
        position="absolute"
        bottom="$8"
        right="$8"
        shadowOffset={{
          width: 2,
          height: 2,
        }}
        shadowOpacity="$30"
        shadowRadius="$3"
        shadowColor="$backgroundDark900"
      >
        <ButtonIcon as={PlusIcon} style={{ width: 28, height: 28 }} />
      </Button>
    </>
  )
}
