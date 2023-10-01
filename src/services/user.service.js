import { BehaviorSubject } from 'rxjs'
import getConfig from 'next/config'
import { fetchWrapper } from '../../helpers/fetch-wrapper'
import Router from 'next/router'
import axios from 'axios'
import authConfig from 'src/configs/auth'

const { publicRuntimeConfig } = getConfig()
const baseUrl = `${publicRuntimeConfig.apiUrl}`

const userSubject = new BehaviorSubject(process.browser && localStorage.getItem(authConfig.storageTokenKeyName))

function login(data) {
  return fetchWrapper
    .post(`${baseUrl}/user/login`, data)
    .then(res => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      if (res.success) {
        userSubject.next(res.token)
        localStorage.setItem(authConfig.storageTokenKeyName, res.token)
        Router.replace('/dashboard')
      }
      
return res
    })
    .catch(error => {
      if (error?.length > 0) {
        return error[0]
      }
      
return error
    })
}

//signup function
function signup(data) {
  return fetchWrapper
    .post(`${baseUrl}/user/signup`, data)

    .then(res => {
      if (res.success) {
      }
      
return res
    })
    .catch(error => {
      if (error?.length > 0) {
        return error[0]
      }
      
return error
    })
}

//Verify Otp
function verifyLoginOtp(email, otp) {
  return fetchWrapper
    .post(`${baseUrl}/user/verifyEmail`, {
      email: email,
      otp: otp
    })
    .then(res => {
      if (res.success) {
        userSubject.next(res.token)
        localStorage.setItem(authConfig.storageTokenKeyName, res.token)
        Router.replace('/dashboard')
        localStorage.removeItem(authConfig.netsurveyemail);
      }
      
return res
    })
    .catch(function (error) {
      return error
    })
}

function subscriptionUpdate(email, subscription) {
  return fetchWrapper
    .post(`${baseUrl}/user/subscription`, {
      email,
      subscription
    })
    .then(res => {
      if (res.success) {
        userSubject.next(res.token)
        localStorage.setItem('token', res.token)
      }
      
return res
    })
    .catch(function (error) {
      return error
    })
}

// forgot password ...................
function forgot_password(email) {
  return fetchWrapper
    .post(`${baseUrl}/user/forgotPasswordSendOtp`, {
      email: email
    })
    .then(res => {
      if (res.success) {
        userSubject.next(res.token)
        localStorage.setItem('token', res.token)
      }
      
return res
    })
    .catch(function (error) {
      return error
    })
}

// reset password ..............
function reset_password(data) {
  return fetchWrapper
    .patch(`${baseUrl}/user/resetPassword`, data)
    .then(res => {
      if (res.success) {
        userSubject.next(res.token)
        localStorage.setItem('token', res.token)
      }
      
return res
    })
    .catch(function (error) {
      return error
    })
}

//Logout Function
function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem(authConfig.storageTokenKeyName)
  localStorage.removeItem(authConfig.netsurveyemail)
  localStorage.removeItem('otp')
  userSubject.next(null)
  Router.push('/')
}

// user info .............................................
function userInfo() {
  return fetchWrapper

    .get(`${baseUrl}/user/get/info`)

    .then(res => {
      if (res.success == false) {
        localStorage.removeItem(authConfig.storageTokenKeyName)
        userSubject.next(null)
        Router.push('/')
      } else if (res.success) {
        return res
      }
    })
    .catch(error => {
      if (error?.length > 0) {
        return error[0]
      }
      
return error
    })
}

//Resend Otp
function resendOtp(email, otp) {
  return fetchWrapper
    .post(`${baseUrl}/user/resendOtp`, {
      email: email,
      otp: otp
    })
    .then(res => {
      if (res.success) {
        userSubject.next(res.token)
        localStorage.setItem('token', res.token)
      }
      
return res
    })
    .catch(function (error) {
      return error
    })
}

// Change password .........................

function changePassword(data) {
  return fetchWrapper
    .patch(`${baseUrl}/user/changePassword`, data)
    .then(res => {
      if (res.success) {
        userSubject.next(res.token)
        localStorage.setItem('token', res.token)
      }
      
return res
    })
    .catch(function (error) {
      return error
    })
}

function verifyTransaction(data) {
  return fetchWrapper
    .post(`${baseUrl}/subscription/verify`, data)
    .then(res => {
      return res
    })
    .catch(function (error) {
      return error
    })
}

function GetSingleUser(userName) {
  return fetchWrapper
    .get(`${baseUrl}/user/single-user-info?userName=${userName}&gameId=${localStorage.getItem('GameId')}`)

    .then(res => {
      if (res.success) {
      }
      
return res
    })
    .catch(error => {
      if (error?.length > 0) {
        return error[0]
      }
      
return error
    })
}

function getBankDetail() {
  return fetchWrapper
    .get(`${baseUrl}/transaction/bank-details`)
    .then(res => {
      if (res.success) {
        res
      }

      return res
    })
    .catch(function (error) {
      return error
    })
}

function getBanks() {
  return fetchWrapper
    .get(`${baseUrl}/bank`)
    .then(res => {
      if (res.success) {
        res
      }

      return res
    })
    .catch(function (error) {
      return error
    })
}

function verifyAccountNumber({ account_number, bank_code }) {
  return fetchWrapper
    .get(`${baseUrl}/bank/verifyAccount?account_number=${account_number}&bank_code=${bank_code}`)
    .then(res => {
      if (res.success) {
        res
      }

      return res
    })
    .catch(function (error) {
      return error
    })
}

function allowNotificationStatus(status) {
  return fetchWrapper
    .get(`${baseUrl}/user/allow-notification-status?allowNotification=${status}`)
    .then(res => {
      if (res.success) {
      }

      return res
    })
    .catch(function (error) {
      return error
    })
}
function updateAccount(data) {
  return fetchWrapper
    .post(`${baseUrl}/user/update-user`, data)
    .then(res => {
      if (res.success) {
      }

      return res
    })
    .catch(function (error) {
      return error
    })
}
function updateProfile(data) {
  return axios
    .post(
      `${baseUrl}/user/uploadProfile`,
      { image: data },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          type: 'formData',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    .then(res => {
      if (res.success) {
      }

      return res.data
    })
    .catch(function (error) {
      return error
    })
}
function removeProfile() {
  return fetchWrapper
    .delete(`${baseUrl}/user/remove-pic`)
    .then(res => {
      if (res.success) {
      }

      return res
    })
    .catch(function (error) {
      return error
    })
}
function updateTimeStamp() {
  return fetchWrapper
    .get(`${baseUrl}/user/timestamp`)
    .then(res => {
      if (res.success) {
      }

      return res
    })
    .catch(function (error) {
      return error
    })
}

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value
  },
  login,
  getBanks,
  verifyAccountNumber,
  getBankDetail,
  removeProfile,
  updateAccount,

  logout,
  signup,
  verifyLoginOtp,
  resendOtp,
  forgot_password,
  reset_password,
  userInfo,
  changePassword,
  subscriptionUpdate,
  verifyTransaction,
  GetSingleUser,
  allowNotificationStatus,
  updateProfile,
  updateTimeStamp
}
