import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDBEnUDCsFJlKMhIVlPU6mbKIAjLVoBcZI",
  authDomain: "invedus-eac14.firebaseapp.com",
  projectId: "invedus-eac14",
  storageBucket: "invedus-eac14.appspot.com",
  messagingSenderId: "557919430546",
  appId: "1:557919430546:web:d7dba3a9d13a10a596034b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)