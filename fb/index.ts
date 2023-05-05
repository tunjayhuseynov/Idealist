import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseConfig from "./config";

const app = initializeApp(firebaseConfig, "app");
export default app;
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
