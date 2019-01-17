<template>
  <div>
  <h1> Make Booking </h1>
   <v-card>
      <v-card-title primary-title> <div>
          <h3 class="headline mb-0">{{ restaurant.name }}</h3>
          <h3> {{ restaurant.location.address }} </h3>
          <h3> {{ restaurant.cuisines }} </h3>
        </div>
      </v-card-title>
      <v-card-actions>
       <div class="inputs-container">
         <v-date-picker dark v-model="datepicker" :landscape="landscape" :reactive="reactive" min="2019-01-18" max="2020-01-30"> </v-date-picker>
         <v-time-picker dark v-model="timepicker" :landscape="landscape" :reactive="reactive" min="9:30" max="22:15"> </v-time-picker>
        </div>
        </v-card-actions>
          <div class="field-container">
          <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="numPeople"
            :rules="[rules.maxNumber]"
            name="input-2"
            label="How many people?"
            class="input-group--focused"
          /></v-flex>

          <v-flex xs12 sm6 md3>
           <v-text-field
            v-model="requests"
            label="Any preferences/requests for the restaurant?"
          ></v-text-field>
          </v-flex>

          <v-radio-group v-model="paymentMethod">
          <v-radio label="Pay by Debit/Credit Card" key="Card"  value="Card"> </v-radio>  
          <v-radio label="Pay with Cash" key="Cash"  value="Cash"> </v-radio>
          </v-radio-group>

          <template class="cardDetails">

          <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="nameOnCard"
            label="Name on Card"
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="cardNumber"
            :mask="mask"
            label="Card Number"
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-text-field
         
            v-model="expiryDate"
            label="Expiry Date (MM/YY)"
          ></v-text-field>
        </v-flex>
        </template>

          <v-btn color='primary' @click="book">Book Restaurant</v-btn>
          </div>
    </v-card>
     <v-snackbar
      :timeout="timeout"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
    >
      {{ snackbarText }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { createBooking } from '../api/bookingApis';
import moment from 'moment';
import store from '../store';

export default {
  name: 'Bookings',
  title: 'Bookings',
  components: {
  },
  data: () => ({
    state: store.state,
    mask: 'credit-card',
    rules: {
      maxNumber: value => value < 21 || "Max Booking is 20"
    }, 
    datepicker: null,
    timepicker: null, 
    currentTime: moment().format('LT'),
    reactive: true,
    landscape: false,
    numPeople: '',
    paymentMethod: null,  
    snackbar: false,
    y: 'top',
    x: null,
    mode: '',
    timeout: 6000,
    snackbarText: 'Booking Confirmed.'
  }),
  computed: {
    restaurant() {
      return store.state.chosenRestaurant;
    } 
  },

  
  methods: {
    book() {
      
      createBooking({
        restaurant: this.restaurant,
        time: this.timepicker,
        date: this.datepicker,
        numPeople: this.numPeople,
        paymentMethod: this.paymentMethod,
        nameOnCard: this.nameOnCard,
        cardNumber: this.cardNumber,
        expiryDate: this.expiryDate,
        requests: this.requests,
        userId: this.state.currentUser.uid,
        email: this.state.currentUser.email,
       
      }).then(() => { 
        this.snackbar = true;
      })
    } 
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .inputs-container {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
  }
  
  .field-container {
    padding: 10px;
  }

</style>