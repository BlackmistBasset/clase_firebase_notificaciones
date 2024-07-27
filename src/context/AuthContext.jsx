import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { db } from "../../firebase";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "pepito" });
  const auth = getAuth();

  const getUserInfo = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const document = await getDoc(docRef);
      return document.data();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const isAuth = () => {
      onAuthStateChanged(auth, async (user) => {
        try {
          if (user) {
            const uid = user.uid;
            console.log(uid);
            const userInfo = await getUserInfo(uid);
            console.log(userInfo);
            setUser(userInfo);
          } else {
            setUser(null);
          }
        } catch (error) {
          setUser(null);
        }
      });
    };
    isAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
