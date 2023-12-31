// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'
import authConfig from 'src/configs/auth'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

const GuestGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  console.log('inside guest gaurd')
  useEffect(() => {
    if (!router.isReady) {
      return
    }

     // as a guest page you should not have token
    if (window.localStorage.getItem(authConfig.storageTokenKeyName)) {
      router.replace('/dashboard')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])
  if (auth.loading || (!auth.loading && auth.user !== null)) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
