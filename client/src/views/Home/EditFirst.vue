<template>
  <!-- Edit Page -->
  <v-dialog
    max-width="900px"
    v-model="dialog"
    scrollable
    persistent
    transition="dialog-transition"
  >
    <v-card>
      <v-toolbar class="black headline white--text">
        Edit Main Header
        <v-spacer></v-spacer>
        <v-btn dark small fab flat @click="$emit('closeDialog')">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </v-toolbar>
      <v-layout row wrap justify-space-around>
        <FileUploadeName
          :title="'Background Image'"
          :selectType="'single'"
          :selfUpload="false"
          :over-ride-name="`MAIN_COVER_PICTURE`"
          :requestFormdata="submitFormdataRequest"
          @sendingFormData="recieveFormdata"
        ></FileUploadeName>
        <FileUploadeName
          :title="'Center Image'"
          :selectType="'single'"
          :over-ride-name="`MAIN_CENTER_PICTURE`"
          :selfUpload="false"
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
      <v-card-actions>
        <v-btn color="secondary">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FileUploadeName from '../../components/FileuploadName'
export default {
  name: 'First',
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
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
      console.log('Sending file to server!')
      this.$axios({
        method: 'post',
        url: '/test',
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then(function(response) {
          //handle success
          console.log(response)
        })
        .catch(function(response) {
          //handle error
          console.log(response)
        })
    }
  }
}
</script>

<style scoped></style>
