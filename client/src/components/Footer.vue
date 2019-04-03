<template>
  <v-footer dark height="auto">
    <v-card
      class="indigo lighten-1 white--text text-xs-center text-md-center grow"
      flat
      tile
    >
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-text class="white--text">
        &copy;2019 —
        <strong>Hope Community Church</strong>
      </v-card-text>
    </v-card>
    <v-card></v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-instagram']
  })
}
</script>

<style scoped></style>
