<template>
  <v-card-text>
    <v-container grid-list-xs fluid pt-0 style="max-width: 1000px">
      <v-layout row wrap>
        <v-flex>
          <FileUploadeName
            :title="'Secondary Cover Photo'"
            :selectType="'single'"
            :selfUpload="false"
            :over-ride-name="`SECONDARY_COVER_PICTURE`"
            :requestFormdata="submitFormdataRequest"
            @formData="onFormData"
          ></FileUploadeName>
        </v-flex>
        <v-flex>
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title>Upcoming Events</v-toolbar-title>
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
                    <v-icon color="grey lighten-1">info</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">info</v-icon>
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
import FileUploadeName from '../../components/FileuploadName'
export default {
  name: 'EditThird',
  components: {
    FileUploadeName
  },
  data() {
    return {
      submitFormdataRequest: false
    }
  },
  methods: {
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
