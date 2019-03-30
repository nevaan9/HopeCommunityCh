<template>
  <div>
    <v-layout row wrap justify-space-around>
      <FileUploadeName
        :title="'First Church Image'"
        :selectType="'single'"
        :selfUpload="false"
        :over-ride-name="`CHURCH_ONE_PICTURE`"
        :requestFormdata="submitFormdataRequest"
        @formData="onFormData"
      ></FileUploadeName>
      <FileUploadeName
        :title="'Second Church Image'"
        :selectType="'single'"
        :selfUpload="false"
        :over-ride-name="`CHURCH_TWO_PICTURE`"
        :requestFormdata="submitFormdataRequest"
        @formData="onFormData"
      ></FileUploadeName>
    </v-layout>
    <v-layout row wrap justify-space-around>
      <v-container grid-list-xs fluid pt-0>
        <v-text-field
          v-model="heading"
          name="name"
          label="Main Header"
          id="id"
        ></v-text-field>
        <v-text-field
          v-model="subHeading"
          name="name"
          label="Subheader Header"
          id="id"
        ></v-text-field>
      </v-container>
    </v-layout>
    <v-card-actions>
      <v-btn color="secondary" @click="saveInfo">Save</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import FileUploadeName from '../../components/FileuploadName'
export default {
  name: 'EditSecond',
  components: {
    FileUploadeName
  },
  data() {
    return {
      heading: '',
      subHeading: '',
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
