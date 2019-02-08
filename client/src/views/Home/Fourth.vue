<template>
  <section>
    <v-container grid-list-xl>
      <v-layout row wrap justify-center class="py-5">
        <v-flex xs12 sm6 mb-3>
          <v-card class="elevation-0 transparent">
            <v-card-title primary-title class="layout justify-center">
              <div class="headline">Company info</div>
            </v-card-title>
            <v-card-text>
              Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat
              tincidunt ornare. Pellentesque habitant morbi tristique senectus
              et netus et malesuada fames ac turpis egestas. Nullam in aliquet
              odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse
              potenti.
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 mb-3>
          <v-card class="elevation-0 transparent">
            <v-card-title primary-title class="layout justify-center">
              <div class="headline">Company info</div>
            </v-card-title>
            <v-card-text>
              Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat
              tincidunt ornare. Pellentesque habitant morbi tristique senectus
              et netus et malesuada fames ac turpis egestas. Nullam in aliquet
              odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse
              potenti.
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs12 md4 v-for="n in 3" :key="n">
              <v-card class="elevation-0" color="black">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline white--text">Company info</div>
                </v-card-title>
                <v-card-text class="white--text">
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat
                  tincidunt ornare. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas. Nullam
                  in aliquet odio. Aliquam eu est vitae tellus bibendum
                  tincidunt. Suspendisse potenti.
                </v-card-text>
                <v-card-actions>
                  <v-btn dark flat>Go to sermon</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {}
</script>

<style scoped></style>
