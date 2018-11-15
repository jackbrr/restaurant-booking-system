<template lang="html">
  <div class="login-container">
    <div class="login-widget">
      <h2> Dining Room Log in </h2>
      <img src="https://www.digitaltrends.com/wp-content/uploads/2012/08/restaurant.jpeg" />
      <div id="firebaseui-auth-container"></div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui';

export default {
  name: 'auth',
  mounted() {
    const uiConfig = {
      signInSuccessUrl: '/restaurant/home',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    ui.start('#firebaseui-auth-container', uiConfig);
  }
};
</script>

<style>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-family: Roboto;
  }
  .login-widget {
    width: 50%;
    height:40%;
    border: 0.5px solid #ccc;
    text-align: center;
		box-shadow: 3px 3px 15px -4px rgba(0,0,0,0.75);
  }
	img {
	 width:300px; /* you can use % */
	margin: 20px;
	}
</style>
