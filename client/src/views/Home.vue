<template>
  <v-content>
    <div v-if="dataLoaded">
      <First
        :main-header="firstViewData.heading"
        :sub-header="firstViewData.subHeading"
        :button-text="firstViewData.mainButtonText"
        :cover-picture="firstViewData.mainCoverPicture"
        :center-picture="firstViewData.mainCenterPicture"
      ></First>
      <Second
        :churches-header="secondViewData.churchesHeader"
        :churches-sub-header="secondViewData.churchesSubHeader"
        :church-one-info="secondViewData.churchOneInfo"
        :church-two-info="secondViewData.churchTwoInfo"
      ></Second>
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
import First from './Home/First'
import Second from './Home/Second'
import Third from './Home/Third'
import Fourth from './Home/Fourth'
import Fifth from './Home/Fifth'
import axios from 'axios'
import _ from 'lodash'
export default {
  name: 'Home',
  components: {
    First,
    Second,
    Third,
    Fourth,
    Fifth
  },
  data() {
    return {
      dataLoaded: false,
      loading: false,
      error: null,
      firstViewData: {},
      secondViewData: {},
      thirdViewData: {},
      fourthViewData: {}
    }
  },
  created() {
    this.loading = true
    this.loadHomePage()
  },
  methods: {
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
