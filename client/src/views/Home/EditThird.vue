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
            :existingImage="secondCoverPhoto"
            @formData="onFormData"
          ></FileUploadeName>
        </v-flex>
        <v-flex>
          <EventsList></EventsList>
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
import EventsList from '@/components/EventsList.vue'
import FileUploadeName from '../../components/FileuploadName'
export default {
  name: 'EditThird',
  components: {
    FileUploadeName,
    EventsList
  },
  data() {
    return {
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
    saveInfo() {
      this.$router.go()
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
