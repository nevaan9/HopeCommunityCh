<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Upcoming Events</v-toolbar-title>
    </v-toolbar>
    <template v-if="!loading && dataLoaded">
      <v-list
        v-for="event in componentEvents"
        :key="event._id"
        two-line
        subheader
      >
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>{{ event.name }}</v-list-tile-title>
            <v-list-tile-sub-title>
              {{ `${event.location} | ${event.date} | ${event.startTime}` }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </template>
    <v-container v-if="loading" fluid fill-height>
      <v-layout align-center justify-center>
        <v-progress-circular
          :size="70"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-layout>
    </v-container>
    <v-container v-if="!loading && !dataLoaded" fluid fill-height>
      <v-layout align-center justify-center>
        <v-card-text class="subheading red--text">
          <v-alert :value="true" type="error"
            >Oops, there was an error loading the events</v-alert
          >
        </v-card-text>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  name: 'EventsList',
  props: {
    limit: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      loading: false,
      dataLoaded: false,
      componentEvents: []
    }
  },
  created() {
    this.loading = true
    this.$axios
      .get(`/event?limit=${this.limit}`)
      .then(res => {
        this.componentEvents = res.data.map(event => {
          return Object.assign(event, {
            date: moment(event.date).format('LL')
          })
        })
        ;(this.loading = false), (this.dataLoaded = true)
      })
      .catch(err => {
        this.error = err
        ;(this.loading = false), (this.dataLoaded = false)
      })
  }
}
</script>

<style scoped></style>
