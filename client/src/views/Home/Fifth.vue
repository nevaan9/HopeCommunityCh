<template>
  <section>
    <v-card color="indigo lighten-1 white--text">
      <v-card-text>
        <v-layout row wrap my-3>
          <v-flex xs12 md6>
            <v-layout row wrap align-start justify-start grow>
              <v-flex v-for="n in 3" :key="n">
                <v-card class="elevation-0 transparent">
                  <span class="headline">title</span>
                  <p v-for="n in 4" :key="n">Loremipsumkolo</p>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 md6>
            <v-card class="text-xs-left" style="max-width:700px">
              <v-toolbar class="title black white--text"
                >Subscribe to Our Mailing List!</v-toolbar
              >
              <v-card-text class="white darken-4">
                <v-layout row wrap>
                  <v-text-field
                    label="Outline"
                    single-line
                    outline
                  ></v-text-field>
                  <v-btn class="color.black">Subscribe</v-btn>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
export default {}
</script>

<style scoped></style>
