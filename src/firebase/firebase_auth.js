// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';        
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB68stvhI9ErIdGhHTYBdievojzl7oleBI",
    authDomain: "ecommercetech-5b57a.firebaseapp.com",
    databaseURL: "https://ecommercetech-5b57a-default-rtdb.firebaseio.com",
    projectId: "ecommercetech-5b57a",
    storageBucket: "ecommercetech-5b57a.appspot.com",
    messagingSenderId: "832096199676",
    appId: "1:832096199676:web:535cd6dfcb225e897b4879"
  };
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// export const firebase_auth = getAuth(app);
export const firebase_auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});