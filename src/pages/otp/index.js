import { useState, useEffect, useContext  } from 'react'
import CardWrapper from 'src/component/Cardwrapper'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import OtpInput from 'react-otp-input'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import toast from 'react-hot-toast'
import { userService } from 'src/services'
import authConfig from 'src/configs/auth'
import { AuthContext } from 'src/context/AuthContext'

const otpInputStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const Otp = () => {
  const router = useRouter()

  const { setUser } = useContext(AuthContext);

  const [otp, setOpt] = useState('')
  const [error, setError] = useState(null)
  const [emailAddress, setEmailAddress] = useState()
  const [btnStatus, setBtnStatus] = useState(false)
  const [isLoaderActive, setLoaderStatus] = useState(false)

  useEffect(() => {

    let email = localStorage.getItem(authConfig.netsurveyemail)
    if (!email) {
      router.push('/signup');
      
  return;
    }

    if (email) {
      setEmailAddress(email)
    }
  }, [])

  const resendOtp = async () => {
    setOpt('')
    let email = localStorage.getItem(authConfig.netsurveyemail)
    try {
      const res = await userService.resendOtp(email)
      if (res?.success === true) {
        toast.success(res.message)
        setResendOtpClassActive(false)
        setMinutes(1)
        setSeconds(59)
      } else if (res?.success === false) {
        toast.error(res.message)
        setResendOtpClassActive(false)
      }
    } catch (error) {
      toast.error(res.message)
    }
  }

  const verifyOtp = async e => {
    e.preventDefault()
    setBtnStatus(true)
    setLoaderStatus(true)
    if (otp === '' || otp.length !== 4) {
      setBtnStatus(false)
      setLoaderStatus(false)
      setError('Otp is required')
    } else {
      setError('')
      let email = localStorage.getItem(authConfig.netsurveyemail)
      const response = await userService.verifyLoginOtp(email, Number(otp))
      if (response.success === false) {
        setBtnStatus(false)
        setLoaderStatus(false)
        toast.error(response.message)
      } else {
        setUser(response.user)
        toast.success(response.message)
        setBtnStatus(false)
        setLoaderStatus(false)
      }
    }
    setBtnStatus(false)
    setLoaderStatus(false)
  }

  return (
    <CardWrapper
      HeaderComponent={<></>}
      title={
        <>
          Enter your OTP to verify your <br /> account
        </>
      }
    >
      <p style={{ textAlign: 'center' }}>An OTP has been sent to {emailAddress || 'your email address'}</p>
      <form className='otp--form' onSubmit={e => verifyOtp(e)} id='create-course-form'>
        <div className='form--item otp--input' style={otpInputStyle}>
          <OtpInput
            renderInput={props => (
              <input
                variant='outlined' // Add this for outlined text fields
                fullWidth // Make it take the full width
                {...props}
              />
            )}
            className='otp-group'
            value={otp}
            onChange={opt => setOpt(opt)}
            numInputs={4}
            renderSeparator={<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
          />
        </div>

        {emailAddress && (
          <div className='form--bottom--content' style={{textAlign: 'center'}}>
            <p>
              Didn’t get code?{' '}
              <a href='#' onClick={() => resendOtp()}>
                Resend
              </a>
            </p>
          </div>
        )}

        <div className='info--button'>
          <Button
            size='large'
            style={{ background: '#FF8C09' }}
            sx={{ width: '100%' }}
            type='submit'
            variant='contained'
            disabled={isLoaderActive}
          >
            {isLoaderActive ? 'loading...' : 'Finish Up'}
          </Button>
        </div>
      </form>
    </CardWrapper>
  )
}

Otp.getLayout = page => <BlankLayout>{page}</BlankLayout>
Otp.guestGuard = true

export default Otp
