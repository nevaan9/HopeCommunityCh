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
export default {
  name: 'Signup',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
      nameErrors: [],
      emailErrors: [],
      passwordErrors: [],
      cpasswordErrors: []
    }
  },
  methods: {
    ...mapMutations(['showNotification']),
    submit() {
      this.$axios
        .post('http://localhost:3000/user/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
          confirmpassword: this.confirmpassword
        })
        .then(() => {
          this.showNotification({
            y: 'top',
            x: 'right',
            mode: 'multi-line',
            timeout: 6000,
            text: 'Hello MELLOW DIRTY FELLO!',
            color: 'primary'
          })
          this.$router.push({ name: 'home' })
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
    nameErrors(newVal) {
      if (newVal.length) {
        this.clearErrorArray('name')
      }
    },
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

<style scoped></style>
