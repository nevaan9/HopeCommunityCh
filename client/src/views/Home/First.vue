<template>
  <section>
    <v-parallax
      v-if="!editing"
      src="https://raw.githubusercontent.com/vuetifyjs/parallax-starter/master/template/assets/hero.jpeg"
      height="620"
    >
      <v-layout shrink justify-end class="white--text">
        <v-btn class="black lighten-2 mt-3" dark small @click="goToLoginPage"
          >Member Log In</v-btn
        >
      </v-layout>
      <v-layout column align-center justify-center class="white--text">
        <img
          src="https://raw.githubusercontent.com/vuetifyjs/parallax-starter/master/template/assets/logo.png"
          alt="Vuetify.js"
          height="200"
        />
        <h1 class="white--text mb-2 display-1 text-xs-center">
          Hope Community Church
        </h1>

        <v-btn class="black lighten-2 mt-5" dark large href="/pre-made-themes"
          >Who are we?</v-btn
        >
      </v-layout>
      <v-layout shrink justify-end class="white--text">
        <v-btn color="primary" @click="editing = true">Edit</v-btn>
      </v-layout>
    </v-parallax>
    <v-content v-else>
      <v-card>
        <v-toolbar class="primary headline">Editing</v-toolbar>
        <v-layout row wrap></v-layout>
        <v-btn color="secondary" @click="editing = false">Save</v-btn>
      </v-card>
    </v-content>
  </section>
</template>

<script>
export default {
  name: 'First',
  data() {
    return {
      editing: false
    }
  },
  methods: {
    goToLoginPage() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped></style>
