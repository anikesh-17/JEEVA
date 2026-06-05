// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// 🧨 CRITICAL: Wrap persistence inside a PROMISE before using auth anywhere
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Session persistence enabled");
  })
  .catch((e) => console.error("Persistence error:", e));

const googleProvider = new GoogleAuthProvider();


export const handleGoogleLogin = async (setError, navigate) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    setError("");
    if (navigate) navigate("/home", { replace: true });
    return { success: true, user: res.user };
  } catch (err) {
    setError(err?.message || "Google sign in failed");
    return { success: false, error: err };
  }
};

export const handleSubmit = async (e, setError, navigate) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    setError("");
    if (navigate) navigate("/home", { replace: true });
    e.target.reset();
    return { success: true, user: userCred.user };
  } catch (err) {
    setError(err?.message || "Invalid email or password");
    return { success: false, error: err };
  }
};

export const logout = async () => {
  await signOut(auth);
};

// hook to provide auth state
export const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      console.log("[useAuthState] auth change:", u);
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { user, loading };
};

export { auth, googleProvider };
