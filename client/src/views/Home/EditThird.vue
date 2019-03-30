<template>
  <v-layout row wrap justify-space-around>
    <FileUploadeName
      :title="'Secondary Cover Photo'"
      :selectType="'single'"
      :selfUpload="false"
      :over-ride-name="`SECONDARY_COVER_PICTURE`"
      :requestFormdata="submitFormdataRequest"
      @formData="onFormData"
    ></FileUploadeName>
  </v-layout>
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
