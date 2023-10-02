// ** React Imports
import { useState, useEffect } from 'react'
import countries from '../../@fake-db/countries'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import { userService } from 'src/services'
import CardWrapper from 'src/component/Cardwrapper'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import authConfig from 'src/configs/auth'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const defaultValues = {
  email: '',
  username: '',
  password: '',
  name: '',
  phoneNumber: '',
  country: '',
  gender: ''
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
  username: yup
    .string()
    .min(3, obj => showErrors('username', obj.value.length, obj.min))
    .required(),
  password: yup
    .string()
    .min(8, obj => showErrors('password', obj.value.length, obj.min))
    .required(),
  name: yup
    .string()
    .min(3, obj => showErrors('name', obj.value.length, obj.min))
    .required(),
  phoneNumber: yup
    .string()
    .min(8, obj => showErrors('phoneNumber', obj.value.length, obj.min))
    .required(),
  country: yup.object().shape({
    code: yup.string(),
    label: yup.string().required(),
    phone: yup.string()
  }),
  gender: yup
    .string()
    .min(1, obj => showErrors('gender', obj.value.length, obj.min))
    .required()
})

const Register = () => {
  // ** States
  const router = useRouter()
  const [validate, setValidate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const [state, setState] = useState({
    password: '',
    showPassword: false
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (router.query) {
      reset({
        refferalCode: router?.query?.reffercode || ''
      })
    }
  }, [router])

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  const onSubmit = data => {
    setIsLoading(true)
    const referral = router.query?.referral;
    data.country = data.country.label
    data.phone  = data.phoneNumber
    data.refferalCode = referral ? referral : ''
    userService
      .signup(data)
      .then(res => {
        if (res?.success === true) {
          setValidate(false)
          localStorage.setItem(authConfig.netsurveyemail, data.email) //why ?
          setError() //look into
          setIsLoading(false)
          router.replace('/otp')
          toast.success('Sign up successful')
        } else if (res?.success === false) {
          setValidate(true)
          setError(res.message)
          setIsLoading(false)
        } else {
          setValidate(true)
          setError(res)
          setIsLoading(false)
        }
      })
      .catch(error => {
        setValidate(true)
        setError(error.message)
        setIsLoading(false)
      })
  }

  return (
    <CardWrapper
      HeaderComponent={<></>}
      title={
        <>
          Complete your registration <br /> to start earning
        </>
      }
    >
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
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Name'
                    onChange={onChange}
                    placeholder='Leonard'
                    error={Boolean(errors.name)}
                    aria-describedby='validation-schema-first-name'
                    style={{ background: '#F4F4F4' }}
                  />
                )}
              />
              {errors.name && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                  {errors.name.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ my: 5 }}>
            <FormControl fullWidth>
              <Controller
                name='username'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Username'
                    onChange={onChange}
                    placeholder='Carter'
                    error={Boolean(errors.username)}
                    aria-describedby='validation-schema-last-name'
                    style={{ background: '#F4F4F4' }}
                  />
                )}
              />
              {errors.username && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                  {errors.username.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

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
              <Controller
                name='country'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    id='country-select-demo'
                    sx={{ width: '100%' }}
                    options={countries}
                    autoHighlight
                    getOptionLabel={option => (option ? option.label : '')}
                    onChange={(e, newValue) => onChange(newValue)} // This line is important
                    value={value}
                    renderOption={(props, option) => (
                      <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                          loading='lazy'
                          width='20'
                          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                          alt=''
                        />
                        {option.label} ({option.code}) +{option.phone}
                      </Box>
                    )}
                    renderInput={params => (
                      <TextField
                        error={Boolean(errors.country)}
                        {...params}
                        label='Select Country'
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: '' // disable autocomplete and autofill
                        }}
                        style={{ background: '#F4F4F4' }}
                      />
                    )}
                  />
                )}
              />

              {errors.country && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-country'>
                  country field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ my: 5 }}>
            <FormControl fullWidth>
              <Controller
                name='phoneNumber'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type='text'
                    value={value}
                    label='Phone Number'
                    onChange={onChange}
                    error={Boolean(errors.phoneNumber)}
                    placeholder='123-456-7890'
                    aria-describedby='validation-schema-phoneNumber'
                    style={{ background: '#F4F4F4' }}
                  />
                )}
              />
              {errors.phoneNumber && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-phoneNumber'>
                  {errors.phoneNumber.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ my: 5 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor='validation-schema-gender' error={Boolean(errors.gender)}>
                Select Gender
              </InputLabel>
              <Controller
                name='gender'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    label='Select Gender'
                    onChange={onChange}
                    error={Boolean(errors.gender)}
                    style={{ background: '#F4F4F4' }}
                    id='validation-schema-gender'
                  >
                    <MenuItem value='male'>Male</MenuItem>
                    <MenuItem value='female'>Female</MenuItem>
                    <MenuItem value='other'>Other</MenuItem>
                    {/* Add more genders as needed */}
                  </Select>
                )}
              />
              {errors.gender && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-gender'>
                  {errors.gender.message}
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
                    placeholder='Enter your password'
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

          <Grid item xs={12} sx={{ my: 5 }}>
            <Button
              style={{ background: '#FF8C09' }}
              sx={{ width: '100%' }}
              size='large'
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

Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true
export default Register
