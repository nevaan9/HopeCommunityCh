<template>
  <v-content>
    <div v-if="dataLoaded">
      <NewHopeDialog
        :header="toolbarTitle"
        :dialog="editing"
        :is-full-screen="true"
        @close="editing = false"
      >
        <component
          @close="editing = false"
          slot="content"
          :is="currentEditDialog"
        ></component>
      </NewHopeDialog>
      <!-- MAIN HEADER SECTION -->
      <section>
        <v-parallax :src="`/image/${mainCoverPicture}`" height="620">
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
              :src="`/image/${mainCenterPicture}`"
              alt="New Home Community"
              height="200"
            />
            <h1 class="white--text mb-2 display-1 text-xs-center">
              {{ heading }}
            </h1>
            <span>{{ subHeading }}</span>
            <v-btn
              class="black lighten-2 mt-5"
              dark
              large
              href="/pre-made-themes"
              >{{ mainButtonText }}</v-btn
            >
          </v-layout>
        </v-parallax>
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
              <h1 class="display-1">{{ churchesHeader }}</h1>
              <span class="subheading">{{ churchesSubHeader }}</span>
            </div>
          </v-flex>
          <v-card-text xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <img
                        :src="`/image/${churchOneInfo.picture}`"
                        alt="Vuetify.js"
                        height="200"
                      />
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="text-xs-center">
                        <h1>{{ churchOneInfo.location }}</h1>
                        <span>{{ churchOneInfo.time }}</span>
                      </div>
                    </v-card-title>
                    <v-card-text>{{ churchOneInfo.description }}</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <img
                        :src="`/image/${churchTwoInfo.picture}`"
                        alt="Church2"
                        height="200"
                      />
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="text-xs-center">
                        <h1>{{ churchTwoInfo.location }}</h1>
                        <span>{{ churchTwoInfo.time }}</span>
                      </div>
                    </v-card-title>
                    <v-card-text>{{ churchTwoInfo.description }}</v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-layout>
        <!-- THIRD SECTION -->
      </section>
      <v-parallax :src="`/image/${secondaryCoverPicture}`">
        <v-layout shrink justify-end class="white--text">
          <v-btn
            style="z-index: 5"
            color="primary mt-3"
            dark
            small
            @click="openEditMenu('EditThird')"
            >Edit</v-btn
          >
        </v-layout>
        <v-container grid-list-lg>
          <v-layout align-center justify-center row wrap fill-height>
            <v-flex>
              <v-card>
                <v-toolbar color="primary" dark>
                  <v-toolbar-title>Upcoming Events</v-toolbar-title>
                </v-toolbar>
                <v-list v-for="n in 5" :key="n" two-line subheader>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ `Event Number ${n}` }}
                      </v-list-tile-title>
                      <v-list-tile-sub-title
                        >Alexandria, VA - 03/23/2019 - 6pm -
                        9pm</v-list-tile-sub-title
                      >
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-parallax>
      <section>
        <v-layout shrink justify-end class="white--text">
          <v-btn
            color="primary mt-3"
            dark
            small
            @click="openEditMenu('EditFourth')"
            >Edit</v-btn
          >
        </v-layout>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="py-5">
            <v-flex xs12 sm6 mb-3>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">{{ churchInfoSectionOne.title }}</div>
                </v-card-title>
                <v-card-text>{{
                  churchInfoSectionOne.description
                }}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm6 mb-3>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">{{ churchInfoSectionTwo.title }}</div>
                </v-card-title>
                <v-card-text>{{
                  churchInfoSectionTwo.description
                }}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs12 md4 v-for="n in 3" :key="n">
                  <v-card class="elevation-0" color="black">
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline white--text">
                        Sermon: Knowing God
                      </div>
                    </v-card-title>
                    <v-card-text class="white--text">
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla
                      volutpat tincidunt ornare. Pellentesque habitant morbi
                      tristique senectus et netus et malesuada fames ac turpis
                      egestas. Nullam in aliquet odio. Aliquam eu est vitae
                      tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                    <v-card-actions>
                      <v-btn dark flat>Go to sermon</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
      <!-- FIFTH SECTION -->
      <section>
        <v-card color="indigo lighten-1 white--text">
          <v-card-text>
            <v-layout row wrap my-3>
              <v-flex xs12 md6>
                <v-layout row wrap align-start justify-start grow>
                  <v-flex v-for="n in 3" :key="n">
                    <v-card class="elevation-0 transparent">
                      <span class="headline">title</span>
                      <p v-for="n in 4" :key="n">Loremipsumkolo</p>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 md6>
                <v-card class="text-xs-left" style="max-width:700px">
                  <v-toolbar class="title black white--text"
                    >Subscribe to Our Mailing List!</v-toolbar
                  >
                  <v-card-text class="white darken-4">
                    <v-layout row wrap>
                      <v-text-field
                        label="Outline"
                        single-line
                        outline
                      ></v-text-field>
                      <v-btn class="color.black">Subscribe</v-btn>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </section>
    </div>
    <div v-if="dataLoading">
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
import { mapState } from 'vuex'
import NewHopeDialog from '@/components/NewHopeDialog.vue'
import EditFirst from './Home/EditFirst'
import EditSecond from './Home/EditSecond'
import EditThird from './Home/EditThird'
import EditFourth from './Home/EditFourth'
export default {
  name: 'Home',
  components: {
    EditFirst,
    EditSecond,
    EditThird,
    EditFourth,
    NewHopeDialog
  },
  data() {
    return {
      editing: false,
      currentEditDialog: 'EditFirst',
      toolbarTitle: 'Edit Menu'
    }
  },
  created() {
    this.loadHomePage()
  },
  computed: {
    ...mapState('home', [
      'loading',
      'error',
      'heading',
      'subHeading',
      'mainButtonText',
      'mainCoverPicture',
      'mainCenterPicture',
      'churchesHeader',
      'churchesSubHeader',
      'secondaryCoverPicture',
      'churchOneInfo',
      'churchTwoInfo',
      'churchInfoSectionOne',
      'churchInfoSectionTwo'
    ]),
    dataLoading() {
      return this.loading
    },
    dataLoaded() {
      return this.loading === false && this.error === false
    }
  },
  methods: {
    openEditMenu(editDialog) {
      this.currentEditDialog = editDialog
      switch (editDialog) {
        case 'EditFirst':
          this.toolbarTitle = 'Edit Main Header'
          break
        case 'EditSecond':
          this.toolbarTitle = 'Edit Our Church Info'
          break
        case 'EditThird':
          this.toolbarTitle = 'Edit Events and Secondary Cover Phot'
          break
        case 'EditFourth':
          this.toolbarTitle = 'Edit Church Info and Sermons'
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
      this.$store.dispatch('home/getHomeData')
    }
  }
}
</script>
