<template>
  <v-card-text>
    <v-container grid-list-xs fluid pt-0 style="max-width: 1000px">
      <v-layout row wrap>
        <v-flex>
          <v-card class="mt-4" max-width="400px">
            <v-subheader>First Church Info</v-subheader>
            <v-text-field
              class="pl-3 pr-5"
              label="Info One Header"
            ></v-text-field>
            <v-textarea
              class="ml-3 pr-5"
              name="input-7-4"
              label="Outline textarea"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
            ></v-textarea>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card class="mt-4" max-width="400px">
            <v-subheader>First Church Info</v-subheader>
            <v-text-field
              class="pl-3 pr-5"
              label="Info One Header"
            ></v-text-field>
            <v-textarea
              class="ml-3 pr-5"
              name="input-7-4"
              label="Outline textarea"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
            ></v-textarea>
          </v-card>
        </v-flex>
      </v-layout>
      <v-card-actions>
        <v-btn class="mt-3" color="secondary" @click="saveInfo">Save</v-btn>
      </v-card-actions>
    </v-container>
  </v-card-text>
</template>

<script>
export default {
  name: 'EditForth',
  data() {
    return {}
  }
}
</script>

<style scoped></style>
