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
  apiKey: "AIzaSyASHuVn-MbMn6NDTbtTIdWED3K__gwhNGI",
  authDomain: "jeeva-bffd5.firebaseapp.com",
  projectId: "jeeva-bffd5",
  storageBucket: "jeeva-bffd5.firebasestorage.app",
  messagingSenderId: "506307331906",
  appId: "1:506307331906:web:608f652c1d750b89986adb",
  measurementId: "G-3BQF92CXVN"
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
    if (navigate) navigate("/", { replace: true });
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
    if (navigate) navigate("/", { replace: true });
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
