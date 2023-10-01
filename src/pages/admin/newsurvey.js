import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import CardWrapper from 'src/component/Cardwrapper'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { surveyService } from 'src/services/survey.service'
import toast from 'react-hot-toast'

function transform(obj) {
  // Clone the original object to avoid modifying it directly
  const transformedObj = JSON.parse(JSON.stringify(obj));

  // Transform the "options" arrays to arrays of strings
  transformedObj.questions.forEach((question) => {
    if (question.options && Array.isArray(question.options)) {
      question.options = question.options.map((option) => option.option);
    }
  });

  // Format numeric strings to numbers
  const numericKeys = ["normalPrice", "basicPrice", "standardPrice", "premiumPrice"];
  numericKeys.forEach((key) => {
    if (!isNaN(parseFloat(transformedObj[key]))) {
      transformedObj[key] = parseFloat(transformedObj[key]);
    }
  });

  return transformedObj;
}

const defaultValues = {
  title: '',
  description: '',
  normalPrice: '',
  basicPrice: '',
  standardPrice: '',
  premiumPrice: ''
}
const CreateSurveyForm = () => {
  const [survey, setSurvey] = useState(defaultValues)
  const [isLoading, setIsLoading] = useState(false)
  const [switchToCreateQuestions, setSwitchToCreateQuestions] = useState(false)
  const [questionsState, setQuestionsState] = useState([])
  const {
    control,
    reset,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  const onSubmit = async data => {
    setIsLoading(true)
   const transformedData = transform(data)
   const _data = {...transformedData,  slug: 'l'}
    try {
      const res = await surveyService.createSurvey(_data)

      if (res.success) {
        toast.success('Created successfully')
        setSwitchToCreateQuestions(false)
        setQuestionsState([])
        reset()
      } else {
        toast.error(res)
      }

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error('Failed')
    }
  }

  const triggerValidation = async () => {
    const isValid = await trigger()
    if (!isValid) {
    } else {
      setSwitchToCreateQuestions(true)
    }
  }

  const addQuestion = () => {
    const questions = getValues('questions') || []
    questions.push({ question: '', options: [{ option: '' }] })
    setValue('questions', questions)
    setQuestionsState(questions)
  }

  const addOption = questionIndex => {
    const questions = getValues('questions') || []
    questions[questionIndex].options.push({ option: '' })
    setValue('questions', questions)
    setQuestionsState(questions)
  }

  const removeQuestion = questionIndex => {
    const questions = getValues('questions') || []
    questions.splice(questionIndex, 1)
    setValue('questions', questions)
    setQuestionsState(questions)
  }

  const removeOption = (questionIndex, optionIndex) => {
    const questions = getValues('questions') || []
    questions[questionIndex].options.splice(optionIndex, 1)
    setValue('questions', questions)
    setQuestionsState(questions)
  }

  return (
    <CardWrapper HeaderComponent={<></>} title='Create new survey'>
      <Grid container spacing={5}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          {!switchToCreateQuestions ? (
            <>
              <Grid item xs={12} sx={{ my: 5 }}>
                <FormControl fullWidth>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='text'
                        placeholder='Survey Title'
                        style={{ background: '#F4F4F4' }}
                        label='Survey Title'
                        name='title'
                        value={value}
                        onChange={onChange}
                        control={control}
                        error={Boolean(errors.title)}
                      />
                    )}
                  />
                  {errors.title && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-email'>
                      {errors.title.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ my: 5 }}>
                <FormControl fullWidth>
                  <Controller
                    name='description'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='text'
                        placeholder='Description'
                        style={{ background: '#F4F4F4' }}
                        label='Description'
                        name='description'
                        value={value}
                        onChange={onChange}
                        control={control}
                        error={Boolean(errors.description)}
                      />
                    )}
                  />
                  {errors.description && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-email'>
                      {errors.description.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ my: 5 }}>
                <FormControl fullWidth>
                  <Controller
                    name='normalPrice'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='text'
                        placeholder='Amount per question'
                        style={{ background: '#F4F4F4' }}
                        label='Amount per question (normal users)'
                        name='normalPrice'
                        value={value}
                        onChange={onChange}
                        control={control}
                        error={Boolean(errors.normalPrice)}
                      />
                    )}
                  />
                  {errors.normalPrice && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-email'>
                      {errors.normalPrice.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ my: 5 }}>
                <FormControl fullWidth>
                  <Controller
                    name='basicPrice'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='number'
                        placeholder='Amount per question (basic users)'
                        style={{ background: '#F4F4F4' }}
                        label='Amount per question (basic users)'
                        name='basicPrice'
                        value={value}
                        onChange={onChange}
                        control={control}
                        error={Boolean(errors.basicPrice)}
                      />
                    )}
                  />
                  {errors.normalPrice && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-email'>
                      {errors.normalPrice.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ my: 5 }}>
                <FormControl fullWidth>
                  <Controller
                    name='standardPrice'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='number'
                        placeholder='Amount per question (standard users)'
                        style={{ background: '#F4F4F4' }}
                        label='Amount per question (standard users)'
                        name='standardPrice'
                        value={value}
                        onChange={onChange}
                        control={control}
                        error={Boolean(errors.basicPrice)}
                      />
                    )}
                  />
                  {errors.standardPrice && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-email'>
                      {errors.standardPrice.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ my: 5 }}>
                <FormControl fullWidth>
                  <Controller
                    name='premiumPrice'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='number'
                        placeholder='Amount per question (premium users)'
                        style={{ background: '#F4F4F4' }}
                        label='Amount per question (premium users)'
                        name='premiumPrice'
                        value={value}
                        onChange={onChange}
                        control={control}
                        error={Boolean(errors.basicPrice)}
                      />
                    )}
                  />
                  {errors.premiumPrice && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-email'>
                      {errors.premiumPrice.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type='submit'
                  onClick={triggerValidation}
                  size='large'
                  style={{ background: '#FF8C09' }}
                  sx={{ width: '100%' }}
                  variant='contained'
                >
                  Create survey questions
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Button onClick={addQuestion}>Add Question</Button>
              <div>
                {questionsState.map((question, questionIndex) => (
                  <div key={questionIndex}>
                    <Controller
                      name={`questions[${questionIndex}].question`}
                      control={control}
                      defaultValue={question.question}
                      render={({ field }) => <TextField label={`Question ${questionIndex + 1}`} {...field} />}
                    />
                    <Button onClick={() => addOption(questionIndex)}>Add Option</Button>
                    <Button onClick={() => removeQuestion(questionIndex)}>Remove Question</Button>

                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} style={{ margin: 20 }}>
                        <Controller
                          name={`questions[${questionIndex}].options[${optionIndex}].option`}
                          control={control}
                          defaultValue={option.option}
                          render={({ field }) => <TextField label={`Option ${optionIndex + 1}`} {...field} />}
                        />

                        <Button onClick={() => removeOption(questionIndex, optionIndex)}>Remove Option</Button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <Grid item xs={12}>
                {questionsState.length > 0 && (
                  <Button
                    type='submit'
                    size='large'
                    style={{ background: '#FF8C09' }}
                    sx={{ width: '100%' }}
                    variant='contained'
                  >
                    {isLoading ? 'Loading...' : ' Create survey'}
                  </Button>
                )}
              </Grid>
            </>
          )}
        </form>
      </Grid>
    </CardWrapper>
  )
}

export default CreateSurveyForm

CreateSurveyForm.getLayout = page => <BlankLayout>{page}</BlankLayout>
CreateSurveyForm.authGuard = true
