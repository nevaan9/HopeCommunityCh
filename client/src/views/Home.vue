<template>
  <v-content>
    <NewHopeDialog
      :header="toolbarTitle"
      :dialog="editing"
      @close="editing = false"
    >
      <component
        @save="onSave"
        slot="content"
        :is="currentEditDialog"
      ></component>
    </NewHopeDialog>
    <div v-if="dataLoaded">
      <!-- MAIN HEADER SECTION -->
      <section>
        <v-parallax
          :src="`/image/${firstViewData.mainCoverPicture}`"
          height="620"
        >
          <v-layout shrink justify-end class="white--text">
            <v-btn
              class="black lighten-2 mt-3"
              dark
              small
              @click="goToLoginPage"
              >Member Log In</v-btn
            >
            <v-btn
              color="primary mt-3"
              dark
              small
              @click="openEditMenu('EditFirst')"
              >Edit</v-btn
            >
          </v-layout>
          <v-layout column align-center justify-center class="white--text">
            <img
              :src="`/image/${firstViewData.mainCenterPicture}`"
              alt="New Home Community"
              height="200"
            />
            <h1 class="white--text mb-2 display-1 text-xs-center">
              {{ firstViewData.heading }}
            </h1>
            <span>{{ firstViewData.subHeading }}</span>
            <v-btn
              class="black lighten-2 mt-5"
              dark
              large
              href="/pre-made-themes"
              >{{ firstViewData.mainButtonText }}</v-btn
            >
          </v-layout>
        </v-parallax>
        <!-- Edit Page -->
        <!-- <EditFirst :dialog="editing" @closeDialog="editing = false"></EditFirst> -->
      </section>
      <!-- OUR CHURCHES SECTION -->
      <section style="background-color: white">
        <v-layout shrink justify-end class="white--text">
          <v-btn
            color="primary mt-3"
            dark
            small
            @click="openEditMenu('EditSecond')"
            >Edit</v-btn
          >
        </v-layout>
        <v-layout column wrap class="py-5" align-center>
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h1 class="display-1">{{ secondViewData.churchesHeader }}</h1>
              <span class="subheading">
                {{ secondViewData.churchesSubHeader }}
              </span>
            </div>
          </v-flex>
          <v-card-text xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <img
                        :src="secondViewData.churchOneInfo.picture"
                        alt="Vuetify.js"
                        height="200"
                      />
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="text-xs-center">
                        <h1>{{ secondViewData.churchOneInfo.location }}</h1>
                        <span>{{ secondViewData.churchOneInfo.time }}</span>
                      </div>
                    </v-card-title>
                    <v-card-text>
                      {{ secondViewData.churchOneInfo.description }}
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <img
                        :src="secondViewData.churchTwoInfo.picture"
                        alt="Church2"
                        height="200"
                      />
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="text-xs-center">
                        <h1>{{ secondViewData.churchTwoInfo.location }}</h1>
                        <span>{{ secondViewData.churchTwoInfo.time }}</span>
                      </div>
                    </v-card-title>
                    <v-card-text>
                      {{ secondViewData.churchTwoInfo.description }}
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-layout>
        <!-- Edit Page -->
        <!-- <EditSecond :dialog="editing" @closeDialog="editing = false"></EditSecond> -->
      </section>
      <Third
        :secondary-cover-picture="thirdViewData.secondaryCoverPicture"
      ></Third>
      <Fourth
        :church-info-section-one="fourthViewData.churchInfoSectionOne"
        :church-info-section-two="fourthViewData.churchInfoSectionTwo"
      ></Fourth>
      <Fifth></Fifth>
    </div>
    <div v-if="loading">
      <v-layout align-center justify-center row fill-height>
        <v-flex xs12 sm8 md4>
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="error">{{ `Error: ${this.error}` }}</div>
  </v-content>
</template>

<script>
import NewHopeDialog from '@/components/NewHopeDialog.vue'
import EditFirst from './Home/EditFirst'
import EditSecond from './Home/EditSecond'
import Third from './Home/Third'
import Fourth from './Home/Fourth'
import Fifth from './Home/Fifth'
import axios from 'axios'
import _ from 'lodash'
export default {
  name: 'Home',
  components: {
    EditFirst,
    EditSecond,
    Third,
    Fourth,
    Fifth,
    NewHopeDialog
  },
  data() {
    return {
      dataLoaded: false,
      loading: false,
      error: null,
      firstViewData: {},
      secondViewData: {},
      thirdViewData: {},
      fourthViewData: {},
      editing: false,
      currentEditDialog: 'EditFirst',
      toolbarTitle: 'Edit Menu'
    }
  },
  created() {
    this.loading = true
    this.loadHomePage()
  },
  methods: {
    onSave(data) {
      console.log(data)
      this.editing = false
    },
    openEditMenu(editDialog) {
      this.currentEditDialog = editDialog
      switch (editDialog) {
        case 'EditFirst':
          this.toolbarTitle = 'Edit Main Header'
          break
        case 'EditSecond':
          this.toolbarTitle = 'Edit Secondary Header'
          break
        default:
          this.toolbarTitle = 'Edit Menu'
          break
      }
      this.editing = true
    },
    goToLoginPage() {
      this.$router.push({ name: 'login' })
    },
    loadHomePage() {
      axios
        .get('/home')
        .then(res => {
          const homeObj = res.data
          this.firstViewData = _.pick(homeObj, [
            'heading',
            'subHeading',
            'mainButtonText',
            'mainCenterPicture',
            'mainCoverPicture'
          ])
          this.secondViewData = _.pick(homeObj, [
            'churchesHeader',
            'churchesSubHeader',
            'churchOneInfo',
            'churchTwoInfo'
          ])

          this.thirdViewData = _.pick(homeObj, ['secondaryCoverPicture'])

          this.fourthViewData = _.pick(homeObj, [
            'churchInfoSectionOne',
            'churchInfoSectionTwo'
          ])
          this.dataLoaded = true
        })
        .catch(e => {
          this.error = e
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
