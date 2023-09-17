export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'net_survey_acess_token',
  netsurveyemail: 'net_survey_email',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
