const _ = require('lodash')
import { mapMutations } from 'vuex'

export const signup_login_mixin = {
  data() {
    return {
      inputFields: {
        email: '',
        password: '',
        name: '',
        confirmpassword: ''
      },
      emailErrors: [],
      passwordErrors: [],
      nameErrors: [],
      cpasswordErrors: []
    }
  },
  methods: {
    ...mapMutations(['showNotification']),
    submit(url, postData, redirectPage, showNotification) {
      const body = _.pick(this.inputFields, postData)
      this.$axios
        .post(url, body)
        .then(response => {
          if (showNotification) {
            const user = response.data.name.split(' ')[0]
            this.showNotification({
              y: 'top',
              x: 'right',
              mode: 'multi-line',
              timeout: 5000,
              text: `Glad you signed up ${user}! \n
              Login here.`,
              color: 'success'
            })
          }
          this.$router.push(redirectPage)
        })
        .catch(e => {
          // Server Side Error Handling
          const data = e.response.data
          if (data.error && data.error.length) {
            data.error.forEach(err => {
              switch (err.param) {
                case 'email':
                  if (!this.emailErrors.length) this.emailErrors.push(err.msg)
                  break
                case 'password':
                  if (!this.passwordErrors.length)
                    this.passwordErrors.push(err.msg)
                  break
                case 'confirmpassword':
                  if (!this.cpasswordErrors.length)
                    this.cpasswordErrors.push(err.msg)
                  break
                case 'name':
                  if (!this.nameErrors.length) this.nameErrors.push(err.msg)
                  break
                default:
              }
            })
          }
        })
    },
    clearErrorArray(array) {
      const arrayName = `${array}Errors`
      setTimeout(() => {
        this[arrayName].pop()
      }, 3000)
    }
  },
  watch: {
    emailErrors(newVal) {
      if (newVal.length) {
        this.clearErrorArray('email')
      }
    },
    passwordErrors(newVal) {
      if (newVal.length) {
        this.clearErrorArray('password')
      }
    },
    nameErrors(newVal) {
      if (newVal.length) {
        this.clearErrorArray('name')
      }
    },
    cpasswordErrors(newVal) {
      if (newVal.length) {
        this.clearErrorArray('cpassword')
      }
    }
  }
}
