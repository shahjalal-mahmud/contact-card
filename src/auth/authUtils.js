import { auth, db } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Signup with additional profile data
export const registerUser = async (email, password, profileData) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  // Create initial profile
  const profileRef = doc(db, "profiles", userCredential.user.uid);
  await setDoc(profileRef, {
    name: profileData.name,
    email: email,
    userId: userCredential.user.uid,
    username: profileData.username.toLowerCase(), // Store lowercase for consistency
    studentId: profileData.studentId,
    createdAt: new Date().toISOString(),
    bio: '',
    skills: [],
    projects: [],
    education: []
  });
  
  return userCredential;
};

// Login remains the same
export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Logout remains the same
export const logoutUser = async () => {
  return await signOut(auth);
};