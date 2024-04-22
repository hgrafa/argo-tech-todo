import { LoadingSpinner } from '@components/LoadingSpinner'
import { useAuth } from '@contexts/AuthContext'
import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  const { user, isLoadingUserStorage } = useAuth()

  if (isLoadingUserStorage) return <LoadingSpinner />

  return (
    <NavigationContainer>
      {user?.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
