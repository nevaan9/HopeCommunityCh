<template>
  <section>
    <v-parallax :src="`/image/${coverPicture}`" height="620">
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
          :src="`/image/${centerPicture}`"
          alt="New Home Community"
          height="200"
        />
        <h1 class="white--text mb-2 display-1 text-xs-center">
          {{ mainHeader }}
        </h1>
        <span>{{ subHeader }}</span>
        <v-btn
          class="black lighten-2 mt-5"
          dark
          large
          href="/pre-made-themes"
          >{{ buttonText }}</v-btn
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
  props: {
    mainHeader: {
      type: String,
      required: true
    },
    subHeader: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    coverPicture: {
      type: String,
      required: true
    },
    centerPicture: {
      type: String,
      required: true
    }
  },
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
