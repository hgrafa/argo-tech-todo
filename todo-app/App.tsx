import { StatusBar, Text, View } from "react-native";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { Routes } from "@routes/index";
import { AuthContextProvider } from "@contexts/AuthContext";
import { LoadingSpinner } from "@components/LoadingSpinner";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <LoadingSpinner />}
      </AuthContextProvider>
    </GluestackUIProvider>
  );
}
