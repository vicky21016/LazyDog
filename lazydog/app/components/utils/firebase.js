import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfR9t4ckoFf7GiDV-J0Gxr032i5FXx_oA",
  authDomain: "lazydog-d201b.firebaseapp.com",
  projectId: "lazydog-d201b",
  storageBucket: "lazydog-d201b.firebasestorage.app",
  messagingSenderId: "864077153142",
  appId: "1:864077153142:web:03a3d9b0f4aca9379eb057",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export {app};
