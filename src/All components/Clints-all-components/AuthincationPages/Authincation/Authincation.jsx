import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import axios from 'axios';

export const Authconnect = createContext()

const Authincation = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // corrected name

    const signupUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const Login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const SignoutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        setLoading(true);
        return signInWithPopup(auth, provider);
    };


useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    console.log('Current user:', user);
    setCurrentUser(user);

    if (user?.email) {
      try {
        await axios.post(
          'http://localhost:5000/jwt',
          { email: user.email },
          { withCredentials: true }
        );
        console.log('JWT sent, token stored in cookie');
      } catch (error) {
        console.error('JWT error:', error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    } else {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      console.log('Logout success');
      setLoading(false);
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
    }

    if (loading) {
        return <div>Loading...</div>; // Optional: use a spinner here
    }

    return (
        <Authconnect.Provider value={Authinfo}>
            {children}
        </Authconnect.Provider>
    );
};

export default Authincation;