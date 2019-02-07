<template>
  <v-content>
    <v-layout column wrap align-center justify-center fill-height>
      <v-card class="teal">
        <v-toolbar>
          <span class="title">Login</span>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap>
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
                :type="'password'"
                v-model="password"
                :error-messages="passwordErrors"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="submit">Login</v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="text-xs-center elevation-0 transparent">
        <v-card-text>
          <p>Do not have an account?</p>
          <router-link tag="p" :to="{ name: 'signup' }">
            <a>Create one here</a>
          </router-link>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-content>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      emailErrors: [],
      passwordErrors: []
    }
  },
  methods: {
    submit() {
      this.$axios
        .post('/user/login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
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
    }
  }
}
</script>

<style scoped></style>
