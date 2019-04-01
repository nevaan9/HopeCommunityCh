<template>
  <!-- Edit Page -->
  <v-dialog
    v-model="dialog"
    scrollable
    fullscreen
    transition="dialog-bottom-transition"
  >
    <!-- Edit Page -->
    <v-card>
      <v-toolbar class="black headline white--text">
        <v-toolbar-title v-if="header">{{ header }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn dark small fab flat @click="$emit('close')">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </v-toolbar>
      <slot name="content"></slot>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'NewHopeDialog',
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    header: {
      type: String,
      default: null
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped></style>
