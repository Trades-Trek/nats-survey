// ** React Imports
import { useEffect } from 'react'
import jwt from 'jsonwebtoken'

// ** Next Import
import { useRouter } from 'next/router'
import authConfig from 'src/configs/auth'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

const AdminGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

      if (storedToken) {
        const {
          payload: { user_type }
        } = jwt.decode(storedToken, { complete: true })

        if (user_type !== 'admin') {
          router.replace({
            pathname: '/login',
         
          })
        }
      } else {
        router.replace({
          pathname: '/login',
        
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )
  
return <>{children}</>
}

export default AdminGuard
