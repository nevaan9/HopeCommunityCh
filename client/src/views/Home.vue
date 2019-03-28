<template>
  <div>
    <v-content>
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
    </v-content>
  </div>
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
  props: {
    firstViewData: {
      type: Object,
      required: true
    },
    secondViewData: {
      type: Object,
      required: true
    },
    thirdViewData: {
      type: Object,
      required: true
    },
    fourthViewData: {
      type: Object,
      required: true
    }
  },
  components: {
    First,
    Second,
    Third,
    Fourth,
    Fifth
  },
  data() {
    return {
      hello: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    axios.get('/home').then(res => {
      const homeObj = res.data
      const firstViewData = _.pick(homeObj, [
        'heading',
        'subHeading',
        'mainButtonText',
        'mainCenterPicture',
        'mainCoverPicture'
      ])
      to.params.firstViewData = firstViewData
      const secondViewData = _.pick(homeObj, [
        'churchesHeader',
        'churchesSubHeader',
        'churchOneInfo',
        'churchTwoInfo'
      ])
      to.params.secondViewData = secondViewData
      const thirdViewData = _.pick(homeObj, ['secondaryCoverPicture'])
      to.params.thirdViewData = thirdViewData
      const fourthViewData = _.pick(homeObj, [
        'churchInfoSectionOne',
        'churchInfoSectionTwo'
      ])
      to.params.fourthViewData = fourthViewData
      next()
    })
  },
  created() {},
  methods: {}
}
</script>
