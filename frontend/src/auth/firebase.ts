import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC3bJjw1hNDATRfintp7YXF06n6WINGWHM",
  authDomain: "taskboard-demo-47416.firebaseapp.com",
  projectId: "taskboard-demo-47416",
  storageBucket: "taskboard-demo-47416.appspot.com",
  messagingSenderId: "360178670453",
  appId: "1:360178670453:web:365b1b4f4445332c08513c",
  measurementId: "G-DQV7RG4G2N",
};

export const firebaseApp = initializeApp(firebaseConfig);