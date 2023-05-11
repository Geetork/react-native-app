import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import * from '@env'

const firebaseConfig = {
  apiKey: {API_KEY},
  authDomain: {AUTH_DOMAIN},
  projectId: {PROJECT_ID},
  storageBucket: {STORAGE_BUCKET},
  messagingSenderId: {MESSAGING_SENDER_ID},
  appId: {APP_ID},
  measurementId: {MEASURMENT_ID}
};

let app;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };
