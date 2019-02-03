<template>
  <div>
    <!-- WEB -->
    <v-tabs color="black" dark grow icons-and-text>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab :class="navBarHeight">Home</v-tab>

      <v-tab :class="navBarHeight">Mission</v-tab>

      <v-tab :class="navBarHeight">Events</v-tab>

      <v-tab :class="navBarHeight">About Us</v-tab>

      <v-tab :class="navBarHeight">Contact</v-tab>
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
