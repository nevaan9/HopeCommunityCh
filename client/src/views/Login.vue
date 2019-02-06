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
              <v-text-field label="Email" single-line outline></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Password" single-line outline></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green">Login</v-btn>
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
    return {}
  }
}
</script>

<style scoped></style>
