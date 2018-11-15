<template>
  <div>
  <h2> Welcome to Dining Room. Let's find you a restaurant. </h2>
  <div class="searchBox">
    <v-text-field v-model="searchTerm" />
      <v-btn
      :loading="loading"
      :disabled="loading"
      color="info"
      @click="search"
      @click.native="loader = 'loading'"
    >
    Search 
    <span slot="loader" class="custom-loader">
      <v-icon light>cached</v-icon>
    </span>
  </v-btn>
  </div>
  <h2 v-if="restaurants.length > 0 && isSearch"> Search Results </h2>
  <div v-if="restaurants.length > 0" class="card-container">
    <RestaurantCard 
      v-for="restaurant in restaurants" 
      :key="restaurant.id"
      :restaurant="restaurant"
    />
  </div>
  <span v-else>
    No Restaurants available
  </span>
  </div>
</template>

<script>
import RestaurantCard from '../components/RestaurantCard';
import store from '../store';
import { getRestaurants, getCityInfo } from '../api/zomatoApis';

export default {
  name: 'Home',
  title: 'Home',
  components: {
    RestaurantCard
  },
  data: () => ({
    state: store.state,
    title: 'Home',
    restaurants: [],
    searchTerm: '',
    loader: null,
    loading: false
  }),
  methods: {
    search() {
      this.loading = true;
      this.isSearch = true;
      getCityInfo(this.searchTerm.toLowerCase()).then(({ entity_id }) => {
        getRestaurants(entity_id).then(restaurants => { 
          this.restaurants = restaurants;
          this.loading = false;
        })
      });
    }
  },
  props: {
    msg: String
  },
  created() {
    this.isSearch = false;
    getRestaurants('').then(restaurants => { 
      this.restaurants = restaurants;
      this.loading = false;
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
  }
  .searchBox {
    display: flex;
    flex-direction: row;
  }
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
