import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBmAb_roW0_e44Xa7F_xHazMi4bMLqrpLk",
  authDomain: "cafebooking-9b058.firebaseapp.com",
  databaseURL: "https://cafebooking-9b058.firebaseio.com",
  projectId: "cafebooking-9b058",
  storageBucket: "cafebooking-9b058.appspot.com",
  messagingSenderId: "239671520325"
};

function init() {
  firebase.initializeApp(config);
}

export { config };

export default init;


