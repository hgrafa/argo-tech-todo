import { useAuth } from '@contexts/AuthContext'
import {
  Button,
  ButtonText,
  Center,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { CircleUserRoundIcon } from 'lucide-react-native'

export function Profile() {
  const { user, signOut } = useAuth()

  const { email, name } = user!

  async function handleLogOut() {
    await signOut()
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$backgroundDark900"
    >
      <VStack flex={1} bg="$backgroundDark900" px="$4" gap="$8">
        <Center mt="$48">
          <Text fontSize="$xl" fontWeight="bold">
            Profile
          </Text>
        </Center>
        <Center my="$12">
          <CircleUserRoundIcon size={100} color="#D4D4D4" />
        </Center>

        <Center gap="$4">
          <Text fontSize="$lg">Name: {name}</Text>
          <Text fontSize="$lg">Email: {email}</Text>
        </Center>

        <Button
          h="$12"
          w="$full"
          backgroundColor="$error700"
          onPress={handleLogOut}
        >
          <ButtonText color="$white">Log out</ButtonText>
        </Button>
      </VStack>
    </ScrollView>
  )
}
