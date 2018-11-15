import Vue from 'vue/dist/vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import firebase from 'firebase';
import initAuth from './auth';
import store from './store';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader
import 'firebaseui/dist/firebaseui.css';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueRouter);

const AuthRoute = () => import('./components/Auth.vue');
const LayoutRoute = () => import('./routes/Layout.vue');
const HomeRoute = () => import('./routes/Home.vue');
const BookingsRoute = () => import('./routes/Bookings.vue');
const MakeBookingRoute = () => import('./routes/MakeBooking.vue');

const routes = [
  {
    path: '/',
    component: AuthRoute
  },
  {
    path: '/auth',
    component: AuthRoute
  },
  {
    path: '/restaurant',
    component: LayoutRoute,
    children: [
      {
        path: 'home',
        component: HomeRoute
      },
      {
        path: 'bookings',
        component: BookingsRoute
      },
      {
        path: 'book',
        component: MakeBookingRoute
      }
    ]
  }
];

const router = new VueRouter({ routes });

const app = document.createElement('div');
app.id = 'app';

document.body.appendChild(app);

new Vue({
  router, 
  created() {
    initAuth();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.updateCurrentUser(user);
        this.$router.push('/restaurant/home');
      } else {
        this.$router.push('/auth');
      }
    })
  },
  render: h => h(App)
}).$mount('#app');
