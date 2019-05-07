<template>
  <v-content>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="giving-give-description">
            <h2>In awake of Sri Lanka's Easter Attacks</h2>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              provident, maiores fugiat aperiam nihil, id et odit eos modi
              facilis molestias voluptates eligendi quis, aspernatur assumenda
              pariatur aliquid quo! Ipsum? Ut nulla eius officiis provident
              eveniet eum, obcaecati deleniti eos dignissimos deserunt
              accusantium sunt modi, rerum vitae voluptates dolorum quisquam,
              quod harum voluptate perferendis cum. Libero eveniet dolores
              impedit sed. Dolores maiores qui quia earum vero soluta alias
              consequuntur, quo similique maxime ad autem ullam itaque ex esse
              culpa eaque in reiciendis voluptatum laudantium doloribus
              explicabo quibusdam officiis repellat! Ullam?
            </div>
          </div>
        </v-flex>
        <v-flex xs12>
          <div class="form-style-8">
            <input type="text" name="name" :value="user.name" disabled />
            <input type="email" name="email" :value="user.email" disabled />
            <v-textarea name="input-7-4" label="Optional Message"></v-textarea>
            <v-text-field
              prefix="$"
              type="number"
              v-model="amount"
              name="amount"
              label="Amount"
            />
            <v-checkbox label="Make Donation Annonymous?"></v-checkbox>
            <form id="giving-payment-form" style="margin-top: 20px">
              <div class="form-row">
                <label for="card-element">
                  Credit or debit card
                </label>
                <div id="card-element">
                  <!-- A Stripe Element will be inserted here. -->
                </div>

                <!-- Used to display Element errors. -->
                <div id="card-errors" role="alert"></div>
              </div>
            </form>
            <button @click="purchase">Donate</button>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Giving',
  data() {
    return {
      amount: 0,
      stripe: null,
      card: null
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.stripe = Stripe(`pk_test_TYooMQauvdEDq54NiTphI7jx`)
    // eslint-disable-next-line no-undef
    let elements = this.stripe.elements()
    // Custom styling can be passed to options when creating an Element.
    var style = {
      base: {
        // Add your base input styles here. For example:
        fontSize: '18px',
        color: '#32325d'
      }
    }
    this.card = elements.create('card', { style: style })
    this.card.mount(document.getElementById('giving-payment-form'))
  },
  methods: {
    purchase() {
      // console.log(Math.round(this.amount * 100) / 100)
      // this.stripe.createToken(this.card).then(function(result) {
      //   // Access the token with result.token
      //   console.log(result)
      // })
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>

<style scoped>
.form-style-8 {
  font-family: 'Open Sans Condensed', arial, sans;
  padding: 30px;
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
  -moz-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
  -webkit-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
}
.form-style-8 input[type='text'],
.form-style-8 input[type='date'],
.form-style-8 input[type='datetime'],
.form-style-8 input[type='email'],
.form-style-8 input[type='number'],
.form-style-8 input[type='search'],
.form-style-8 input[type='time'],
.form-style-8 input[type='url'],
.form-style-8 input[type='password'],
.form-style-8 textarea,
.form-style-8 select {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  display: block;
  width: 100%;
  padding: 7px;
  border: none;
  border-bottom: 1px solid #ddd;
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
  margin-top: 25px;
  font: 16px Arial, Helvetica, sans-serif;
  height: 45px;
}
.form-style-8 textarea {
  resize: none;
  overflow: hidden;
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
</style>
