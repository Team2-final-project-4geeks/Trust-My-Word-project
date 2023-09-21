import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDTZuk1kwdar0H-gKYOX3ZRhnpfvxXv1c8",
  authDomain: "tmword-68931.firebaseapp.com",
  projectId: "tmword-68931",
  storageBucket: "tmword-68931.appspot.com",
  messagingSenderId: "23695363912",
  appId: "1:23695363912:web:9e9d0088f16121c9886d7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app)