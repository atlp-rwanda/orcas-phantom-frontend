import firebase from 'firebase';
var config ={
  apiKey: "AIzaSyAGBifG4BBJICMfynXk2Yt7ms9R6KnvJTs",
  authDomain: "phatom-frontend.firebaseapp.com",
  databaseURL: "https://phatom-frontend.firebaseio.com",
  projectId: "phatom-frontend",
  storageBucket: "phatom-frontend.appspot.com",
  messagingSenderId: "15328742299",
  appId: "1:15328742299:web:7de27e1b1659737a58af3e"
};
firebase.initializeApp(config);
export default firebase;
