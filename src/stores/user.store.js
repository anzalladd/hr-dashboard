import AuthService from '@/networks/AuthService'
import message from '@/utils/message'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return { data: {}, isLoading: false, err: { isErr: false, message: '' } }
  },
  actions: {
    async login(values) {
      this.isLoading = true
      const toast = useToast()
      try {
        const { result } = await AuthService.login(values)
        toast.success(message.loginSuccess(result.User.name))
        window.localStorage.setItem('access_token', result.access_token)
        window.localStorage.setItem('user', JSON.stringify(result.User))
        this.data = result.User
      } catch (err) {
        toast.error(err.response.data.data.status.description)
        this.err = {
          isErr: true,
          message: err.response.data.data.status.description
        }
      } finally {
        this.isLoading = false
      }
    },

    getUser() {
      try {
        const user = JSON.parse(window.localStorage.getItem('user'))
        this.data = user
      } catch (e) {
        window.localStorage.clear()
        this.data = {}
      }
    }
  }
})
