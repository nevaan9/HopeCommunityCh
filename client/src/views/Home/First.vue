<template>
  <section>
    <v-parallax
      src="https://raw.githubusercontent.com/vuetifyjs/parallax-starter/master/template/assets/hero.jpeg"
      height="620"
    >
      <v-layout shrink justify-end class="white--text">
        <v-btn class="black lighten-2 mt-3" dark small @click="goToLoginPage"
          >Member Log In</v-btn
        >
        <v-btn color="primary mt-3" dark small @click="editing = true"
          >Edit</v-btn
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
    </v-parallax>
    <!-- Edit Page -->
    <EditFirst :dialog="editing" @closeDialog="editing = false"></EditFirst>
  </section>
</template>

<script>
import EditFirst from './EditFirst'
export default {
  name: 'First',
  data() {
    return {
      editing: false
    }
  },
  components: {
    EditFirst
  },
  methods: {
    goToLoginPage() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped></style>
