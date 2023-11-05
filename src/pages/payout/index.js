import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Link from 'next/link'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import { AuthContext } from 'src/context/AuthContext'
import React, { useState, useEffect, useContext } from 'react'
import CardWrapper from 'src/component/Cardwrapper'
import CardContent from '@mui/material/CardContent'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import toast from 'react-hot-toast'
import Dialog from '@mui/material/Dialog'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import { RadioGroup, Radio, FormControlLabel, DialogContent, Box } from '@mui/material'
import { userService } from 'src/services'

const bankAccount = 'bank_account'

const Payout = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedRadioButtonValue, setSelectedRadioButtonValue] = useState('')
  const [surveyOrRefferral, setSurveyOrRefferral] = useState('')
  const [step, setStep] = useState(1)
  const { totalSurveyBalance, totalReferralBalance, userBankDetail } = useContext(AuthContext)

  const handleRadioButtonChange = event => {
    setSelectedRadioButtonValue(event.target.value)
  }

  return (
    <CardWrapper HeaderComponent={<></>} title='Payout'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <PayoutCard
            title='Survey'
            setSurveyOrRefferral={setSurveyOrRefferral}
            amount={totalSurveyBalance}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PayoutCard
            title='Referral'
            setSurveyOrRefferral={setSurveyOrRefferral}
            amount={totalReferralBalance}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </Grid>
      </Grid>

      <Dialog
        onClose={() => {
          setSurveyOrRefferral('')
          setSelectedRadioButtonValue('')
          setStep(1)
          setOpenModal(false)
        }}
        open={openModal}
        sx={{ padding: 10 }}
      >
        <DialogContent>
          {step == 1 && (
            <>
              <RadioGroup value={selectedRadioButtonValue} onChange={handleRadioButtonChange}>
                {userBankDetail && (
                  <FormControlLabel
                    value={bankAccount}
                    label='Bank Account'
                    control={<Radio />}
                    image={<AccountBalanceIcon />}
                  />
                )}

                <FormControlLabel value='paypal' label='PayPal' control={<Radio />} image='' />
                <FormControlLabel value='cryptocurrency' label='Cryptocurrency' control={<Radio />} image='' />
                <FormControlLabel value='amazon_gift_card' label='Amazon Gift Card' control={<Radio />} image='' />
              </RadioGroup>

              <Button
                onClick={() => setStep(2)}
                variant='contained'
                sx={{
                  width: 190,
                  background: '#FF8C09',
                  color: 'black',
                  textTransform: 'capitalize',
                  margin: '20px auto'
                }}
              >
                Continue
              </Button>
            </>
          )}

          {step == 2 && (
            <PaymentDetails selectedRadioButtonValue={selectedRadioButtonValue} surveyOrRefferral={surveyOrRefferral} />
          )}
        </DialogContent>
      </Dialog>
    </CardWrapper>
  )
}

export default Payout

Payout.getLayout = page => <BlankLayout>{page}</BlankLayout>
Payout.authGuard = true

const PayoutCard = ({ title, amount, openModal, setOpenModal, setSurveyOrRefferral }) => {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(!open)
  const s = { verticalAlign: 'sub', cursor: 'pointer' }
  return (
    <Card
      sx={{
        borderRadius: '8px',
        background: '#00373E',
        boxShadow: '0px 4px 14px 0px rgba(0, 0, 0, 0.12)',
        width: 498,
        padding: '90px 12px 90px 0px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          sx={{
            color: 'white',
            textAlign: 'center',
            fontFamily: 'sans-serif',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 700
          }}
        >
          {title} Wallet Balance{' '}
          {open ? <VisibilityIcon onClick={toggle} style={s} /> : <VisibilityOffIcon onClick={toggle} style={s} />}
          <br />
          {open ? amount : <>*********</>}
        </Typography>
        <Button
          onClick={() => {
            if (amount <= 0) {
              toast.success('You have no sufficient balance to withdraw')
              return
            }
            setSurveyOrRefferral(title)
            setOpenModal(true)
          }}
          variant='contained'
          sx={{ width: 220, p: 3, mt: 3, mb: 5, background: '#FF8C09', color: 'black', textTransform: 'capitalize' }}
        >
          $ Withdraw Funds
        </Button>
      </CardContent>
    </Card>
  )
}

const PaymentDetails = ({ selectedRadioButtonValue, surveyOrRefferral }) => {
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [cryptoWallet, setCryptoWallet] = useState('')
  const {
    user,
    totalSurveyBalance,
    totalReferralBalance,
    userBankDetail,
    setTotalSurveyBalance,
    setTotalReferralBalance
  } = useContext(AuthContext)
  const router = useRouter()
  const userbankDetailsObj = userBankDetail[0]

  const { accountNumber, accountName, bankName } = userbankDetailsObj

  let withdrawAmount = 0
  if (surveyOrRefferral === 'Survey') {
    withdrawAmount = totalSurveyBalance
  }

  if (surveyOrRefferral === 'Referral') {
    withdrawAmount = totalReferralBalance
  }

  useEffect(() => {
    () => {
      setCryptoWallet('')
      setShowSuccess(false)
    }
  }, [])

  const submit = async () => {
    if (!withdrawAmount) return
    setLoading(true)
    const body = {
      paymentMethod: selectedRadioButtonValue,
      referralOrSurvey: surveyOrRefferral,
      cryptoWallet
    }
    try {
      const res = await userService.withdrawalRequest(body)

      if (res.success) {
        setShowSuccess(true)
        if (surveyOrRefferral === 'Survey') {
          setTotalSurveyBalance(res.SurveyBalance)
        }

        if (surveyOrRefferral === 'Referral') {
          setTotalReferralBalance(res.referralBalance)
        }
        toast.success('Successfully sent withdrawal request')
        setLoading(false)
        return
      }
      setLoading(false)
      toast.error('Failed to submit withdraw request')
    } catch (err) {
      setLoading(false)
      toast.error('Failed to submit withdraw request')
    }
  }

  return !showSuccess ? (
    <Box
      sx={{
        width: 406,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <h1>Withdraw</h1>
      <Typography
        sx={{
          textAlign: 'center',
          color: '#1D1D1D',
          fontSize: 18,
          fontWeight: 500,
          wordWrap: 'break-word'
        }}
      >
        You want to withdraw ${withdrawAmount} {selectedRadioButtonValue !== 'cryptocurrency' && 'into'} &nbsp;&nbsp;{' '}
        {['paypal', 'amazon_gift_card'].includes(selectedRadioButtonValue) && user.email}
        {selectedRadioButtonValue === 'cryptocurrency' && (
          <>
            {' '}
            <br />
            Enter wallet address to complete withdrawal
            <br />
          </>
        )}
        <br />
        {selectedRadioButtonValue === bankAccount && (
          <>
            Bank Account: <span style={{ color: '#331685' }}>{accountNumber}</span>
            <br />
            Account Name: <span style={{ color: '#331685' }}>{accountName}</span>
          </>
        )}
        {selectedRadioButtonValue === 'cryptocurrency' && (
          <>
            <TextField
              id='withdraw-amount'
              variant='outlined'
              placeholder='enter wallet address'
              pattern='[0-9]*'
              onChange={e => setCryptoWallet(e.target.value)}
              value={cryptoWallet}
              name='withdrawAmount'
            />
          </>
        )}
      </Typography>

      <Box sx={{ m: 5 }}>
        {selectedRadioButtonValue === bankAccount && (
          <>
            {/* <TextField
               id='withdraw-amount'
               variant='outlined'
               placeholder='enter amount you want to withdraw'
               pattern='[0-9]*'
               onChange={handleChange}
               value={withdrawAmount}
               name='withdrawAmount'
             /> */}
            <small>The money will be sent to the account you added in your payout settings.</small>
          </>
        )}
      </Box>
      <Button
        disabled={!withdrawAmount || loading}
        onClick={submit}
        variant='contained'
        sx={{
          width: 190,
          background: '#FF8C09',
          color: 'black',
          textTransform: 'capitalize',
          margin: '20px auto'
        }}
      >
        Continue
      </Button>
    </Box>
  ) : (
    <>
      <Box
        sx={{
          width: 406,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <svg xmlns='http://www.w3.org/2000/svg' width={120} height={120} viewBox='0 0 120 120' fill='none'>
          <g clipPath='url(#clip0_221_615)'>
            <path
              d='M40.4624 36.3988L40.9355 36.8121L83.1887 79.0603C83.7425 79.6135 84.158 80.2896 84.4016 81.0335C84.6452 81.7774 84.71 82.5683 84.5907 83.3419C84.4713 84.1155 84.1713 84.8501 83.7149 85.4861C83.2585 86.122 82.6585 86.6414 81.9638 87.0021L81.3862 87.251L29.6776 106.306C19.9582 109.891 10.4928 100.755 13.4455 91.0502L13.6944 90.3232L32.7447 38.6145C32.9966 37.9296 33.3959 37.3084 33.9145 36.7948C34.4331 36.2813 35.0582 35.8881 35.7456 35.643C36.433 35.3978 37.1659 35.3068 37.8924 35.3763C38.6188 35.4459 39.3212 35.6742 39.9496 36.0453L40.4624 36.3938V36.3988ZM85.4293 58.0283C89.9653 58.2673 96.1843 59.2233 101.592 62.4697C102.688 63.1196 103.493 64.1651 103.842 65.3909C104.19 66.6167 104.056 67.9295 103.465 69.059C102.875 70.1884 101.874 71.0486 100.669 71.4623C99.4635 71.876 98.1454 71.8118 96.9859 71.2829L96.4681 71.009C93.0723 68.9676 88.7305 68.1709 84.9065 67.9717C83.3309 67.8806 81.7511 67.8872 80.1763 67.9916L78.6029 68.146C77.304 68.3136 75.9913 67.9627 74.9493 67.1694C73.9073 66.376 73.2199 65.2041 73.0358 63.9074C72.8518 62.6107 73.1861 61.2938 73.9662 60.2418C74.7463 59.1899 75.9095 58.4876 77.2037 58.2872C79.9307 57.935 82.6853 57.8466 85.4293 58.0233V58.0283ZM95.5121 44.1564C96.7808 44.159 98.0006 44.6459 98.9224 45.5175C99.8443 46.3891 100.399 47.5797 100.472 48.8462C100.546 50.1127 100.134 51.3596 99.3191 52.3323C98.5046 53.305 97.3495 53.93 96.0897 54.0798L95.5121 54.1147H91.9869C90.7182 54.112 89.4984 53.6252 88.5765 52.7536C87.6547 51.882 87.1003 50.6914 87.0265 49.4249C86.9528 48.1583 87.3653 46.9114 88.1799 45.9388C88.9944 44.9661 90.1495 44.341 91.4093 44.1912L91.9869 44.1564H95.5121ZM79.6684 40.3324C80.5257 41.1897 81.0407 42.3305 81.1168 43.5405C81.1929 44.7506 80.8248 45.9468 80.0817 46.9049L79.6684 47.3729L74.3855 52.6558C73.4895 53.5488 72.2871 54.0673 71.0227 54.1059C69.7582 54.1445 68.5265 53.7004 67.5776 52.8637C66.6287 52.027 66.0339 50.8606 65.914 49.6012C65.794 48.3419 66.1579 47.0841 66.9317 46.0833L67.345 45.6153L72.6229 40.3373C73.0853 39.8744 73.6345 39.5071 74.2389 39.2566C74.8434 39.006 75.4913 38.877 76.1456 38.877C76.8 38.877 77.4479 39.006 78.0524 39.2566C78.6568 39.5071 79.206 39.8694 79.6684 40.3324ZM66.7873 14.1121C69.018 20.814 67.823 28.1533 66.4288 33.2819C65.5909 36.4792 64.4401 39.5863 62.9932 42.558C62.4035 43.7399 61.3686 44.6392 60.1159 45.058C58.8632 45.4768 57.4955 45.3808 56.3136 44.7912C55.1317 44.2016 54.2325 43.1666 53.8137 41.9139C53.3949 40.6613 53.4908 39.2936 54.0805 38.1117C55.2351 35.7244 56.1523 33.2295 56.819 30.6628C57.9493 26.5202 58.5169 22.024 57.6456 18.3394L57.3418 17.2639C57.1248 16.6412 57.0337 15.9816 57.0737 15.3234C57.1137 14.6652 57.284 14.0215 57.5748 13.4296C57.8656 12.8378 58.2711 12.3096 58.7677 11.8757C59.2643 11.4419 59.8421 11.111 60.4676 10.9023C61.0932 10.6935 61.7539 10.6111 62.4115 10.6598C63.0691 10.7086 63.7105 10.8874 64.2985 11.186C64.8864 11.4847 65.4092 11.8971 65.8364 12.3994C66.2637 12.9017 66.5869 13.4838 66.7873 14.1121ZM93.7495 26.2513C94.6829 27.185 95.2073 28.4513 95.2073 29.7716C95.2073 31.0918 94.6829 32.3581 93.7495 33.2918L90.2292 36.8121C89.7699 37.2877 89.2205 37.667 88.613 37.9279C88.0055 38.1889 87.3522 38.3262 86.691 38.332C86.0299 38.3377 85.3742 38.2117 84.7623 37.9614C84.1504 37.711 83.5945 37.3413 83.127 36.8738C82.6595 36.4063 82.2897 35.8504 82.0394 35.2384C81.789 34.6265 81.663 33.9709 81.6688 33.3097C81.6745 32.6486 81.8119 31.9952 82.0728 31.3878C82.3338 30.7803 82.7131 30.2309 83.1887 29.7716L86.7089 26.2513C87.6427 25.3178 88.9089 24.7934 90.2292 24.7934C91.5495 24.7934 92.8158 25.3178 93.7495 26.2513Z'
              fill='#5D6AB0'
            />
          </g>
          <defs>
            <clipPath id='clip0_221_615'>
              <rect width='119.5' height='119.5' fill='white' transform='translate(0.25 0.25)' />
            </clipPath>
          </defs>
        </svg>
        <h3>Money is being processed</h3>
        <small>The money will be sent to the account you added in your payout settings.</small>

        <br />
        <Button
          onClick={() => router.push('/dashboard')}
          variant='contained'
          sx={{
            width: 190,
            background: '#FF8C09',
            color: 'black',
            textTransform: 'capitalize',
            margin: '20px auto'
          }}
        >
          GO HOME
        </Button>
      </Box>
    </>
  )
}
