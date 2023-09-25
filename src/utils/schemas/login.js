import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import errorMessage from '@/utils/error_message'
import { useUserStore } from '@/stores'
import router from '@/router'

const { fieldMustBeValid, fieldRequired } = errorMessage

function useLoginForm() {
  const { handleSubmit } = useForm({
    validationSchema: yup.object({
      email: yup.string().email(fieldMustBeValid('Email')).required(fieldRequired('Email')),
      password: yup.string().min(6).required(fieldRequired('Password')),
    }),
  })

  const field = {
    email: useField('email'),
    password: useField('password')
  }

  const submit = handleSubmit(async (values) => {
    const user = useUserStore()
    await user.login(values)
    router.push({ name: 'dashboard_home' })
  })

  return { field, submit }
}

export default {
  useLoginForm
}