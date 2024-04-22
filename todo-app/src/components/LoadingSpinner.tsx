import { Center, Spinner } from "@gluestack-ui/themed";

export function LoadingSpinner() {
  return (
    <Center flex={1} bg="$backgroundDark900">
      <Spinner color="$indigo600" size="large" />
    </Center>
  );
}
