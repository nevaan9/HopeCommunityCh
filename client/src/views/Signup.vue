<template>
  <v-content>
    <v-container>
      <v-layout column wrap align-center justify-center fill-height>
        <v-card>
          <v-toolbar class="primary" dark>
            <span class="title">Sign Up</span>
          </v-toolbar>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  label="Name"
                  single-line
                  outline
                  v-model="inputFields.name"
                  :error-messages="nameErrors"
                ></v-text-field>
              </v-flex>
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
                  :type="'password'"
                  :error-messages="passwordErrors"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Confirm Password"
                  single-line
                  outline
                  v-model="inputFields.confirmpassword"
                  :type="'password'"
                  :error-messages="cpasswordErrors"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn dark @click="submit(url, postData, rediredtPage, showNotif)"
              >Sign Up</v-btn
            >
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
    </v-container>
  </v-content>
</template>

<script>
import { signup_login_mixin } from '../mixins/signup-login.js'
export default {
  name: 'Signup',
  mixins: [signup_login_mixin],
  data() {
    return {
      url: '/user/signup',
      postData: ['name', 'email', 'password', 'confirmpassword'],
      rediredtPage: { name: 'login' },
      showNotif: true
    }
  }
}
</script>

<style scoped></style>
