// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'
import { userService } from 'src/services'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

      // if (!storedToken) {
      //   // // no token in local storage

      //   if (router.asPath !== '/') {
      //     //not on the landing page
      //     router.replace({
      //       pathname: '/login', //redirect to login page
      //       query: { returnUrl: router.asPath }
      //     })
      //   }
      // }

      if (storedToken) {
        if (router.asPath === '/') {
          router.push('/dashboard')
        }

        setLoading(true)

        await userService
          .userInfo()
          .then(async response => {
            setLoading(false)
            setUser(response.data.user)
          })
          .catch(() => {
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const values = {
    user,
    loading,
    setUser,
    setLoading
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
