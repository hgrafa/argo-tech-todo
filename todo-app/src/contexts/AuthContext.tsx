import { UserDTO } from "@dtos/userDTO";
import { api } from "@services/api";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";

import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";

export type AuthContextProps = {
  user: UserDTO | undefined;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorage: boolean;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true);

  async function userAndTokenUpdate(user: UserDTO, accessToken: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    setUser(user);
  }

  async function storageUserAndToken(userData: UserDTO, accessToken: string) {
    try {
      setIsLoadingUserStorage(true);
      await storageUserSave(userData);
      await storageAuthTokenSave({ accessToken });
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/login", {
        email,
        password,
      });

      if (data.accessToken && data.user) {
        await storageUserAndToken(data.user, data.accessToken);
        userAndTokenUpdate(data.user, data.accessToken);
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorage(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet();
      const { accessToken } = await storageAuthTokenGet();

      if (accessToken && userLogged) {
        userAndTokenUpdate(userLogged, accessToken);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  useEffect(() => {
    loadUserData().then(() => console.log("user: ", user));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, isLoadingUserStorage }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
