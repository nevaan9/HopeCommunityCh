<template>
  <v-app>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
    <!-- Notification -->
    <v-snackbar
      v-model="notification"
      :bottom="snackbar.y === 'bottom'"
      :left="snackbar.x === 'left'"
      :multi-line="snackbar.mode === 'multi-line'"
      :right="snackbar.x === 'right'"
      :timeout="snackbar.timeout"
      :top="snackbar.y === 'top'"
      :vertical="snackbar.mode === 'vertical'"
      :color="snackbar.color"
    >
      {{ snackbar.text }}
      <v-btn fab small dark @click="updateNotification(false)">
        <v-icon small dark>mdi-cancel</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['snackbar']),
    notification: {
      get() {
        return this.$store.state.notification
      },
      set(value) {
        this.updateNotification(value)
      }
    }
  },
  methods: {
    ...mapMutations(['updateNotification'])
  }
}
</script>
