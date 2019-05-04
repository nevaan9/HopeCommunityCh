<template>
  <v-content>
    <v-layout column wrap align-center justify-center fill-height>
      <v-card>
        <v-toolbar dark class="primary">
          <span class="title">Login</span>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                label="Email"
                single-line
                outline
                v-model="inputFields.email"
                :error-messages="emailErrors"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Password"
                single-line
                outline
                v-model="inputFields.password"
                :append-icon="
                  showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                :type="showPassword ? 'text' : 'password'"
                :error-messages="passwordErrors"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn dark @click="submit(url, postData, rediredtPage)">Login</v-btn>
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
import { signup_login_mixin } from '../mixins/signup-login.js'
export default {
  name: 'Login',
  mixins: [signup_login_mixin],
  data() {
    return {
      showPassword: false,
      url: '/user/login',
      postData: ['email', 'password'],
      rediredtPage: { name: 'home' }
    }
  }
}
</script>

<style scoped></style>
