// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'
import authConfig from 'src/configs/auth'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

const AuthGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

    
      if (auth.user === null && !window.localStorage.getItem(authConfig.storageTokenKeyName)) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/login',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )
  if (auth.loading || auth.user === null) {
    console.log('auth is null or loading')
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
