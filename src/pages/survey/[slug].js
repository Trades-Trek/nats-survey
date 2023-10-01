import { AuthContext } from 'src/context/AuthContext'
import React, { useState, useEffect, useContext } from 'react'
import toast from 'react-hot-toast'
import CardWrapper from 'src/component/Cardwrapper'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import { FormControl, Button, CardContent, Typography, Box } from '@mui/material'
import { surveyService } from 'src/services/survey.service'
import { useRouter } from 'next/router'
import Spinner from 'src/@core/components/spinner'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

const Questions = () => {
  const router = useRouter()
  const { user } = useContext(AuthContext)

  const [questions, setQuestions] = useState(null)
  const [getSurveyLoading, setSurveyLoading] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userResponse, setUserResponse] = useState([])
  const [currentSelectedResponse, setCurrentResponse] = useState('')
  const [isSubmitLoading, setSubmitLoading] = useState(false)
 
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
        return
      }
      setSurveyLoading(false)
      toast.error('Failed to get survey')
    } catch (error) {
      setSurveyLoading(false)
      toast.error('Failed to get survey')
    }
  }

  useEffect(() => {
    if (router.query.questions) {
      setQuestions(router.query.questions)
    } else {
      getSurvey()
    }
  }, [router.query.slug])

  const Title = () => {
    if (getSurveyLoading || !questions) {
      return <></>
    }

    const userSubCategory = user.subscriptionCategory

    let chipLabel = ''
    if (userSubCategory === 'free') {
      chipLabel = questions?.normalPrice.toFixed(2)
    }

    if (userSubCategory === 'Premium') {
      chipLabel = questions?.premiumPrice.toFixed(2)
    }

    if (userSubCategory === 'Standard') {
      chipLabel = questions?.standardPrice.toFixed(2)
    }

    if (userSubCategory === 'Basic') {
      chipLabel = questions?.basicPrice.toFixed(2)
    }

    return (
      <>
        {questions?.questions[currentQuestion].question} <Chip label={chipLabel} style={{ background: '#FF8C09' }} />
      </>
    )
  }

  const submitResponse = async () => {
    setSubmitLoading(true)

    try {
      const response = await surveyService.submitSurvey(userResponse, router.query.slug)
      if (response.success) {
        setSubmitLoading(false)
        toast.success('Response to survey submitted')
        localStorage.setItem("new_survey_balance", response.surveyBalance);
        router.push('/success/survey')
        return
      }
      setSubmitLoading(false)
      toast.error(response.message || 'Error while sumbitting, Try again')
    } catch (error) {
      setSubmitLoading(false)
      toast.error('Error while sumbitting, Try again')
    }
  }

  return (
    <CardWrapper HeaderComponent={<></>} title={<Title />}>
      {getSurveyLoading || !questions ? (
        <Spinner />
      ) : (
        <>
    
          <CardContent>
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
                  {questions?.questions[currentQuestion].options.map(option => (
                    <FormControlLabel
                      style={{ width: 400, borderRadius: 38, background: '#F2F2F2', margin: 10 }}
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'start', gap: '10px' }}>
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
                   { isSubmitLoading ? 'Loading': 'Submit'}
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

              <Button variant='outlined' onClick={handleNextQuestion} sx={{ width: 200 }}>
                Save and exit
              </Button>

              {/* {currentQuestion < questions.length - 1 && (
                
              )} */}
            </Box>
            <Typography variant='h6'>
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
