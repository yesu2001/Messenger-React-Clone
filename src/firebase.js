import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBWHnDyiEFt8dOSbZBA97CXOmapepbh-m0",
    authDomain: "facebook-messenger-react-228bf.firebaseapp.com",
    projectId: "facebook-messenger-react-228bf",
    storageBucket: "facebook-messenger-react-228bf.appspot.com",
    messagingSenderId: "977327041143",
    appId: "1:977327041143:web:15d17bf370fa60c6587472",
    measurementId: "G-941P8CG93S"
});

const db = firebaseApp.firestore();

export default db;