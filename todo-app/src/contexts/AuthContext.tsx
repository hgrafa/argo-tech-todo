import { User } from '@dtos/user'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@storage/storageAuthToken'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser'
import { api } from '@utils/api'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export type AuthContextProps = {
  user: User | undefined
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoadingUserStorage: boolean
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
)

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({} as User)
  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true)

  async function userAndTokenUpdate(user: User, accessToken: string) {
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    setUser(user)
  }

  async function storageUserAndToken(userData: User, accessToken: string) {
    setIsLoadingUserStorage(true)

    await storageUserSave(userData)
    await storageAuthTokenSave({ accessToken })

    setIsLoadingUserStorage(false)
  }

  async function signIn(email: string, password: string) {
    const { data } = await api.post('/v1/login', {
      email,
      password,
    })

    if (data.accessToken && data.user) {
      await storageUserAndToken(data.user, data.accessToken)
      userAndTokenUpdate(data.user, data.accessToken)
    }
  }

  async function signOut() {
    setIsLoadingUserStorage(true)
    setUser({} as User)

    await api.post('/v1/logout')

    await storageUserRemove()
    await storageAuthTokenRemove()

    setIsLoadingUserStorage(false)
  }

  async function loadUserData() {
    const userLogged = await storageUserGet()
    const { accessToken } = await storageAuthTokenGet()

    if (accessToken && userLogged) {
      userAndTokenUpdate(userLogged, accessToken)
    }

    setIsLoadingUserStorage(false)
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, isLoadingUserStorage }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
