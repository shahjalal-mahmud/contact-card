import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase.config";
import { doc, getDoc, setDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { logoutUser } from "../auth/authUtils";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUsernameAvailable = async (username) => {
    try {
      const usersRef = collection(db, "profiles");
      const q = query(usersRef, where("username", "==", username.toLowerCase()));
      const querySnapshot = await getDocs(q);
      return querySnapshot.empty;
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      try {
        if (currentUser) {
          setUser(currentUser);
          const profileRef = doc(db, "profiles", currentUser.uid);
          const profileSnap = await getDoc(profileRef);

          if (profileSnap.exists()) {
            setProfile(profileSnap.data());
          } else {
            const newProfile = {
              name: currentUser.displayName || currentUser.email.split("@")[0],
              email: currentUser.email,
              userId: currentUser.uid,
              username: "",
              profilePicture: currentUser.photoURL || "",
              createdAt: new Date(),
              bio: "",
              profession: "",
              location: "",
              phone: "",
              skills: [],
              socialLinks: [],
              education: [],
              projects: [],
              cvUrl: "",
              cvName: "",
              cvSize: 0,
              cvPublicId: ""
            };
            await setDoc(profileRef, newProfile);
            setProfile(newProfile);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error("Auth state change error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // In your AuthProvider component
  const updateProfile = async (updatedData) => {
    if (!user || !profile) return;

    try {
      const profileRef = doc(db, "profiles", user.uid);

      // Clean data - ensure image URLs are strings
      const cleanData = {
        ...updatedData,
        profilePicture: typeof updatedData.profilePicture === 'string'
          ? updatedData.profilePicture
          : profile.profilePicture
      };

      await updateDoc(profileRef, cleanData);
      setProfile(prev => ({ ...prev, ...cleanData }));

      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      return false;
    }
  };

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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;