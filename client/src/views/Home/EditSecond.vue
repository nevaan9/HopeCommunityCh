<template>
  <v-card-text class="pa-1">
    <v-form v-model="isFormValid">
      <v-container grid-list-xs fluid pt-0 style="max-width: 1000px">
        <v-layout row wrap>
          <v-flex>
            <v-layout column>
              <v-flex xs4>
                <v-text-field
                  :rules="[
                    v => !!v || 'Field cannot be empty',
                    v => (!!v && v.length < 30) || 'Max 30 Characters'
                  ]"
                  counter="30"
                  class="ml-3"
                  v-model="heading"
                  name="name"
                  label="Main Header"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  :rules="[
                    v => !!v || 'Field cannot be empty',
                    v => (!!v && v.length < 50) || 'Max 50 Characters'
                  ]"
                  counter="50"
                  class="ml-3"
                  v-model="subHeading"
                  name="name"
                  label="Subheader Header"
                  id="id"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex d-flex>
                <v-layout column>
                  <v-card class="mt-4" max-width="400px">
                    <v-subheader>First Church Info</v-subheader>
                    <FileUploadeName
                      class="ml-3 mt-4"
                      :title="'First Church Image'"
                      :selectType="'single'"
                      :selfUpload="false"
                      :over-ride-name="`CHURCH_ONE_PICTURE`"
                      :requestFormdata="submitFormdataRequest"
                      :existingImage="churchOnePicture"
                      @formData="onFormData"
                    ></FileUploadeName>
                    <v-text-field
                      :rules="[
                        v => !!v || 'Field cannot be empty',
                        v => (!!v && v.length < 20) || 'Max 20 Characters'
                      ]"
                      counter="20"
                      class="ml-3 pr-5"
                      v-model="churchOneLocation"
                      label="Location"
                    ></v-text-field>
                    <v-text-field
                      :rules="[
                        v => !!v || 'Field cannot be empty',
                        v => (!!v && v.length < 20) || 'Max 20 Characters'
                      ]"
                      counter="20"
                      class="ml-3 pr-5"
                      v-model="churchOneTime"
                      label="Time"
                    ></v-text-field>
                    <v-textarea
                      :rules="[
                        v => !!v || 'Field cannot be empty',
                        v => (!!v && v.length < 200) || 'Max 200 Characters'
                      ]"
                      counter="200"
                      class="ml-3 pr-5"
                      name="input-7-4"
                      v-model="churchOneDescription"
                      label="Outline textarea"
                    ></v-textarea>
                  </v-card>
                </v-layout>
              </v-flex>
              <v-flex d-flex>
                <v-layout column>
                  <v-card class="mt-4" max-width="400px">
                    <v-subheader>Second Church Info</v-subheader>
                    <FileUploadeName
                      class="ml-3 mt-4"
                      :title="'Second Church Image'"
                      :selectType="'single'"
                      :selfUpload="false"
                      :over-ride-name="`CHURCH_TWO_PICTURE`"
                      :requestFormdata="submitFormdataRequest"
                      :existingImage="churchTwoPicture"
                      @formData="onFormData"
                    ></FileUploadeName>
                    <v-text-field
                      v-model="heading"
                      :rules="[
                        v => !!v || 'Field cannot be empty',
                        v => (!!v && v.length < 20) || 'Max 20 Characters'
                      ]"
                      counter="20"
                      class="ml-3 pr-5"
                      name="name"
                      label="Location"
                    ></v-text-field>
                    <v-text-field
                      :rules="[
                        v => !!v || 'Field cannot be empty',
                        v => (!!v && v.length < 20) || 'Max 20 Characters'
                      ]"
                      counter="20"
                      class="ml-3 pr-5"
                      v-model="churchTwoTime"
                      name="name"
                      label="Time"
                    ></v-text-field>
                    <v-textarea
                      :rules="[
                        v => !!v || 'Field cannot be empty',
                        v => (!!v && v.length < 200) || 'Max 200 Characters'
                      ]"
                      counter="200"
                      class="ml-3 pr-5"
                      name="input-7-4"
                      label="Outline textarea"
                      v-model="churchTwoDescription"
                    ></v-textarea>
                  </v-card>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-card-actions>
            <v-btn class="mt-3" color="secondary" @click="saveInfo">Save</v-btn>
          </v-card-actions>
        </v-layout>
      </v-container>
    </v-form>
  </v-card-text>
</template>

<script>
import { mapState } from 'vuex'
import FileUploadeName from '../../components/FileuploadName'
export default {
  name: 'EditSecond',
  components: {
    FileUploadeName
  },
  data() {
    return {
      isFormValid: false,
      submitFormdataRequest: false,
      heading: null,
      subHeading: null,
      churchTwoDescription: null,
      churchTwoLocation: null,
      churchTwoTime: null,
      churchTwoPicture: null,
      churchOneDescription: null,
      churchOneLocation: null,
      churchOneTime: null,
      churchOnePicture: null
    }
  },
  created() {
    this.heading = this.churchesHeader
    this.subHeading = this.churchesSubHeader
    this.churchTwoDescription = this.churchTwoInfo.description
    this.churchTwoLocation = this.churchTwoInfo.description
    this.churchTwoTime = this.churchTwoInfo.description
    this.churchTwoPicture = this.churchTwoInfo.picture
    this.churchOneDescription = this.churchOneInfo.description
    this.churchOneLocation = this.churchOneInfo.location
    this.churchOneTime = this.churchOneInfo.time
    this.churchOnePicture = this.churchOneInfo.picture
  },
  computed: {
    ...mapState('home', [
      'churchesHeader',
      'churchesSubHeader',
      'secondaryCoverPicture',
      'churchOneInfo',
      'churchTwoInfo',
      'churchInfoSectionOne',
      'churchInfoSectionTwo'
    ])
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
    },
    saveInfo() {
      this.$axios({
        method: 'post',
        url: `/editHome/second`,
        data: {
          heading: this.heading,
          subHeading: this.subHeading
        },
        config: { headers: { 'Content-Type': 'application/json' } }
      })
        .then(function() {})
        .catch(function() {})
      this.$emit('close')
    }
  }
}
</script>

<style scoped></style>
