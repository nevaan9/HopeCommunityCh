<template>
  <v-card-text>
    <v-container grid-list-xs fluid pt-0 style="max-width: 1000px">
      <v-layout row wrap>
        <v-flex>
          <v-layout column>
            <v-flex xs4>
              <v-text-field
                class="ml-3"
                v-model="mainHeader"
                name="name"
                label="Main Header"
                id="id"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                class="ml-3"
                v-model="subHeader"
                name="name"
                label="Subheader Header"
                id="id"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
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
  </v-card-text>
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
