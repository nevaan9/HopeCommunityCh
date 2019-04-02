<template>
  <v-card-text>
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
                  v-model="mainHeader"
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
                  v-model="subHeader"
                  name="name"
                  label="Subheader Header"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  :rules="[
                    v => !!v || 'Field cannot be empty',
                    v => (!!v && v.length < 25) || 'Max 25 Characters'
                  ]"
                  counter="25"
                  class="ml-3"
                  v-model="buttonText"
                  name="name"
                  label="Button Text"
                  id="id"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex>
                <FileUploadeName
                  class="ml-3 mt-4"
                  :title="'Background Image'"
                  :selectType="'single'"
                  :selfUpload="false"
                  :over-ride-name="`MAIN_COVER_PICTURE`"
                  :requestFormdata="submitFormdataRequest"
                  :existingImage="mainCoverPic"
                  @formData="onFormData"
                ></FileUploadeName>
              </v-flex>
              <v-flex>
                <FileUploadeName
                  class="ml-3 mt-4"
                  :title="'Center Image'"
                  :selectType="'single'"
                  :over-ride-name="`MAIN_CENTER_PICTURE`"
                  :selfUpload="false"
                  :requestFormdata="submitFormdataRequest"
                  :existingImage="mainCenterPic"
                  @formData="onFormData"
                ></FileUploadeName>
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
import FileUploadeName from '../../components/FileuploadName'
export default {
  name: 'EditFirst',
  props: {
    heading: {
      type: String,
      default: null
    },
    subHeading: {
      type: String,
      default: null
    },
    mainBtnText: {
      type: String,
      default: null
    },
    coverPhoto: {
      type: String,
      default: null
    },
    centerPhoto: {
      type: String,
      default: null
    }
  },
  components: {
    FileUploadeName
  },
  data() {
    return {
      isFormValid: false,
      submitFormdataRequest: false,
      mainHeader: this.heading,
      subHeader: this.subHeading,
      buttonText: this.mainBtnText,
      mainCoverPic: this.coverPhoto,
      mainCenterPic: this.centerPhoto,
      formDataArray: []
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
        .then(function() {
          this.mainCoverPic = null
          this.mainCenterPic = null
        })
        .catch(function() {})
    },
    saveInfo() {
      this.$axios({
        method: 'post',
        url: `/editHome/first`,
        data: {
          heading: this.mainHeader,
          subHeading: this.subHeader
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
