import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCPV_0a_k1szJQE4s_L0_WxU7xNQnHE5_Q",

    authDomain: "chatapp-f5889.firebaseapp.com",

    projectId: "chatapp-f5889",

    storageBucket: "chatapp-f5889.appspot.com",

    messagingSenderId: "483624492988",

    appId: "1:483624492988:web:d0b206ec528cf19e1655b9",
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db = getFirestore(app);
export default app
