import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useEffect, useState } from "react";

export default function Profile() {
  const { username } = useParams(); // Changed from userId to username
  const { user, profile } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // First check if it's the current user's profile
        if (profile && profile.username === username) {
          setUserProfile(profile);
          setLoading(false);
          return;
        }

        // Otherwise query by username
        const profilesRef = collection(db, "profiles");
        const q = query(profilesRef, where("username", "==", username.toLowerCase()));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setUserProfile(doc.data());
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, profile]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!userProfile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{userProfile.name}</h1>
      <p className="text-gray-600">@{userProfile.username}</p>
      <p className="text-gray-600">{userProfile.email}</p>
      
      {userProfile.bio && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">About</h2>
          <p>{userProfile.bio}</p>
        </div>
      )}
      
      {user && user.uid === userProfile.userId && (
        <div className="mt-4">
          <a href="/edit-profile" className="btn btn-primary">Edit Profile</a>
        </div>
      )}
    </div>
  );
}