import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDcjmht1LuNRmGs1CL5CPsTDCDZP7s6FrI",
    authDomain: "comments-ca8c5.firebaseapp.com",
    databaseURL: "https://comments-ca8c5.firebaseio.com",
    projectId: "comments-ca8c5",
    storageBucket: "comments-ca8c5.appspot.com",
    messagingSenderId: "428915798355"
};
firebase.initializeApp(config);
export const database = firebase.database();
export const auth = firebase.auth();
