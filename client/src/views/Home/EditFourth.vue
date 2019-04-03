<template>
  <v-card-text>
    <v-form v-model="isFormValid">
      <v-container grid-list-xs fluid pt-0 style="max-width: 1000px">
        <v-layout row wrap>
          <v-flex>
            <v-card class="mt-4" max-width="400px">
              <v-subheader>Extra Information Section One</v-subheader>
              <v-text-field
                :rules="[
                  v => !!v || 'Field cannot be empty',
                  v => (!!v && v.length < 25) || 'Max 25 Characters'
                ]"
                counter="25"
                v-model="infoSectionOneTitle"
                class="pl-3 pr-5"
                label="Info One Header"
              ></v-text-field>
              <v-textarea
                :rules="[
                  v => !!v || 'Field cannot be empty',
                  v => (!!v && v.length < 200) || 'Max 200 Characters'
                ]"
                counter="200"
                class="ml-3 pr-5"
                v-model="infoSectionOneDescription"
                label="Outline textarea"
              ></v-textarea>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card class="mt-4" max-width="400px">
              <v-subheader>Extra Information Section Two</v-subheader>
              <v-text-field
                :rules="[
                  v => !!v || 'Field cannot be empty',
                  v => (!!v && v.length < 25) || 'Max 25 Characters'
                ]"
                counter="25"
                v-model="infoSectionTwoTitle"
                class="pl-3 pr-5"
                label="Info One Header"
              ></v-text-field>
              <v-textarea
                :rules="[
                  v => !!v || 'Field cannot be empty',
                  v => (!!v && v.length < 200) || 'Max 200 Characters'
                ]"
                counter="200"
                v-model="infoSectionTwoDescription"
                class="ml-3 pr-5"
                label="Outline textarea"
              ></v-textarea>
            </v-card>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-btn
            :disabled="!isFormValid"
            class="mt-3"
            color="secondary"
            @click="saveInfo"
            >Save</v-btn
          >
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card-text>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'EditForth',
  data() {
    return {
      isFormValid: false,
      infoSectionOneTitle: null,
      infoSectionOneDescription: null,
      infoSectionTwoTitle: null,
      infoSectionTwoDescription: null
    }
  },
  methods: {
    saveInfo() {
      // Build the church information
      const churchInfoSectionOne = {
        title: this.infoSectionOneTitle,
        description: this.infoSectionOneDescription
      }
      const churchInfoSectionTwo = {
        title: this.infoSectionTwoTitle,
        description: this.infoSectionTwoDescription
      }
      this.$axios({
        method: 'post',
        url: `/editHome/fourth`,
        data: {
          churchInfoSectionOne,
          churchInfoSectionTwo
        },
        config: { headers: { 'Content-Type': 'application/json' } }
      })
        .then(() => {
          this.$router.go()
        })
        .catch(() => {
          this.showNotification({
            y: 'top',
            x: 'right',
            mode: 'multi-line',
            timeout: 5000,
            text: `Opps, Something went wrong. Try Again.`,
            color: 'error'
          })
        })
    }
  },
  created() {
    this.infoSectionOneTitle = this.churchInfoSectionOne.title
    this.infoSectionOneDescription = this.churchInfoSectionOne.description
    this.infoSectionTwoTitle = this.churchInfoSectionTwo.title
    this.infoSectionTwoDescription = this.churchInfoSectionTwo.description
  },
  computed: {
    ...mapState('home', ['churchInfoSectionOne', 'churchInfoSectionTwo'])
  }
}
</script>

<style scoped></style>
