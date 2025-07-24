import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8ZFZnD36a_sl_y1c5DLy0vFBwr0SCkGk",
  authDomain: "fashion-app-user-information.firebaseapp.com",
  projectId: "fashion-app-user-information",
  storageBucket: "fashion-app-user-information.firebasestorage.app",
  messagingSenderId: "381619541379",
  appId: "1:381619541379:web:a0f9327479a6b321c612b6",
  measurementId: "G-WHZJK8VPH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app; 