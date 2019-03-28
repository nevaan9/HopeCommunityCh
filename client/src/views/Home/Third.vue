<template>
  <section>
    <v-parallax :src="secondaryCoverPicture">
      <v-layout shrink justify-end class="white--text">
        <v-btn color="primary mt-3" dark small @click="editing = true"
          >Edit</v-btn
        >
      </v-layout>
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
                      >Change your Google+ profile photo</v-list-tile-sub-title
                    >
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Show your status</v-list-tile-title>
                    <v-list-tile-sub-title
                      >Your status is visible to everyone</v-list-tile-sub-title
                    >
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Show your status</v-list-tile-title>
                    <v-list-tile-sub-title
                      >Your status is visible to everyone</v-list-tile-sub-title
                    >
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Show your status</v-list-tile-title>
                    <v-list-tile-sub-title
                      >Your status is visible to everyone</v-list-tile-sub-title
                    >
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Show your status</v-list-tile-title>
                    <v-list-tile-sub-title
                      >Your status is visible to everyone</v-list-tile-sub-title
                    >
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-parallax>
    <EditThird :dialog="editing" @closeDialog="editing = false"></EditThird>
  </section>
</template>

<script>
import EditThird from './EditThird'
export default {
  name: 'Third',
  props: {
    secondaryCoverPicture: {
      type: String,
      required: true
    }
  },
  components: {
    EditThird
  },
  data() {
    return {
      editing: false
    }
  }
}
</script>

<style scoped></style>
