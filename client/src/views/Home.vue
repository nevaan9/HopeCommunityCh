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
      <Second></Second>
      <Third></Third>
      <Fourth></Fourth>
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
      next()
      console.log(homeObj)
    })
  },
  created() {},
  methods: {}
}
</script>
