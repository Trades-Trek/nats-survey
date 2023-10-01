// ** React Imports
import { useState, useContext } from 'react'
import { userService } from 'src/services'
import { AuthContext } from 'src/context/AuthContext'

import CardWrapper from 'src/component/Cardwrapper'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import { Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'

const defaultValues = {
  email: '',
  password: ''
}

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(1, obj => showErrors('password', obj.value.length, obj.min))
    .required()
})

const Login = () => {
  // ** States
  const { setUser, setUserBankDetail } = useContext(AuthContext)
  const [validate, setValidate] = useState(false)
  const [error, setError] = useState()

  const [state, setState] = useState({
    password: '',
    showPassword: false
  })
  const [isLoading, setIsLoading] = useState(false)

  // ** Hook
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
 
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  const onSubmit = data => {
    setIsLoading(true)
    userService
      .login(data)
      .then(res => {
        if (res?.success === true) {
          setUser(res.user)
          setUserBankDetail(res.userBankDetails)
          setIsLoading(false)
          setValidate(false)
          setError()
          toast.success('Sign in successfully')
        } else if (res?.success === false && !res.user) {
          setValidate(true)
          setError(res.message)
          setIsLoading(false)
        } else if (res?.success === false && res?.profileStatus === 0) {
          setValidate(true)
          setError(res.message)
          setBtnStatus(false)
          setIsLoading(false)

          localStorage.setItem('email', res.email)
          router.push('/otp')
        } else if (res?.success === false) {
          setValidate(true)
          setError(res.message)
          setIsLoading(false)
        } else {
          setValidate(true)
          setError('Something went wrong')
          setIsLoading(false)
        }
      })
      .catch(error => {
        setValidate(true)
        setError(error.message)
      })
  }

  return (
    <CardWrapper HeaderComponent={<></>} title='Log in to your account'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {validate && (
          <div className='' style={{ border: '1px solid red', margin: '20px' }}>
            <p style={{ textAlign: 'center', padding: '10px', color: 'red' }}>{error}</p>
          </div>
        )}
        <Grid container spacing={5}>
          <Grid item xs={12} sx={{ my: 5 }}>
            <FormControl fullWidth>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type='email'
                    value={value}
                    label='Email'
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder='carterleonard@gmail.com'
                    aria-describedby='validation-schema-email'
                    style={{ background: '#F4F4F4' }}
                  />
                )}
              />
              {errors.email && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-email'>
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ my: 5 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor='validation-schema-password' error={Boolean(errors.password)}>
                Password
              </InputLabel>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <OutlinedInput
                    value={value}
                    label='Password'
                    onChange={onChange}
                    style={{ background: '#F4F4F4' }}
                    id='validation-schema-password'
                    error={Boolean(errors.password)}
                    type={state.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={e => e.preventDefault()}
                          aria-label='toggle password visibility'
                        >
                          <Icon icon={state.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.password && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-password'>
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              size='large'
              style={{ background: '#FF8C09' }}
              sx={{ width: '100%' }}
              type='submit'
              variant='contained'
            >
              {isLoading ? 'Loading...' : ' Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardWrapper>
  )
}

Login.getLayout = page => <BlankLayout>{page}</BlankLayout>
Login.guestGuard = true


export default Login
