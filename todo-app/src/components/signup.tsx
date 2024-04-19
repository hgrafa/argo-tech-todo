import {
  Button,
  ButtonText,
  Center,
  Heading,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { EyeIcon, EyeOffIcon, SquareCheckBig } from "lucide-react-native";
import { useState } from "react";

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$backgroundDark900"
    >
      <VStack flex={1} pb="$4">
        <Center mt="$48" mb="$8" flexDirection="column" gap="$0.5">
          <Center flexDirection="row" gap="$4">
            <SquareCheckBig color="#FFF" size={50} />
            <Text size="5xl" bold color="$white">
              Todo.it
            </Text>
          </Center>
          <Text size="sm">boost your productivity</Text>
        </Center>

        <Center
          w="$full"
          flexDirection="column"
          alignItems="flex-start"
          px="$4"
          gap="$5"
        >
          <VStack space="xs">
            <Text lineHeight="$sm">Name</Text>
            <Input
              borderColor="$backgroundDark500"
              $focus-borderColor="$indigo400"
              h="$12"
              px="$1"
              size="md"
              w="$full"
            >
              <InputField color="white" type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text lineHeight="$sm">Email</Text>
            <Input
              borderColor="$backgroundDark500"
              $focus-borderColor="$indigo400"
              h="$12"
              px="$1"
              size="md"
              w="$full"
            >
              <InputField color="white" type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text lineHeight="$xs">Password</Text>
            <Input
              borderColor="$backgroundDark500"
              $focus-borderColor="$indigo400"
              h="$12"
              px="$1"
              size="md"
              w="$full"
            >
              <InputField
                color="white"
                type={showPassword ? "text" : "password"}
              />
              <InputSlot pr="$3" onPress={toggleShowPassword}>
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  color="$indigo500"
                />
              </InputSlot>
            </Input>
          </VStack>

          <Button bg="$indigo500" h="$12" w="$full">
            <ButtonText color="$white">Create your Account</ButtonText>
          </Button>
          <Button h="$12" variant="outline" w="$full" borderColor="$indigo500">
            <ButtonText color="$white">
              Already have an Account? Sign in
            </ButtonText>
          </Button>
        </Center>
      </VStack>
    </ScrollView>
  );
}
