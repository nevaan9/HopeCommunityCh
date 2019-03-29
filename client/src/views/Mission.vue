<template>
  <v-content>
    <FileUploadName
      :title="'Select a Profile Picture'"
      :selectType="'single'"
      :selfUpload="false"
      :requestFormdata="submitFormdataRequest"
      @sendingFormData="recieveFormdata"
    ></FileUploadName>
    <FileUploadName
      :title="'Upload pictures'"
      :selectType="'multiple'"
      :selfUpload="true"
      :requestFormdata="submitFormdataRequest"
      @sendingFormData="recieveFormdata"
    ></FileUploadName>
    <v-btn color="secondary" @click="submitFormdataRequest = true">save</v-btn>
  </v-content>
</template>

<script>
import FileUploadName from '../components/FileuploadName'
export default {
  name: 'Mission',
  components: {
    FileUploadName
  },
  data() {
    return {
      submitFormdataRequest: false
    }
  },
  methods: {
    recieveFormdata() {
      this.submitFormdataRequest = false
    }
  }
}
</script>

<style scoped></style>
