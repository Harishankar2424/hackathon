import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
  "projectId": "studio-6374486714-22931",
  "appId": "1:532489106407:web:3a7eb2a69748eb2d82c342",
  "apiKey": "AIzaSyAcfVxGi0pjmqqWvN1yTYkkmH0DYEqa2gI",
  "authDomain": "studio-6374486714-22931.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "532489106407"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
