import CardWrapper from 'src/component/Cardwrapper'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import Paper from '@mui/material/Paper'
import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { userService } from 'src/services'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { Box, Button, Grid, Typography } from '@mui/material'

const Payment = () => {
  const { query } = useRouter()
  const plan = query.sub

  const [pageError, setPageError] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  const stripePromise = loadStripe(
    'pk_test_51NGdH3D042ZsvsAiyGbxXRQM2WcN0ktfezvanGCCoAvjoikYgsPDFrEXjrF6x3h7X18vqA0vV4zpEPTGxT3sPOeM00kKsADl1m'
  )

  //const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    setPageError(false)
    userService
      .createPaymentIntent(plan)
      .then(res => {
        if (res?.success === true) {
          setClientSecret(res.clientSecret)
        } else {
          toast.error('Failed to load stripe page')
          setPageError(true)
        }
      })
      .catch(error => {
        toast.error('Failed to create')
        setPageError(true)
      })
  }, [])

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const appearance = {
    theme: 'stripe'
  }

  const options = {
    clientSecret,
    appearance
  }

  return (
    <CardWrapper HeaderComponent={<></>} title=''>
      {' '}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      {pageError && <h1>Failed to load payment page</h1>}
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title' sx={{ textAlign: 'center' }}>
          Bank Transfer
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <DialogContentText id='alert-dialog-description'>
            <p>
              <strong>Account Name:</strong> Timothy Okoro
            </p>
            <p>
              <strong>Account Number: 12345678</strong>
            </p>
            <p>
              <strong>Bank: GTB</strong>
            </p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Paper sx={{ height: 500, width: '100%' }} elevation={0} />
      <div className='button-container' style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='text' onClick={handleClickOpen}>
          Transfer to Bank account
        </Button>
      </div>
    </CardWrapper>
  )
}

Payment.getLayout = page => <BlankLayout>{page}</BlankLayout>
Payment.authGuard = true

export default Payment

function CheckoutForm() {
  const { query } = useRouter()
  const stripe = useStripe()
  const elements = useElements()

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!')
          break
        case 'processing':
          setMessage('Your payment is processing.')
          break
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.')
          break
        default:
          setMessage('Something went wrong.')
          break
      }
    })
  }, [stripe])

  const handleSubmit = async e => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/success/payment?sub=${query.sub}`
      }
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
      toast.error(error.message)
    } else {
      setMessage('An unexpected error occurred.')
      toast.error('An unexpected error occurred.')
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage('Payment successful')
      toast.success('Payment successful')
    }

    setIsLoading(false)
  }

  const paymentElementOptions = {
    layout: 'tabs'
  }

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      {/* <LinkAuthenticationElement id='link-authentication-element' onChange={e => setEmail(e.target.value)} /> */}
      <PaymentElement id='payment-element' options={paymentElementOptions} />

      <Button
        onClick={handleSubmit}
        disabled={isLoading || !stripe || !elements}
        id='submit'
        variant='contained'
        sx={{ width: 200, background: '#FF8C09', my: 5 }}
      >
        <span id='button-text'>{isLoading ? 'Loading...' : 'Pay now'}</span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id='payment-message'>{message}</div>}
    </form>
  )
}
