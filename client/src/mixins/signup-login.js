export const signup_login_mixin = {
  data() {
    return {
      email: '',
      password: '',
      emailErrors: [],
      passwordErrors: []
    }
  },
  methods: {
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
    }
  }
}
