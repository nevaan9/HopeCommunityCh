<template>
  <v-content>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="form-style-8">
            <v-text-field
              label="New Password"
              single-line
              v-model="newPassword"
              :append-icon="
                showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
              "
              :type="showPassword ? 'text' : 'password'"
              :error-messages="passwordErrors"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              label="Confirm Password"
              single-line
              v-model="confirmPassword"
              :append-icon="
                showConfirmPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
              "
              :type="showConfirmPassword ? 'text' : 'password'"
              :error-messages="cpasswordErrors"
              @click:append="showConfirmPassword = !showConfirmPassword"
            ></v-text-field>
            <button @click="onSubmit">Reset Password!</button>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'ResetPasswordToken',
  props: {
    email: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      passwordErrors: [],
      cpasswordErrors: [],
      showConfirmPassword: false,
      showPassword: false
    }
  },
  methods: {
    onSubmit() {
      this.$axios
        .post('/user/confirm-reset-password', {
          email: this.email,
          resetToken: this.token,
          password: this.newPassword,
          confirmpassword: this.confirmPassword
        })
        .then(() => {
          alert('Password rest successfully!')
          this.$router.push({
            name: 'login'
          })
        })
        .catch(e => {
          // Server Side Error Handling
          const data = e.response.data
          if (data.error && data.error.length) {
            data.error.forEach(err => {
              switch (err.param) {
                case 'password':
                  if (!this.passwordErrors.length)
                    this.passwordErrors.push(err.msg)
                  break
                case 'confirmpassword':
                  if (!this.cpasswordErrors.length)
                    this.cpasswordErrors.push(err.msg)
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
      }, 5000)
    }
  },
  watch: {
    passwordErrors(newVal) {
      if (newVal.length) {
        this.clearErrorArray('password')
      }
    },
    cpasswordErrors(newVal) {
      if (newVal.length) {
        this.clearErrorArray('cpassword')
      }
    }
  }
}
</script>

<style scoped>
.form-style-8 {
  max-width: 600px;
  font-family: 'Open Sans Condensed', arial, sans;
  padding: 30px;
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
  -moz-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
  -webkit-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
}
.form-style-8 .txt-input {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  display: block;
  width: 100%;
  padding: 7px;
  border: none;
  background: transparent;
  margin-bottom: 10px;
  font: 16px Arial, Helvetica, sans-serif;
  height: 45px;
}
.form-style-8 button {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  display: block;
  width: 100%;
  padding: 7px;
  border: none;
  background-color: #3cb371;
  margin-top: 35px;
  font: 16px Arial, Helvetica, sans-serif;
  height: 45px;
}
.giving-give-description h2 {
  text-transform: uppercase;
  font-family: 'Open Sans Condensed', sans-serif;
  color: #797979;
  font-size: 18px;
  font-weight: 100;
  margin-bottom: 10px;
  text-decoration: underline;
}
.giving-give-description div {
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 17px;
  margin-bottom: 30px;
}
.custom-list {
  list-style: none;
  counter-reset: my-awesome-counter;
}
.custom-list li {
  counter-increment: my-awesome-counter;
}
.custom-list li::before {
  content: counter(my-awesome-counter) '. ';
  color: #5c6ac0;
  font-weight: bold;
}

.custom-list {
  font-family: Montserrat, sans-serif;
}
</style>
