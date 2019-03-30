<template>
  <div>
    <v-layout row wrap justify-space-around>
      <FileUploadeName
        :title="'Background Image'"
        :selectType="'single'"
        :selfUpload="false"
        :over-ride-name="`MAIN_COVER_PICTURE`"
        :requestFormdata="submitFormdataRequest"
        @formData="onFormData"
      ></FileUploadeName>
      <FileUploadeName
        :title="'Center Image'"
        :selectType="'single'"
        :over-ride-name="`MAIN_CENTER_PICTURE`"
        :selfUpload="false"
        :requestFormdata="submitFormdataRequest"
        @formData="onFormData"
      ></FileUploadeName>
    </v-layout>
    <v-layout row wrap justify-space-around>
      <v-container grid-list-xs fluid pt-0>
        <v-text-field
          v-model="mainHeader"
          name="name"
          label="Main Header"
          id="id"
        ></v-text-field>
        <v-text-field
          v-model="subHeader"
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
  name: 'EditFirst',
  components: {
    FileUploadeName
  },
  data() {
    return {
      submitFormdataRequest: false,
      mainHeader: '',
      subHeader: '',
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
        .then(function() {})
        .catch(function() {})
    },
    saveInfo() {
      this.$axios({
        method: 'post',
        url: `/edit/home/first`,
        data: {
          mainHeader: this.mainHeader,
          subHeader: this.subHeader
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
