import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// change this afterwards
const firebaseConfig = {
    apiKey: "AIzaSyBJolm-CEgwVvxL8y5tp0e60efzLMABei0",
    authDomain: "budget-react-app-ca081.firebaseapp.com",
    projectId: "budget-react-app-ca081",
    storageBucket: "budget-react-app-ca081.appspot.com",
    messagingSenderId: "887053122857",
    appId: "1:887053122857:web:ee738dfb223544c2264b38",
    measurementId: "G-0PXVF2PGY2"
};

const fire = firebase.initializeApp(firebaseConfig)

export default fire;