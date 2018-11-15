<template>
  <v-app>
  <!--<v-navigation-drawer app>-->
  <!--</v-navigation-drawer>-->
   <v-toolbar app dark>
    <v-toolbar-title>Dining Room</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
        <v-chip>
          <v-avatar>
            <img :src="state.currentUser.photoURL">
          </v-avatar>
          {{state.currentUser.displayName}} 
        </v-chip>
       <v-btn flat 
         v-for="link in links" 
         v-if="link.restaurant !== state.restaurant"
         :key="link.name"
         @click="$router.push(link.uri)"
       >
         {{ link.name }}
       </v-btn>
       <v-btn flat @click="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-content>
    <v-container fluid>
    <router-view />
    </v-container>
  </v-content>
  <v-footer app></v-footer>
</v-app>
</template>

<script>
import firebase from 'firebase';
import store from '../store';

export default {
  name: 'layout',
  methods: {
    logout() {
      firebase.auth().signOut();
    }
  },
  data: () => ({
    state: store.state,
    links: [
      {
        name: 'Search',
        uri: 'home',
        restaurant: true
      },
      {
        name: 'Bookings',
        uri: 'bookings'
      }
    ]
  }),
  created() {
    const user = firebase.auth().currentUser;
    if (user) {
      store.updateCurrentUser(user);
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
