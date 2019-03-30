<template>
  <div>
    <v-layout row wrap justify-space-around>
      <FileUploadeName
        :title="'First Church Image'"
        :selectType="'single'"
        :selfUpload="false"
        :over-ride-name="`CHURCH_ONE_PICTURE`"
        :requestFormdata="submitFormdataRequest"
        @sendingFormData="recieveFormdata"
      ></FileUploadeName>
      <FileUploadeName
        :title="'Second Church Image'"
        :selectType="'single'"
        :selfUpload="false"
        :over-ride-name="`CHURCH_TWO_PICTURE`"
        :requestFormdata="submitFormdataRequest"
        @sendingFormData="recieveFormdata"
      ></FileUploadeName>
    </v-layout>
    <v-layout row wrap justify-space-around>
      <v-container grid-list-xs fluid pt-0>
        <v-text-field name="name" label="Main Header" id="id"></v-text-field>
        <v-text-field
          name="name"
          label="Subheader Header"
          id="id"
        ></v-text-field>
      </v-container>
    </v-layout>
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
      submitFormdataRequest: false
    }
  },
  methods: {
    recieveFormdata(formData) {
      this.$axios({
        method: 'post',
        url: '/test',
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then(function() {
          //handle success
        })
        .catch(function() {
          //handle error
        })
    }
  }
}
</script>

<style scoped></style>
