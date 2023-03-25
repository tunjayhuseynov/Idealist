import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA8-YJCX2y9Z1-9XpE_eUSFfURooOrqkfc",
    authDomain: "idealist-c65b6.firebaseapp.com",
    projectId: "idealist-c65b6",
    storageBucket: "idealist-c65b6.appspot.com",
    messagingSenderId: "587827709593",
    appId: "1:587827709593:web:a273cea6688138c2feda08",
    measurementId: "G-X1ZNY4PCV2"
};

const app = initializeApp(firebaseConfig, "app");
export default app;
export const auth = getAuth(app);
export const storage = getStorage(app)
export const db = getFirestore(app);