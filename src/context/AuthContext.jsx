import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase.config";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { logoutUser } from "../auth/authUtils"; // adjust path if needed

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUsernameAvailable = async (username) => {
    const usersRef = collection(db, "profiles");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const profileRef = doc(db, "profiles", currentUser.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          setProfile(profileSnap.data());
        } else {
          const newProfile = {
            name: currentUser.email.split("@")[0],
            email: currentUser.email,
            userId: currentUser.uid,
            username: "",
            createdAt: new Date().toISOString(),
            bio: "",
            skills: [],
            projects: [],
            education: []
          };
          await setDoc(profileRef, newProfile);
          setProfile(newProfile);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateProfile = async (updatedData) => {
    if (!user) return;
    const profileRef = doc(db, "profiles", user.uid);
    await setDoc(profileRef, updatedData, { merge: true });
    setProfile(updatedData);
  };

  // Logout handler
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        updateProfile,
        checkUsernameAvailable,
        logout, // ✅ exposed here
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
