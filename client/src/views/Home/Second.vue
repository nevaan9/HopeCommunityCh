<template>
  <section style="background-color: white">
    <v-layout shrink justify-end class="white--text">
      <v-btn color="primary mt-3" dark small @click="editing = true"
        >Edit</v-btn
      >
    </v-layout>
    <v-layout column wrap class="py-5" align-center>
      <v-flex xs12 sm4 class="my-3">
        <div class="text-xs-center">
          <h1 class="display-1">{{ churchesHeader }}</h1>
          <span class="subheading">{{ churchesSubHeader }}</span>
        </div>
      </v-flex>
      <v-card-text xs12>
        <v-container grid-list-xl>
          <v-layout row wrap align-center>
            <v-flex xs12 md6>
              <v-card class="elevation-0 transparent">
                <v-card-text class="text-xs-center">
                  <img
                    :src="churchOneInfo.picture"
                    alt="Vuetify.js"
                    height="200"
                  />
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div class="text-xs-center">
                    <h1>{{ churchOneInfo.location }}</h1>
                    <span>{{ churchOneInfo.time }}</span>
                  </div>
                </v-card-title>
                <v-card-text>{{ churchOneInfo.description }}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md6>
              <v-card class="elevation-0 transparent">
                <v-card-text class="text-xs-center">
                  <img
                    :src="churchTwoInfo.picture"
                    alt="Church2"
                    height="200"
                  />
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div class="text-xs-center">
                    <h1>{{ churchTwoInfo.location }}</h1>
                    <span>{{ churchTwoInfo.time }}</span>
                  </div>
                </v-card-title>
                <v-card-text>{{ churchTwoInfo.description }}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-layout>
    <!-- Edit Page -->
    <EditSecond :dialog="editing" @closeDialog="editing = false"></EditSecond>
  </section>
</template>

<script>
import EditSecond from './EditSecond'
export default {
  name: 'Second',
  props: {
    churchOneInfo: {
      type: Object,
      required: true
    },
    churchTwoInfo: {
      type: Object,
      required: true
    },
    churchesHeader: {
      type: String,
      required: true
    },
    churchesSubHeader: {
      type: String,
      required: true
    }
  },
  components: {
    EditSecond
  },
  data() {
    return {
      editing: false
    }
  }
}
</script>

<style scoped></style>
