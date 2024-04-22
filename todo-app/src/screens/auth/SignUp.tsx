import { useAuth } from '@contexts/AuthContext'
import {
  Button,
  ButtonSpinner,
  ButtonText,
  Center,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { api } from '@utils/api'
import { EyeIcon, EyeOffIcon, SquareCheckBig } from 'lucide-react-native'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const SignUpSchema = z
  .object({
    name: z.string(),
    email: z.string().email('Email is required.'),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(
    ({ password, confirmPassword }) => {
      return password === confirmPassword
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    },
  )

type SignUpInputs = z.infer<typeof SignUpSchema>

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)

  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting, isValid },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(SignUpSchema),
  })

  const { signIn } = useAuth()

  function toggleShowPassword() {
    setShowPassword((prev) => !prev)
  }

  function handleGoBackToSignIn() {
    navigation.goBack()
  }

  async function handleSignUp({ name, email, password }: SignUpInputs) {
    const { data } = await api.post('/register', { name, email, password })
    console.log(data)
    await signIn(email, password)
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$backgroundDark900"
    >
      <VStack flex={1} pb="$4">
        <Center mt="$32" mb="$8" flexDirection="column" gap="$0.5">
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
            <Text lineHeight="$sm">Name</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  borderColor="$backgroundDark500"
                  $focus-borderColor="$indigo400"
                  $invalid-borderColor="$red500"
                  h="$12"
                  px="$1"
                  size="md"
                  w="$full"
                  isInvalid={isSubmitted && !!errors.name}
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
                    type={showPassword ? 'text' : 'password'}
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

          <VStack space="sm">
            <Text lineHeight="$xs">Confirm Password</Text>
            <Controller
              control={control}
              name="confirmPassword"
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
                    type={showPassword ? 'text' : 'password'}
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
            my="$1"
            onPress={handleSubmit(handleSignUp)}
            isDisabled={isSubmitting || !isValid}
          >
            <ButtonText color="$white">Create your Account</ButtonText>
            {isSubmitting && <ButtonSpinner ml="$1" />}
          </Button>
          <Button
            h="$12"
            variant="outline"
            w="$full"
            borderColor="$indigo500"
            onPress={handleGoBackToSignIn}
            isDisabled={isSubmitting}
          >
            <ButtonText color="$white">
              Already have an Account? Sign in
            </ButtonText>
          </Button>
        </Center>
      </VStack>
    </ScrollView>
  )
}
