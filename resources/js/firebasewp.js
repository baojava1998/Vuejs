// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZ2MyFkrhQSL8iysCCrxQFZKNkFOaywxA",
    authDomain: "testvue-5e352.firebaseapp.com",
    projectId: "testvue-5e352",
    storageBucket: "testvue-5e352.appspot.com",
    messagingSenderId: "354091685702",
    appId: "1:354091685702:web:2c9c048eb2408098f93747",
    measurementId: "G-HYEYJJYZR3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
