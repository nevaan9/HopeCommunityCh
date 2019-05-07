<template>
  <v-content>
    <div class="about-us-container">
      <h1 class="display-3">About us</h1>
      <hr />
      <div class="subheading">
        Hope Community Church was established in 2016 by Pastor Dilantha
        Arachchilage with the help of three faithful sisters in one of their
        homes in Herndon. As the membership expanded within a few years, we
        moved our service to the Cherrydale Baptist Church in Arlington VA,
        Maryland VA and Washington DC. Since then, we have grown even further
        and now our church body contains of a diverse mix of Sri Lankans, South
        and East Asians and Americans.
      </div>
      <div class="subheading">
        Under the leadership of Pastor Dilantha Arachchilage, Hope Community
        Church consists of elders and a deacon body of men and women who have a
        divine calling to this ministry. Today, our church contains kids’
        ministry, youth ministry, college ministry, Sunday school, adult bible
        study and home prayer cells.
      </div>
      <div class="subheading">
        Hope Community Church is affiliated with the Southern Baptist Church of
        Virginia and we are worship together with all the other reformed
        churches and evangelical churches, etc. As all this indicates, Hope
        Community Church is a biblical and doctrinal church, but a church that
        is also striving to be faithful in its witness to the gospel in the face
        of an ever-changing world. We would love for you to join us in our part
        of the Kingdom’s work as we seek to call people to faith in Jesus
        Christ, and to nurture them to full maturity in all Christ likeness.
      </div>
      <div class="text-xs-center">
        <router-link tag="span" :to="{ name: 'mission' }">
          <a>Leadership</a>
        </router-link>
        <router-link tag="span" :to="{ name: 'mission' }">
          <a>Vision</a>
        </router-link>
      </div>
    </div>
  </v-content>
</template>

<script>
export default {}
</script>

<style scoped>
.about-us-container {
  margin: 50px auto;
  max-width: 800px;
}
.about-us-container h1 {
  margin: 20px;
}
.about-us-container div {
  margin: 30px;
}
.about-us-container .text-xs-center span {
  margin-left: 30px;
  margin-right: 30px;
}
.about-us-container .text-xs-center span a {
  text-decoration: none;
}
</style>
