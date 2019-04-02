<template>
  <v-card-text>
    <!-- FORM -->
    <NewHopeDialog
      header="Add an Event"
      :dialog="eventDialog"
      :is-full-screen="false"
      @close="eventDialog = false"
    >
      <v-form slot="content" v-model="isFormValid">
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Event Name*"
                  :rules="[
                    v => !!v || 'Field cannot be empty',
                    v => (!!v && v.length < 25) || 'Max 25 Characters'
                  ]"
                  counter="25"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Event Time *"
                  hint="Input a start and End time"
                  :rules="[
                    v => !!v || 'Field cannot be empty',
                    v => (!!v && v.length < 20) || 'Max 20 Characters'
                  ]"
                  counter="20"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Event Location *"
                  :rules="[
                    v => !!v || 'Field cannot be empty',
                    v => (!!v && v.length < 20) || 'Max 20 Characters'
                  ]"
                  counter="20"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  :rules="[v => v.length < 200 || 'Max 200 Characters']"
                  counter="200"
                  label="Outline textarea"
                  v-model="eventDescription"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="saveEvent">Save</v-btn>
        </v-card-actions>
      </v-form>
    </NewHopeDialog>
    <v-container grid-list-xs fluid pt-0 style="max-width: 1000px">
      <v-layout row wrap>
        <v-flex>
          <FileUploadeName
            :title="'Secondary Cover Photo'"
            :selectType="'single'"
            :selfUpload="false"
            :over-ride-name="`SECONDARY_COVER_PICTURE`"
            :requestFormdata="submitFormdataRequest"
            :existingImage="secondCoverPhoto"
            @formData="onFormData"
          ></FileUploadeName>
        </v-flex>
        <v-flex>
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title>Upcoming Events</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn @click="eventDialog = true" icon>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-toolbar>
            <v-list v-for="n in 5" :key="n" two-line subheader>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ `Event Number ${n}` }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title
                    >Alexandria, VA - 03/23/2019 - 6pm -
                    9pm</v-list-tile-sub-title
                  >
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="accent">mdi-pencil</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
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
import { mapState } from 'vuex'
import NewHopeDialog from '@/components/NewHopeDialog.vue'
import FileUploadeName from '../../components/FileuploadName'
export default {
  name: 'EditThird',
  components: {
    FileUploadeName,
    NewHopeDialog
  },
  data() {
    return {
      eventDialog: false,
      isFormValid: false,
      eventDescription: null,
      secondCoverPhoto: null,
      submitFormdataRequest: false
    }
  },
  created() {
    this.secondCoverPhoto = this.secondaryCoverPicture
  },
  computed: {
    ...mapState('home', ['secondaryCoverPicture'])
  },
  methods: {
    saveEvent() {
      alert('Save the event!')
    },
    onFormData({ formData, filename }) {
      this.$axios({
        method: 'post',
        url: `/image/${filename}`,
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then(function() {})
        .catch(function() {})
    }
  }
}
</script>

<style scoped></style>
