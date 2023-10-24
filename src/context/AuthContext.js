// ** React Imports
import { createContext, useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
// ** Next Import
import { useRouter } from 'next/router'
import { userService } from 'src/services'

// ** Get user id from old token
// @ts-ignore

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  bankDetail: null,
  totalSurvBalance: 0,
  setTotalSurvBalance: () => null,
  totalRefferalBalance: 0,
  setTotalRefferalBalance: () => null
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [totalSurveyBalance, setTotalSurveyBalance] = useState(0)
  const [userBankDetail, setUserBankDetail] = useState(defaultProvider.bankDetail)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [totalReferralBalance, setTotalReferralBalance] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

      if (storedToken) {
        const {
          payload: { user_type }
        } = jwt.decode(storedToken, { complete: true })

        if (user_type === 'admin') {
          setLoading(false)
          return
        }

        if (router.asPath === '/') {
          router.push('/dashboard')
        }

        setLoading(true)

        await userService
          .userInfo()
          .then(async response => {
            setLoading(false)
            setUser(response.data.user)
            setUserBankDetail(response.data.userBankDetails)
            setTotalSurveyBalance(response.data.totalBalance)
            setTotalReferralBalance(response.data.totalRefferalBalance)
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
    userBankDetail,
    setLoading,
    setUserBankDetail,
    totalSurveyBalance,
    setTotalSurveyBalance,
    totalReferralBalance,
    setTotalReferralBalance
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
