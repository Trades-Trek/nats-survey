import { AuthContext } from 'src/context/AuthContext'
import React, { useState, useEffect, useContext } from 'react'
import toast from 'react-hot-toast'
import CardWrapper from 'src/component/Cardwrapper'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import { FormControl, InputLabel, Input, Button, FormHelperText } from '@mui/material'
import { surveyService } from 'src/services/survey.service'
import Router from 'next/router'

const EditProfile = () => {

  const { userBankDetail, user, setUserBankDetail } = useContext(AuthContext);
  const bankAccount = userBankDetail[0];

  const [profileData, setProfileData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    country: user.country,
    bankName: bankAccount.bankName,
    accountName: bankAccount.accountName,
    accountNumber: bankAccount.accountNumber,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { country, bankName,}  =  profileData


  console.log(profileData, '....profileData.....')

  const [errors, setErrors] = useState({
    country: '',
    bankName: '',
    accountNumber: '',
    accountName: ''
  })

  const validateForm = () => {
    const newErrors = {}

    if (!country) {
      newErrors.country = 'Country is required.'
    }

    if (!bankName) {
      newErrors.bankName = 'Bank name is required.'
    }

    if (!accountNumber) {
      newErrors.accountNumber = 'Account number is required.'
    }

    if (!accountName) {
      newErrors.accountName = 'Account name is required.'
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
    <CardWrapper
      HeaderComponent={<></>}
      title='profile'
    >
      
        <form onSubmit={handleSubmit}>
          <FormControl margin='normal' fullWidth>
            <InputLabel htmlFor='country'>Country</InputLabel>
            <Input id='country' type='text' value={country} onChange={e => setCountry(e.target.value)} />
            <FormHelperText error={errors.country}>{errors.country}</FormHelperText>
          </FormControl>

          <FormControl margin='normal' fullWidth>
            <InputLabel htmlFor='bankName'>Bank Name</InputLabel>
            <Input id='bankName' type='text' value={bankName} onChange={e => setBankName(e.target.value)} />
            <FormHelperText error={errors.bankName}>{errors.bankName}</FormHelperText>
          </FormControl>

          <FormControl margin='normal' fullWidth>
            <InputLabel htmlFor='accountNumber'>Account Number</InputLabel>
            <Input
              id='accountNumber'
              type='text'
              value={  profileData.accountNumber}
              onChange={e => setAccountNumber(e.target.value)}
            />
            <FormHelperText error={errors.accountNumber}>{errors.accountNumber}</FormHelperText>
          </FormControl>

          <FormControl margin='normal' fullWidth>
            <InputLabel htmlFor='accountName'>Account Name</InputLabel>
            <Input id='accountName' type='text' value={profileData.accountName} onChange={e => setAccountName(e.target.value)} />
            <FormHelperText error={errors.accountName}>{errors.accountName}</FormHelperText>
          </FormControl>

          <Button disabled={isLoading} type='submit' variant='contained' style={{ background: '#FF8C09' }}>
            {isLoading ? 'Loading...' : ' Save and preview'}
          </Button>
        </form>
      
    </CardWrapper>
  )
}

EditProfile.getLayout = page => <BlankLayout>{page}</BlankLayout>
EditProfile.authGuard = true

export default EditProfile
