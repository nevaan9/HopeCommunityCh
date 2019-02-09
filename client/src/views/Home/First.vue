<template>
  <section>
    <v-parallax
      src="https://raw.githubusercontent.com/vuetifyjs/parallax-starter/master/template/assets/hero.jpeg"
      height="620"
    >
      <v-layout shrink justify-end class="white--text">
        <v-btn class="black lighten-2 mt-3" dark small @click="goToLoginPage"
          >Member Log In</v-btn
        >
      </v-layout>
      <v-layout column align-center justify-center class="white--text">
        <img
          src="https://raw.githubusercontent.com/vuetifyjs/parallax-starter/master/template/assets/logo.png"
          alt="Vuetify.js"
          height="200"
        />
        <h1 class="white--text mb-2 display-1 text-xs-center">
          Hope Community Church
        </h1>

        <v-btn class="black lighten-2 mt-5" dark large href="/pre-made-themes"
          >Who are we?</v-btn
        >
      </v-layout>
      <v-layout shrink justify-end class="white--text">
        <v-btn color="primary" @click="editing = true">Edit</v-btn>
      </v-layout>
    </v-parallax>
    <v-dialog
      max-width="600px"
      v-model="editing"
      scrollable
      persistent
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar class="black headline white--text"
          >Edit Main Header
          <v-spacer></v-spacer>
          <v-btn dark small fab flat @click="editing = false">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-toolbar>
        <v-layout row wrap justify-space-around>
          <FileUploadeName
            :title="'Background Image'"
            :selectType="'single'"
            :selfUpload="false"
            :requestFormdata="submitFormdataRequest"
            @sendingFormData="recieveFormdata"
          ></FileUploadeName>
          <FileUploadeName
            :title="'Center Image'"
            :selectType="'single'"
            :selfUpload="false"
            :requestFormdata="submitFormdataRequest"
            @sendingFormData="recieveFormdata"
          ></FileUploadeName>
        </v-layout>
        <v-layout row wrap justify-space-around>
          <v-container grid-list-xs fluid pt-0>
            <v-text-field
              name="name"
              label="Main Header"
              id="id"
            ></v-text-field>
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
  </section>
</template>

<script>
import FileUploadeName from '../../components/FileuploadName'
export default {
  name: 'First',
  components: {
    FileUploadeName
  },
  data() {
    return {
      editing: false
    }
  },
  methods: {
    goToLoginPage() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped></style>
