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
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Email"
                single-line
                outline
                v-model="email"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Password"
                single-line
                outline
                v-model="password"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Confirm Password"
                single-line
                outline
                v-model="confirmPassword"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green">Sign Up</v-btn>
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
export default {
  name: 'Signup',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }
}
</script>

<style scoped></style>
