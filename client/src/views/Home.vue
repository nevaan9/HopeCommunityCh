<template>
  <div>
    <v-content>
      <First></First>
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
export default {
  name: 'Home',
  components: {
    First,
    Second,
    Third,
    Fourth,
    Fifth
  }
}
</script>
