import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase.init';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import axios from 'axios';

export const Authconnect = createContext();

const Authincation = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Signup function
  const signupUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Email/password login
  const Login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Firebase logout + backend logout
  const SignoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth); // Firebase logout
      await axios.post(
        'https://al-it-server.vercel.app/logout',
        {},
        { withCredentials: true }
      );
      console.log('User logged out successfully');
      setCurrentUser(null);
    } catch (err) {
      console.error('Logout error:', err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user?.email) {
        try {
          // Request JWT token from backend
          await axios.post(
            'https://al-it-server.vercel.app/jwt',
            { email: user.email },
            { withCredentials: true }
          );
          console.log('JWT set in cookie');
        } catch (err) {
          console.error('JWT error:', err.response?.data?.message || err.message);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          // Ensure backend logout when no Firebase user
          await axios.post(
            'https://al-it-server.vercel.app/logout',
            {},
            { withCredentials: true }
          );
          console.log('Backend logout success');
        } catch (err) {
          console.error('Backend logout error:', err.response?.data?.message || err.message);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const Authinfo = {
    signupUser,
    Login,
    SignoutUser,
    googleLogin,
    currentUser,
    loading
  };

  if (loading) return <div>Loading...</div>; // Optional: spinner

  return (
    <Authconnect.Provider value={Authinfo}>
      {children}
    </Authconnect.Provider>
  );
};

export default Authincation;
