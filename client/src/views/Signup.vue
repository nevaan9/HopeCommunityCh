<template>
  <v-content>
    <v-layout column wrap align-center justify-center fill-height>
      <v-card>
        <v-toolbar dark>
          <span class="title">Sign Up</span>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                label="Name"
                single-line
                outline
                v-model="name"
                :error-messages="nameErrors"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Email"
                single-line
                outline
                v-model="email"
                :error-messages="emailErrors"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Password"
                single-line
                outline
                v-model="password"
                :type="'password'"
                :error-messages="passwordErrors"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Confirm Password"
                single-line
                outline
                v-model="confirmpassword"
                :type="'password'"
                :error-messages="cpasswordErrors"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="submit">Sign Up</v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="text-xs-center elevation-0 transparent">
        <v-card-text>
          <router-link tag="p" :to="{ name: 'login' }">
            <a>Back to login page</a>
          </router-link>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-content>
</template>

<script>
import { mapMutations } from 'vuex'
import { signup_login_mixin } from '../mixins/signup-login.js'
export default {
  name: 'Signup',
  mixins: [signup_login_mixin],
  data() {
    return {
      name: '',
      confirmpassword: '',
      nameErrors: [],
      cpasswordErrors: []
    }
  },
  methods: {
    ...mapMutations(['showNotification']),
    submit() {
      this.$axios
        .post('/user/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
          confirmpassword: this.confirmpassword
        })
        .then(response => {
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
          this.$router.push({ name: 'login' })
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
    }
  },
  watch: {
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
</script>

<style scoped></style>
