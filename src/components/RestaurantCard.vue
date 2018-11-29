<template>
   <v-card>
      <v-card-media v-if="restaurant.thumb" :src="restaurant.thumb" height="200px" />
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ restaurant.name }}</h3>
          <h3> {{ restaurant.location.address }} </h3>
          <h3> {{ restaurant.cuisines }} </h3>
          <h3> {{ price }} </h3>
          <a :href="restaurant.menu_url"><v-icon>local_dining</v-icon> Menu</a><br />
           <a :href="restaurant.photos_url"><v-icon>photo</v-icon> Photos</a>
          <VueStarRating :star-size="25" :rating="rating" />
          <h4>{{ restaurant.user_rating.rating_text }}</h4>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="primary" @click="updateChosenRestaurant">Book</v-btn>
        
          <a class="foo" :href="restaurant.url">
          <v-btn flat color="primary">
            Details
          </v-btn>
          </a>
      </v-card-actions>
    </v-card>
</template>

<script>
import VueStarRating from 'vue-star-rating';
import store from '../store';

export default {
  name: 'RestaurantCard',
  props: {
    restaurant: Object
  },
  components: {
    VueStarRating
  },
  computed: {
    price() {
      return this.restaurant.currency + this.restaurant.average_cost_for_two;
    },
    rating() {
     return parseInt(this.restaurant.user_rating.aggregate_rating);     
    }
  },
  methods: {
    updateChosenRestaurant() {
      store.setChosenRestaurant(this.restaurant);
      this.$router.push('book');
    }
  }
};
</script>

<style scoped>
  .restaurant-card {
    height: 400px;
    width: 800px;
    border: 1px solid black;
  }

  .restaurant-image {
    height: 200px;
    width: 200px;
  }

  .foo {
    text-decoration: none;
  }
</style>
