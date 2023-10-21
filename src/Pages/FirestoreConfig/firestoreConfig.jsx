import { initializeApp } from "firebase/app";

/* SERVIDOR RESERVA */
const firebasApp = {
    apiKey: "AIzaSyDbwuGkWq_TUy4tCuxh9fYLG7AFAQ_vHDY",
    authDomain: "army-test-a4cf1.firebaseapp.com",
    projectId: "army-test-a4cf1",
    storageBucket: "army-test-a4cf1.appspot.com",
    messagingSenderId: "96441216328",
    appId: "1:96441216328:web:ac9d189dd12a64a85a177d"
};
/* SERVIDOR OFICIAL */ /*
const firebasApp = {
  apiKey: "AIzaSyA3lRP5q3hjFWAJ076FHb2VpHVwVsMZAMA",
  authDomain: "army-guard.firebaseapp.com",
  projectId: "army-guard",
  storageBucket: "army-guard.appspot.com",
  messagingSenderId: "873158697255",
  appId: "1:873158697255:web:a42515442d445145820902",
};
*/

// Initialize Firebase
export default function iniciarFirestoreDb() {
    return initializeApp(firebasApp);
}