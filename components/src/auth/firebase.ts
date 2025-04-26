import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC1j0MbwcPEH6_FQ2gH19A89C6eniO_EeY",
  authDomain: "testevents-e8307.firebaseapp.com", 
  projectId: "testevents-e8307",
  storageBucket: "testevents-e8307.firebasestorage.app",
  messagingSenderId: "50712211916",
  appId: "1:50712211916:web:3c676c95674a8496a2ed69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    throw error;
  }
};

export { auth };
