<template>
  <div>
    <!-- WEB -->
    <v-tabs color="black" dark grow icons-and-text>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab :class="navBarHeight" :to="{ name: 'home' }">Home</v-tab>

      <v-tab :class="navBarHeight" :to="{ name: 'mission' }">Mission</v-tab>

      <v-tab :class="navBarHeight" :to="{ name: 'events' }">Events</v-tab>

      <v-tab :class="navBarHeight" :to="{ name: 'about' }">About Us</v-tab>

      <v-tab :class="navBarHeight" :to="{ name: 'contact' }">Contact</v-tab>
    </v-tabs>

    <!-- MOBILE -->
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    navBarHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return ['caption']
        default:
          return ['body-2']
      }
    }
  }
}
</script>

<style scoped></style>
