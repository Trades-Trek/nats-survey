import { AuthContext } from 'src/context/AuthContext'
import React, { useState, useEffect, useContext } from 'react'
import toast from 'react-hot-toast'
import CardWrapper from 'src/component/Cardwrapper'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import { FormControl, CardContent, Typography, Box, Button } from '@mui/material'
import { surveyService } from 'src/services/survey.service'
import { useRouter } from 'next/router'
import Spinner from 'src/@core/components/spinner'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { Divider } from '@mui/material'
import Clipboard from 'src/@core/components/Clipboard'

const Questions = () => {
  const router = useRouter()
  const { user, totalSurveyBalance, totalReferralBalance,  setTotalSurveyBalance, } = useContext(AuthContext)


  const key = `${router.query.slug}-${user.email}`;

  const [questions, setQuestions] = useState(null)
  const [getSurveyLoading, setSurveyLoading] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userResponse, setUserResponse] = useState([])
  const [currentSelectedResponse, setCurrentResponse] = useState('')
  const [isSubmitLoading, setSubmitLoading] = useState(false)

  const saveAndExit = () => {
  
    localStorage.setItem(
      key,
      JSON.stringify({
        currentQuestion,
        userResponse,
        currentSelectedResponse
      })
    )
    router.push('/dashboard')
  }

  const handleNextQuestion = () => {
    setCurrentResponse('')
    setCurrentQuestion(currentQuestion + 1)
  }

  const handlePreviousQuestion = () => {
    setCurrentResponse('')
    if (currentQuestion > 0) return setCurrentQuestion(currentQuestion - 1)
  }

  const getSurvey = async () => {
    setSurveyLoading(true)
    try {
      const res = await surveyService.getSurvey(router.query.slug)
      if (res.success) {
        setQuestions(res.data.length > 0 ? res.data[0] : {})
        setSurveyLoading(false)

        const isQuestionSaved = localStorage.getItem(key)

        if (isQuestionSaved) {
          const { currentQuestion, userResponse, currentSelectedResponse } = JSON.parse(isQuestionSaved)
          setCurrentQuestion(currentQuestion)
          setUserResponse(userResponse)
          setCurrentResponse(currentSelectedResponse)
        }

        return
      }
      setSurveyLoading(false)
      toast.error('Failed to get survey')
    } catch (error) {
      console.log(error)
      setSurveyLoading(false)
      toast.error('Failed to get survey')
    }
  }

  useEffect(() => {
    getSurvey()
  }, [router.query.slug])

  const Title = ({ questionObject }) => {
    if (getSurveyLoading || !questions) {
      return <></>
    }

    const userSubCategory = user.subscriptionCategory

    let chipLabel = ''
    if (userSubCategory === 'free') {
      chipLabel = questionObject?.normalPrice.toFixed(2)
    }

    if (userSubCategory === 'premium') {
      chipLabel = questionObject?.premiumPrice.toFixed(2)
    }

    if (userSubCategory === 'standard') {
      chipLabel = questionObject?.standardPrice.toFixed(2)
    }

    if (userSubCategory === 'basic') {
      chipLabel = questionObject?.basicPrice.toFixed(2)
    }

    return (
      <div style={{ display: 'flex' }}>
        <Typography color='#000' fontSize='30px' fontStyle='normal' fontWeight={700} letterSpacing='0.3px'>
          {questions?.questions[currentQuestion].question}
        </Typography>
        <Chip label={chipLabel} style={{ background: '#FF8C09', margin: 10 }} />
      </div>
    )
  }

  const submitResponse = async () => {
    setSubmitLoading(true)

    const isQuestionSaved = localStorage.getItem(router.query.slug)
    if (isQuestionSaved) {
      localStorage.removeItem(router.query.slug)
    }

    try {
      const response = await surveyService.submitSurvey(userResponse, router.query.slug)
      if (response.success) {
        setTotalSurveyBalance(response.totalSurveyBalance)
        toast.success('Response to survey submitted')
        setSubmitLoading(false)
        router.push(`/success/survey?s=${response.surveyBalance}`)

        return
      }
      setSubmitLoading(false)
      toast.error(response.message || 'Error while sumbitting, Try again')
    } catch (error) {
      setSubmitLoading(false)
      toast.error('Error while sumbitting, Try again')
    }
  }

  const gotoPayOut = () => router.push('/payout')

  return (
    <CardWrapper
      HeaderComponent={
        <Stack spacing={2} direction='row'>
          <Button
            onClick={gotoPayOut}
            variant='outlined'
            sx={{
              color: 'red',
              borderColor: 'transparent',
              boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.10)' // Add the box shadow
            }}
          >
            Survey Balance: ${totalSurveyBalance}
          </Button>
          <Button
            onClick={gotoPayOut}
            sx={{
              color: '#212121',
              border: '1px solid #254F1A'
            }}
            variant='outlined'
          >
            Referral Balance: ${totalReferralBalance}
          </Button>
        </Stack>
      }
      title={<></>}
    >
      {getSurveyLoading || !questions ? (
        <Spinner />
      ) : (
        <>
          <CardContent>
            <Title questionObject={questions?.questions[currentQuestion]} />
            <Box sx={{ mt: 2 }}>
              <FormControl>
                <RadioGroup
                  aria-labelledby='demo-controlled-radio-buttons-group'
                  name='controlled-radio-buttons-group'
                  value={currentSelectedResponse}
                  onChange={e => {
                    const updatedUserResponse = [...userResponse]

                    const existingAnswer = updatedUserResponse.find(answer => answer.questionNumber === currentQuestion)
                    if (existingAnswer) {
                      existingAnswer.answer = e.target.value
                    } else {
                      updatedUserResponse.push({
                        questionNumber: currentQuestion,
                        answer: e.target.value
                      })
                    }
                    setCurrentResponse(e.target.value)
                    setUserResponse(updatedUserResponse)
                  }}
                >
                  {questions?.questions &&
                    questions?.questions.length &&
                    questions?.questions[currentQuestion].options.map(option => (
                      <FormControlLabel
                        style={{ width: 400, borderRadius: 38, background: '#F2F2F2', margin: 10, padding: 5 }}
                        key={option}
                        value={option}
                        control={
                          <Radio
                            className='nat-survey-radios'
                            sx={{
                              color: 'red',
                              '&.Mui-checked': {
                                color: 'green !important'
                              }
                            }}
                          />
                        }
                        label={option}
                      />
                    ))}
                </RadioGroup>
              </FormControl>
            </Box>

            <Box sx={{ m: 4, display: 'flex', justifyContent: 'start', gap: '10px' }}>
              {/* {currentQuestion !== 0 && (
                <Button variant='outlined' onClick={handlePreviousQuestion} sx={{ width: 200 }}>
                  Previous
                </Button>
              )} */}

              {currentQuestion === questions?.questions.length - 1 ? (
                <Button
                  disabled={!currentSelectedResponse}
                  variant='contained'
                  onClick={() => {
                    if (isSubmitLoading) return
                    submitResponse()
                  }}
                  sx={{ width: 200, background: '#FF8C09' }}
                >
                  {isSubmitLoading ? 'Loading' : 'Submit'}
                </Button>
              ) : (
                <Button
                  disabled={!currentSelectedResponse}
                  variant='contained'
                  onClick={handleNextQuestion}
                  sx={{ width: 200, background: '#FF8C09' }}
                >
                  Next
                </Button>
              )}

              <Button
                variant='outlined'
                disabled={!currentSelectedResponse}
                onClick={saveAndExit}
                sx={{ width: 200, border: '1px solid #4C4C4C', color: '#3D3D3D' }}
              >
                Save and exit
              </Button>

              {/* {currentQuestion < questions.length - 1 && (
                
              )} */}
            </Box>

            <Divider
              sx={{
                my: 15,
                width: '50%'
              }}
            />

            <Box>
              <Typography
                sx={{
                  color: '#000',
                  fontSize: '22px',
                  fontStyle: 'normal',
                  fontWeight: '700'
                }}
              >
                Refferal
              </Typography>

              <Typography
                sx={{
                  color: '#331685',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: '600'
                }}
              >
                Invite your friends to take part in the survey and earn cash rewards
              </Typography>

              <Clipboard yourRefferal={user?.yourRefferal} />
            </Box>

            <Typography variant='caption'>
              Question {currentQuestion + 1} of {questions?.questions.length}{' '}
            </Typography>
          </CardContent>
        </>
      )}
    </CardWrapper>
  )
}

Questions.getLayout = page => <BlankLayout>{page}</BlankLayout>
Questions.authGuard = true

export default Questions
