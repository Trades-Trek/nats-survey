import { AuthContext } from 'src/context/AuthContext'
import React, { useState, useEffect, useContext } from 'react'
import toast from 'react-hot-toast'
import CardWrapper from 'src/component/Cardwrapper'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import { FormControl, InputLabel, Input, Button, FormHelperText } from '@mui/material'
import { surveyService } from 'src/services/survey.service'
import TextField from '@mui/material/TextField'
import Router from 'next/router'

const EditProfile = () => {
  const { userBankDetail, user, setUserBankDetail } = useContext(AuthContext)
  const bankAccount = userBankDetail && userBankDetail.length ? userBankDetail[0] : null

  const [profileData, setProfileData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    country: user.country,
    bankName: bankAccount?.bankName || '',
    accountName: bankAccount?.accountName || '',
    accountNumber: bankAccount?.accountNumber || ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const { country, bankName, name, email, phone, username } = profileData

  const [errors, setErrors] = useState({
    country: '',
    bankName: '',
    accountNumber: '',
    accountName: '',
    name: '',
    phone: ''
  })

  const validateForm = () => {
    const newErrors = {}

    if (!country) {
      newErrors.country = 'Country is required.'
    }

    if (!name) {
      newErrors.name = 'Name is required.'
    }

    if (!phone) {
      newErrors.phone = 'Phone number is required.'
    }

    if (userBankDetail) {
      if (!bankName) {
        newErrors.bankName = 'Bank name is required.'
      }

      if (!accountNumber) {
        newErrors.accountNumber = 'Account number is required.'
      }

      if (!accountName) {
        newErrors.accountName = 'Account name is required.'
      }
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async e => {
    // TODO: Implement the handleSubmit function to save the bank account information
    e.preventDefault()
    if (!validateForm()) return

    const data = {
      country,
      bankName,
      accountNumber,
      accountName
    }
    try {
      const res = await surveyService.createBankAccount(data)

      if (res.success) {
        setUserBankDetail(res.data)
        toast.success('Profile updated successfully')
        Router.replace('/profile')
      } else {
        toast.error(res)
      }

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error('Failed to save bank account')
    }
  }

  return (
    <CardWrapper HeaderComponent={<></>} title='profile'>
      <form onSubmit={handleSubmit}>
        <TextField disabled  fullWidth id='outlined-disabled' label='' defaultValue={username}  />
        
        <TextField fullWidth disabled id='outlined-disabled' label='' defaultValue={email} sx={{ my: 5}}/>

        <FormControl margin='normal' fullWidth>
          <InputLabel htmlFor='country'>Country</InputLabel>
          <Input
            id='country'
            type='text'
            value={country}

            // onChange={e => setCountry(e.target.value)}
          />
          <FormHelperText error={errors.country}>{errors.country}</FormHelperText>
        </FormControl>

        {userBankDetail && (
          <>
            <FormControl margin='normal' fullWidth>
              <InputLabel htmlFor='bankName'>Bank Name</InputLabel>
              <Input id='bankName' type='text' value={bankName} 

              // onChange={e => setBankName(e.target.value)} 
              
              />
              <FormHelperText error={errors.bankName}>{errors.bankName}</FormHelperText>
            </FormControl>

            <FormControl margin='normal' fullWidth>
              <InputLabel htmlFor='accountNumber'>Account Number</InputLabel>
              <Input
                id='accountNumber'
                type='text'
                value={profileData.accountNumber}

                // onChange={e => setAccountNumber(e.target.value)}
              />
              <FormHelperText error={errors.accountNumber}>{errors.accountNumber}</FormHelperText>
            </FormControl>

            <FormControl margin='normal' fullWidth>
              <InputLabel htmlFor='accountName'>Account Name</InputLabel>
              <Input
                id='accountName'
                type='text'
                value={profileData.accountName}

                // onChange={e => setAccountName(e.target.value)}
              />
              <FormHelperText error={errors.accountName}>{errors.accountName}</FormHelperText>
            </FormControl>
          </>
        )}
        <Button disabled type='submit' variant='contained' style={{ background: '#FF8C09' }}>
          {isLoading ? 'Loading...' : ' Save and preview'}
        </Button>
      </form>
    </CardWrapper>
  )
}

EditProfile.getLayout = page => <BlankLayout>{page}</BlankLayout>
EditProfile.authGuard = true

export default EditProfile
