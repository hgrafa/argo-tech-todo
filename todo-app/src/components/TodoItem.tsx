import { Todo } from '@dtos/todo'
import {
  Button,
  ButtonText,
  CloseIcon,
  HStack,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pressable,
  Text,
} from '@gluestack-ui/themed'
import { api } from '@utils/api'
import { CheckIcon, FileTextIcon } from 'lucide-react-native'
import { useState } from 'react'
import { useSWRConfig } from 'swr'

import { EditTodoActiveSheet } from './EditTodoActiveSheet'

export interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo: todoProps }: TodoItemProps) {
  const [todo, setTodo] = useState(todoProps)
  const { id, title, description, isCompleted } = todo
  const [completed, setCompleted] = useState(isCompleted)
  const [showModal, setShowModal] = useState(false)
  const [showEdition, setShowEdition] = useState(false)

  const { mutate } = useSWRConfig()

  async function toggleCompleted() {
    setCompleted(!completed)
    await api.patch(`/v1/todos/${id}/complete`)
    mutate('/v1/todos')
  }

  function toggleEditTodo() {
    setShowEdition(!showEdition)
  }

  async function handleDeleteTodo() {
    setShowModal(false)
    await api.delete(`/v1/todos/${id}`)
    mutate('/v1/todos')
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
      <Pressable
        onPress={() => setShowModal(true)}
        flexDirection="row"
        alignItems="center"
        w="$full"
      >
        <Text size="lg" color="$backgroundDark300" mr="$2">
          {title}
        </Text>
        {description && <FileTextIcon size={18} color="white" opacity={0.5} />}
      </Pressable>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <ModalBackdrop />
        <ModalContent bg="$backgroundDark900">
          <ModalHeader>
            <Text size="2xl" bold color="white">
              {' '}
            </Text>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text size="2xl" bold color="white">
              {title}
            </Text>
            <Text size="sm" mt="$3">
              {description || 'Add a description...'}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={toggleEditTodo}
            >
              <ButtonText>Edit</ButtonText>
            </Button>
            <Button
              size="sm"
              action="primary"
              borderWidth="$0"
              onPress={handleDeleteTodo}
              bg="$error700"
              $hover-bg="$error800"
              $active-bg="$error900"
            >
              <ButtonText>Delete</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <EditTodoActiveSheet
        showActionsheet={showEdition}
        toggleActionsheet={toggleEditTodo}
        setTodo={setTodo}
        todo={todo}
      />
    </HStack>
  )
}
