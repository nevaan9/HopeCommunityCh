<template>
  <div>
    <v-content>
      <section>
        <v-parallax
          src="https://raw.githubusercontent.com/vuetifyjs/parallax-starter/master/template/assets/hero.jpeg"
          height="600"
        >
          <v-layout column align-center justify-center class="white--text">
            <img
              src="https://raw.githubusercontent.com/vuetifyjs/parallax-starter/master/template/assets/logo.png"
              alt="Vuetify.js"
              height="200"
            />
            <h1 class="white--text mb-2 display-1 text-xs-center">
              Hope Community Church
            </h1>

            <v-btn
              class="black lighten-2 mt-5"
              dark
              large
              href="/pre-made-themes"
              >Who are we?</v-btn
            >
          </v-layout>
        </v-parallax>
      </section>

      <section style="background-color: white">
        <v-layout column wrap class="py-5" align-center>
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h1 class="display-1">Our Churches</h1>
              <span class="subheading">Seeking God Every Step of the Way</span>
            </div>
          </v-flex>
          <v-card-text xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <img
                        src="https://raw.githubusercontent.com/vuetifyjs/parallax-starter/master/template/assets/logo.png"
                        alt="Vuetify.js"
                        height="200"
                      />
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="text-xs-center">
                        <h1>Arlington, VA</h1>
                        <span>Sunday 8:00am</span>
                      </div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla
                      volutpat tincidunt ornare. Pellentesque habitant morbi
                      tristique senectus et netus et malesuada fames ac turpis
                      egestas. Nullam in aliquet odio. Aliquam eu est vitae
                      tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <img
                        src="https://raw.githubusercontent.com/vuetifyjs/parallax-starter/master/template/assets/logo.png"
                        alt="Vuetify.js"
                        height="200"
                      />
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="text-xs-center">
                        <h1>Arlington, VA</h1>
                        <span>Sunday 8:00am</span>
                      </div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla
                      volutpat tincidunt ornare. Pellentesque habitant morbi
                      tristique senectus et netus et malesuada fames ac turpis
                      egestas. Nullam in aliquet odio. Aliquam eu est vitae
                      tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-layout>
      </section>

      <section>
        <v-parallax
          src="https://raw.githubusercontent.com/vuetifyjs/parallax-starter/master/template/assets/hero.jpeg"
        >
          <v-container grid-list-lg>
            <v-layout align-center justify-center row wrap fill-height>
              <v-flex>
                <v-card>
                  <v-toolbar color="primary" dark>
                    <v-toolbar-title>Upcoming Events</v-toolbar-title>
                  </v-toolbar>
                  <v-list two-line subheader>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Profile photo</v-list-tile-title>
                        <v-list-tile-sub-title
                          >Change your Google+ profile
                          photo</v-list-tile-sub-title
                        >
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Show your status</v-list-tile-title>
                        <v-list-tile-sub-title
                          >Your status is visible to
                          everyone</v-list-tile-sub-title
                        >
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Show your status</v-list-tile-title>
                        <v-list-tile-sub-title
                          >Your status is visible to
                          everyone</v-list-tile-sub-title
                        >
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Show your status</v-list-tile-title>
                        <v-list-tile-sub-title
                          >Your status is visible to
                          everyone</v-list-tile-sub-title
                        >
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Show your status</v-list-tile-title>
                        <v-list-tile-sub-title
                          >Your status is visible to
                          everyone</v-list-tile-sub-title
                        >
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-parallax>
      </section>

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
                  tincidunt ornare. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas. Nullam
                  in aliquet odio. Aliquam eu est vitae tellus bibendum
                  tincidunt. Suspendisse potenti.
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
                  tincidunt ornare. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas. Nullam
                  in aliquet odio. Aliquam eu est vitae tellus bibendum
                  tincidunt. Suspendisse potenti.
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
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla
                      volutpat tincidunt ornare. Pellentesque habitant morbi
                      tristique senectus et netus et malesuada fames ac turpis
                      egestas. Nullam in aliquet odio. Aliquam eu est vitae
                      tellus bibendum tincidunt. Suspendisse potenti.
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
    </v-content>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      title: 'Your Logo'
    }
  }
}
</script>
