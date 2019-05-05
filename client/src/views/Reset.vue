<template>
  <v-content>
    <v-container>
      <v-layout row wrap>
        <template v-if="preSuccess">
          <v-flex xs12 class="mb-5">
            <div class="giving-give-description">
              <h2>No worries, You can reset your password here!</h2>
              <ol class="custom-list">
                <li>Enter the email you used to create an account with us.</li>
                <li>We will email you a link to reset your password.</li>
                <li>Follow the instrctions we provide you.</li>
                <li>Voila, you have your account back!.</li>
              </ol>
            </div>
          </v-flex>
          <v-flex xs12>
            <div class="form-style-8">
              <v-text-field
                class="txt-input"
                label="Email"
                single-line
                v-model="email"
                :error-messages="emailErrors"
              ></v-text-field>
              <button @click="onSubmit">Email Me My Rest Link</button>
            </div>
          </v-flex>
        </template>
        <template v-else>
          <v-flex xs12 class="mb-5">
            <div class="giving-give-description">
              <h2>Success! We just sent you an email!</h2>
              <ol class="custom-list">
                <li>Check your inbox.</li>
                <li>
                  If you don't see an email from us in your inbox, check your
                  spam folder.
                </li>
                <li>
                  Make sure to mark the email as "non-spam" for the future.
                </li>
                <li>Now, go get your account back!</li>
              </ol>
            </div>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Reset',
  data() {
    return {
      preSuccess: true,
      email: '',
      emailErrors: []
    }
  },
  methods: {
    onSubmit() {
      this.$axios
        .post('/user/reset-password', {
          email: this.email
        })
        .then(() => {
          this.preSuccess = false
        })
        .catch(e => {
          // Server Side Error Handling
          const data = e.response.data
          if (data.error && data.error.length) {
            data.error.forEach(err => {
              switch (err.param) {
                case 'email':
                  if (!this.emailErrors.length) this.emailErrors.push(err.msg)
                  break
                default:
              }
            })
          }
        })
    },
    clearErrorArray() {
      setTimeout(() => {
        this.emailErrors.pop()
      }, 5000)
    }
  },
  watch: {
    emailErrors(newVal) {
      if (newVal.length) {
        this.clearErrorArray()
      }
    }
  }
}
</script>

<style scoped>
.form-style-8 {
  max-width: 600px;
  font-family: 'Open Sans Condensed', arial, sans;
  padding: 30px;
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
  -moz-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
  -webkit-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
}
.form-style-8 .txt-input {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  display: block;
  width: 100%;
  padding: 7px;
  border: none;
  background: transparent;
  margin-bottom: 10px;
  font: 16px Arial, Helvetica, sans-serif;
  height: 45px;
}
.form-style-8 button {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  display: block;
  width: 100%;
  padding: 7px;
  border: none;
  background-color: #3cb371;
  margin-top: 35px;
  font: 16px Arial, Helvetica, sans-serif;
  height: 45px;
}
.giving-give-description h2 {
  text-transform: uppercase;
  font-family: 'Open Sans Condensed', sans-serif;
  color: #797979;
  font-size: 18px;
  font-weight: 100;
  margin-bottom: 10px;
  text-decoration: underline;
}
.giving-give-description div {
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 17px;
  margin-bottom: 30px;
}
.custom-list {
  list-style: none;
  counter-reset: my-awesome-counter;
}
.custom-list li {
  counter-increment: my-awesome-counter;
}
.custom-list li::before {
  content: counter(my-awesome-counter) '. ';
  color: #5c6ac0;
  font-weight: bold;
}

.custom-list {
  font-family: Montserrat, sans-serif;
}
</style>
