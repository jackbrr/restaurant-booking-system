<template>
  <div>
   <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Cancel this booking?</v-card-title>
        <v-card-text>This cannot be undone.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" flat="flat" @click.native="cancelBooking">Cancel My Booking</v-btn>
          <v-btn color="default" flat="flat" @click.native="dialog = false">Back</v-btn>
        </v-card-actions>
      </v-card>
   </v-dialog>
  <h1> Bookings </h1>
   <v-tabs
      v-model="active"
      dark
      slider-color="yellow"
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.name"
        @click="fetchBookings(tab.name)"
        ripple
      >
        {{ tab.name }}
      </v-tab>
    </v-tabs>
  <ul v-if="bookings.length > 0">
   <v-card 
     v-for="booking in bookings" 
     :key="booking.id"
   >
      <v-card-media v-if="booking.restaurant.thumb" :src="booking.restaurant.thumb" height="200px" />
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ booking.restaurant.name }}</h3>
          <h3> {{ booking.restaurant.location.address }} </h3>
          <h3> {{ booking.restaurant.cuisines }} </h3>
          <a :href="booking.menu_url"><v-icon>local_dining</v-icon> Menu</a>
          <a :href="booking.photos_url"><v-icon>photo</v-icon> Photos</a>
          <h3> Time: {{ booking.time }} </h3>
          <h3> On: {{ date(booking.date) }} </h3>
          <h3> For {{ booking.numPeople }} {{ booking.numPeople === 1 ? 'person' : 'people' }}</h3>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn 
          color="red" 
          dark 
          @click.native.stop="setForCancel(booking)"
        >Cancel Booking</v-btn>
      </v-card-actions>
    </v-card>
  </ul>
  <h4 class="nobook" v-else>
    You have no bookings. 
  </h4>
  </div>
</template>

<script>
import { getBookings, cancelBooking } from '../api/bookingApis'; 
import store from '../store';


export default {
  name: 'Bookings',
  title: 'Bookings',
  components: {
  },
  data: () => ({ 
    state: store.state,
    active: null,
    bookings: [],
    dialog: false,
    toCancel: {},
    currentUser: store.state.currentUser,
    tabs: [
      {
        name: 'All'
      },
      {
        name: 'Past'
      },
      {
        name: 'Future'
      }
    ]
  }),
  methods: {
    date(date) {
      return new Date(date.toString()).toString();
    },
    setForCancel(booking) {
      this.dialog = true;
      this.toCancel = booking; 
    },
    cancelBooking() {
      cancelBooking(this.toCancel).then(() => {
        const toRemove = this.bookings.findIndex(({ _id }) => _id === this.toCancel._id);
        this.bookings.splice(toRemove, 1);
        this.dialog = false;

      })
    },
    fetchBookings(date) {
      let params = {};
      if (date !== 'All') {
        params.date =  { [date === 'Future' ? '$gte' : '$lte']: Date.now() };
      }
      if (!this.state.restaurant) {
        params.userId = this.currentUser.uid;
      } else {
        params['restaurant.id'] = this.currentUser.restaurantId;
      }
      getBookings(params).then((bookings) => this.bookings = bookings);
    }
  },
  props: {
    msg: String
  },
  created() {
    let params = {};
    if (!this.state.restaurant) {
      params.userId = this.currentUser.uid;
    } else {
      params['restaurant.id'] = this.currentUser.restaurantId;
    }
    getBookings(params).then((bookings) => this.bookings = bookings);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nobook {
  padding: 10px;
  text-align: center;
}
</style>
