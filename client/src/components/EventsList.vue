<template>
  <v-card>
    <!-- FORM -->
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Upcoming Events</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="isAuth && user.isAdmin" @click="eventDialog = true" icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <template v-if="!loading && dataLoaded">
      <NewHopeDialog
        v-if="isAuth && user.isAdmin"
        header="Add an Event"
        :dialog="eventDialog"
        :is-full-screen="false"
        @close="eventDialog = false"
      >
        <v-card-text slot="content">
          <v-form v-model="isFormValid">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      v-model="eventName"
                      label="Event Name*"
                      :rules="[
                        v => !!v || 'Field cannot be empty',
                        v => (!!v && v.length < 25) || 'Max 25 Characters'
                      ]"
                      counter="25"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-layout row wrap>
                      <div class="my-2 mr-2">
                        <p>Event Start Time *</p>
                        <vue-timepicker
                          v-model="eventStartTime"
                          :minute-interval="5"
                          hide-clear-button
                        ></vue-timepicker>
                      </div>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12>
                    <v-menu
                      lazy
                      :close-on-content-click="false"
                      v-model="menu"
                      transition="scale-transition"
                      offset-y
                      full-width
                      :nudge-right="40"
                      max-width="290px"
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        label="Event Date *"
                        v-model="eventDate"
                        readonly
                      ></v-text-field>
                      <v-date-picker
                        v-model="eventDate"
                        no-title
                        scrollable
                        actions
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="eventLocation"
                      label="Event Location *"
                      :rules="[
                        v => !!v || 'Field cannot be empty',
                        v => (!!v && v.length < 30) || 'Max 30 Characters'
                      ]"
                      counter="30"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      counter="200"
                      label="Event Description"
                      v-model="eventDescription"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!isFormValid"
                color="blue darken-1"
                flat
                @click="saveEvent"
                >Save</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </NewHopeDialog>
      <template v-if="componentEvents.length">
        <v-list
          v-for="event in componentEvents"
          :key="event._id"
          two-line
          subheader
        >
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ event.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{
                `${event.location} | ${event.date} | ${event.startTime}`
              }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="isAuth && user.isAdmin">
              <v-btn icon ripple @click="deleteEventById(event._id)">
                <v-icon color="error">mdi-delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </template>
      <v-container v-else fluid fill-height>
        <v-layout align-center justify-center>
          <v-card-text class="subheading">No Upcoming Events</v-card-text>
        </v-layout>
      </v-container>
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
import NewHopeDialog from '@/components/NewHopeDialog.vue'
import VueTimepicker from 'vue2-timepicker'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'EventsList',
  props: {
    limit: {
      type: Number,
      default: 5
    }
  },
  components: {
    NewHopeDialog,
    VueTimepicker
  },
  data() {
    return {
      loading: false,
      dataLoaded: false,
      componentEvents: [],
      eventDialog: false,
      isFormValid: false,
      eventName: '',
      eventStartTime: {
        HH: '00',
        mm: '00'
      },
      eventLocation: '',
      eventDescription: '',
      eventDate: moment(new Date()).format('YYYY-MM-DD'),
      menu: false
    }
  },
  created() {
    this.loading = true
    this.loadEvents()
  },
  computed: {
    ...mapState('auth', ['isAuth', 'user'])
  },
  methods: {
    ...mapMutations(['showNotification']),
    loadEvents() {
      this.$axios
        .get(`/event?limit=${this.limit}`)
        .then(res => {
          this.componentEvents = res.data.map(event => {
            return Object.assign(event, {
              date: moment.parseZone(event.date).format('LL')
            })
          })
          ;(this.loading = false), (this.dataLoaded = true)
        })
        .catch(err => {
          this.error = err
          ;(this.loading = false), (this.dataLoaded = false)
        })
    },
    saveEvent() {
      const data = {
        name: this.eventName,
        startTime: `${this.eventStartTime.HH || '00'}${this.eventStartTime.mm ||
          '00'}`,
        date: moment(this.eventDate).format('YYYY-MM-DD'),
        location: this.eventLocation,
        description: this.eventDescription || ''
      }
      this.$axios
        .post('/event', data)
        .then(() => {
          this.eventDialog = false
          this.showNotification({
            y: 'top',
            x: 'right',
            mode: 'multi-line',
            timeout: 1500,
            text: `Event Added!`,
            color: 'success'
          })
          this.loadEvents()
        })
        .catch(() => {
          this.showNotification({
            y: 'top',
            x: 'right',
            mode: 'multi-line',
            timeout: 1500,
            text: `Oops, something went wrong. Try again.`,
            color: 'error'
          })
        })
    },
    deleteEventById(id) {
      if (confirm('Are you sure you want to delete the event?')) {
        this.$axios
          .delete(`/event/${id}`)
          .then(res => {
            this.showNotification({
              y: 'top',
              x: 'right',
              mode: 'multi-line',
              timeout: 1500,
              text: `Deleted Event: ${res.data.name}`,
              color: 'success'
            })
            this.loadEvents()
          })
          .catch(() => {
            this.showNotification({
              y: 'top',
              x: 'right',
              mode: 'multi-line',
              timeout: 1500,
              text: `Oops, something went wrong. Try again`,
              color: 'error'
            })
          })
      }
    }
  }
}
</script>

<style scoped></style>
