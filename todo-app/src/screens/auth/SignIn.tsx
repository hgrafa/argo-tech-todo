import {
  Button,
  ButtonSpinner,
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

import { useNavigation } from "@react-navigation/native";
import { AuthNagivatorRoutesProps } from "@routes/auth.routes";
import { EyeIcon, EyeOffIcon, SquareCheckBig } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@contexts/AuthContext";

const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

type SignInInputs = z.infer<typeof SignInSchema>;

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<AuthNagivatorRoutesProps>();

  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<SignInInputs>({
    resolver: zodResolver(SignInSchema),
  });

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  async function handleSignIn({ email, password }: SignInInputs) {
    await signIn(email, password);
  }

  function handleSignUp() {
    navigation.navigate("signUp");
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$backgroundDark900"
    >
      <VStack flex={1} pb="$4">
        <Center mt="$56" mb="$8" flexDirection="column" gap="$0.5">
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
          gap="$4"
        >
          <VStack space="sm">
            <Text lineHeight="$sm">Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  borderColor="$backgroundDark500"
                  $focus-borderColor="$indigo400"
                  $invalid-borderColor="$red500"
                  h="$12"
                  px="$1"
                  size="md"
                  w="$full"
                  isInvalid={isSubmitted && !!errors.email}
                >
                  <InputField
                    onChangeText={onChange}
                    value={value}
                    color="white"
                    type="text"
                  />
                </Input>
              )}
            />
          </VStack>

          <VStack space="sm">
            <Text lineHeight="$xs">Password</Text>

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  borderColor="$backgroundDark500"
                  $focus-borderColor="$indigo400"
                  $invalid-borderColor="$red500"
                  h="$12"
                  px="$1"
                  size="md"
                  w="$full"
                  isInvalid={isSubmitted && !!errors.password}
                >
                  <InputField
                    onChangeText={onChange}
                    value={value}
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
              )}
            />
          </VStack>

          <Button
            bg="$indigo500"
            h="$12"
            w="$full"
            onPress={handleSubmit(handleSignIn)}
            isDisabled={isSubmitting}
          >
            <ButtonText color="$white">Sign in</ButtonText>
            {isSubmitting && <ButtonSpinner ml="$1" />}
          </Button>
          <Button
            h="$12"
            variant="outline"
            w="$full"
            borderColor="$indigo500"
            onPress={handleSignUp}
            isDisabled={isSubmitting}
          >
            <ButtonText color="$white">
              Dont't have an Account? Sign up
            </ButtonText>
          </Button>
        </Center>
      </VStack>
    </ScrollView>
  );
}
