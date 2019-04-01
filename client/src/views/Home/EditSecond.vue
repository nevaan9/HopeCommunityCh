<template>
  <v-card-text>
    <v-container grid-list-xs fluid pt-0 style="max-width: 1000px">
      <v-layout row wrap>
        <v-flex>
          <v-layout column>
            <v-flex xs4>
              <v-text-field
                class="ml-3"
                v-model="heading"
                name="name"
                label="Main Header"
                id="id"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
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
                    @formData="onFormData"
                  ></FileUploadeName>
                  <v-text-field
                    class="ml-3 pr-5"
                    v-model="heading"
                    name="name"
                    label="Location"
                  ></v-text-field>
                  <v-text-field
                    class="ml-3 pr-5"
                    v-model="heading"
                    name="name"
                    label="Time"
                  ></v-text-field>
                  <v-textarea
                    class="ml-3 pr-5"
                    name="input-7-4"
                    label="Outline textarea"
                    value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
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
                    @formData="onFormData"
                  ></FileUploadeName>
                  <v-text-field
                    class="ml-3 pr-5"
                    v-model="heading"
                    name="name"
                    label="Location"
                  ></v-text-field>
                  <v-text-field
                    class="ml-3 pr-5"
                    v-model="heading"
                    name="name"
                    label="Time"
                  ></v-text-field>
                  <v-textarea
                    class="ml-3 pr-5"
                    name="input-7-4"
                    label="Outline textarea"
                    value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
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
  </v-card-text>
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
