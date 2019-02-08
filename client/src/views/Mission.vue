<template>
  <v-content>
    <FileUploadName
      :selectType="'single'"
      :selfUpload="false"
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
    recieveFormdata(formData) {
      console.log(formData)
      this.submitFormdataRequest = false
    }
  }
}
</script>

<style scoped></style>
