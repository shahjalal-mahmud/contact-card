import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

import ProfilePicture from "../components/profile/ProfilePicture";
import BasicInfo from "../components/profile/BasicInfo";
import SocialLinks from "../components/profile/SocialLinks";
import ProfileActions from "../components/profile/ProfileActions";

export default function Profile() {
  const { username } = useParams();
  const { user } = useContext(AuthContext);

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileRef = doc(db, "profiles", username);
        const snap = await getDoc(profileRef);

        if (snap.exists()) {
          setUserProfile({ username, ...snap.data() });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const isEditable = user && user.uid === userProfile?.userId;

  const updateProfile = async (updates) => {
    if (!isEditable) return;

    try {
      const ref = doc(db, "profiles", userProfile.userId);
      await updateDoc(ref, updates);
      setUserProfile(prev => ({ ...prev, ...updates }));
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleSaveProfilePicture = async (imageUrl) => {
    try {
      await updateProfile({ profilePicture: imageUrl });
    } catch (error) {
      console.error("Error saving profile picture:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-lg text-base-content">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-8 rounded-2xl shadow-2xl text-center max-w-md bg-gradient-to-br from-base-100 to-base-200 border border-base-300 text-base-content">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold mt-4">Profile Not Found</h2>
          <p className="mt-2 text-base-content/70">The profile you're looking for doesn't exist or may have been removed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-6xl mx-auto rounded-3xl p-6 md:p-12 transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200 border border-base-300 shadow-2xl shadow-base-300/20">
        <div className="relative z-10">
          <div className="flex flex-col items-center text-center">

            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30 bg-primary/30"></div>
              <div className="relative">
                <ProfilePicture
                  src={userProfile.profilePicture}
                  editable={isEditable}
                  onSave={handleSaveProfilePicture}
                />
              </div>
            </div>

            <div className="mb-8 max-w-2xl">
              <BasicInfo
                name={userProfile.name}
                tagline={userProfile.tagline}
                email={userProfile.email}
                phone={userProfile.phone}
                editable={isEditable}
                onSave={(data) => updateProfile(data)}
              />
            </div>
            <div className="w-full max-w-md">
              <SocialLinks
                links={userProfile.socialLinks || []}
                editable={isEditable}
                onSave={(socialLinks) => updateProfile({ socialLinks })}
              />
            </div>

            {/* Refactored Action Buttons Component */}
            <ProfileActions userProfile={userProfile} />

          </div>
        </div>
      </div>
    </div>
  );
}