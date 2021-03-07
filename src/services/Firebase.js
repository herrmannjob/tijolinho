import Firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/analytics'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNeI54GGdOpqTzGeirDSPmaZx4QkLNbfc",
    authDomain: "tijolinho-3b66e.firebaseapp.com",
    databaseURL: "https://tijolinho-3b66e-default-rtdb.firebaseio.com",
    projectId: "tijolinho-3b66e",
    storageBucket: "tijolinho-3b66e.appspot.com",
    messagingSenderId: "562010994697",
    appId: "1:562010994697:web:c7cd7fc0cb1313db0020d8",
    measurementId: "G-4QT6GW12TW"
  };
  Firebase.initializeApp(firebaseConfig)
  Firebase.analytics()
  Firebase.firestore().enablePersistence()
  export default Firebase