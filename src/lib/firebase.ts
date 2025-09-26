import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAcfVxGi0pjmqqWvN1yTYkkmH0DYEqa2gI",
    authDomain: "studio-6374486714-22931.firebaseapp.com",
    projectId: "studio-6374486714-22931",
    storageBucket: "studio-6374486714-22931.firebasestorage.app",
    messagingSenderId: "532489106407",
    appId: "1:532489106407:web:55b8d6e3867744b682c342"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
