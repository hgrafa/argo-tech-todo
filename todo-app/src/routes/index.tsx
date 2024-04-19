import { NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useAuth } from "@contexts/AuthContext";
import { Loading } from "@components/Loading";

export function Routes() {
  const { user, isLoadingUserStorage } = useAuth();

  if (isLoadingUserStorage) return <Loading />;

  console.log("user from routes: ", user);

  return (
    <NavigationContainer>
      {user?.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}