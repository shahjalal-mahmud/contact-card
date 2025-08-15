import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useEffect } from "react";
import ProfilePicture from "../components/profile/ProfilePicture";
import BasicInfo from "../components/profile/BasicInfo";
import ContactInfo from "../components/profile/ContactInfo";
import SocialLinks from "../components/profile/SocialLinks";
import Bio from "../components/profile/Bio";
import Skills from "../components/profile/Skills";
import CvButton from "../components/profile/CvButton";

export default function Profile() {
  const { username } = useParams();
  const { user, profile } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (profile && profile.username === username) {
          setUserProfile(profile);
          setLoading(false);
          return;
        }

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

  const isEditable = user && userProfile && user.uid === userProfile.userId;

  const updateProfile = async (updates) => {
    try {
      const profileRef = doc(db, "profiles", userProfile.userId);
      await updateDoc(profileRef, updates);
      setUserProfile({ ...userProfile, ...updates });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleSaveProfilePicture = async (imageUrl) => {
    try {
      await updateProfile({ profilePicture: imageUrl });
      // Show success toast/message if you want
    } catch (error) {
      console.error("Error saving profile picture:", error);
      // Show error message
    }
  };
  const handleCvUpload = async (cvData) => {
    try {
      await updateProfile({
        cvUrl: cvData?.url || null,
        cvName: cvData?.name || null,
        cvSize: cvData?.size || null,
        cvPublicId: cvData?.publicId || null
      });
    } catch (error) {
      console.error("Error saving CV:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg text-base-content">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-base-100 p-8 rounded-box shadow-lg text-center max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold mt-4 text-base-content">Profile Not Found</h2>
          <p className="mt-2 text-base-content/70">The profile you're looking for doesn't exist or may have been removed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Profile Header */}
      <div className="bg-base-300 text-primary-content py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <ProfilePicture
                src={userProfile.profilePicture}
                editable={isEditable}
                onSave={handleSaveProfilePicture}
              />
            </div>

            <div className="flex-grow text-center md:text-left">
              <BasicInfo
                name={userProfile.name}
                profession={userProfile.profession}
                location={userProfile.location}
                editable={isEditable}
                onSave={(data) => updateProfile(data)}
              />

              <ContactInfo
                email={userProfile.email}
                phone={userProfile.phone}
                editable={isEditable}
                onSave={(data) => updateProfile(data)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <div className="bg-base-100 rounded-box shadow-sm border border-base-300 p-6">
              <Bio
                text={userProfile.bio}
                editable={isEditable}
                onSave={(bio) => updateProfile({ bio })}
              />
            </div>

            {/* Skills Section */}
            <div className="bg-base-100 rounded-box shadow-sm border border-base-300 p-6">
              <Skills
                skills={userProfile.skills || []}
                editable={isEditable}
                onSave={(skills) => updateProfile({ skills })}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Social Links Section */}
            <div className="bg-base-100 rounded-box shadow-sm border border-base-300 p-6">
              <SocialLinks
                links={userProfile.socialLinks || []}
                editable={isEditable}
                onSave={(socialLinks) => updateProfile({ socialLinks })}
              />
            </div>

            {/* CV Section */}
            <div className="bg-base-100 rounded-box shadow-sm border border-base-300 p-6">
              <CvButton
                hasCv={!!userProfile?.cvUrl}
                editable={isEditable}
                onUpload={handleCvUpload}
                cvData={{
                  url: userProfile?.cvUrl,
                  name: userProfile?.cvName,
                  size: userProfile?.cvSize,
                  publicId: userProfile?.cvPublicId
                }}
              />
            </div>

            {/* Additional Info Section */}
            <div className="bg-base-100 rounded-box shadow-sm border border-base-300 p-6">
              <h3 className="text-xl font-semibold text-base-content mb-4">Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-base-content/80">
                    Joined {new Date(
                      userProfile.createdAt?.toDate
                        ? userProfile.createdAt.toDate()
                        : userProfile.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>
                {userProfile.education && (
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/70 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    <span className="text-base-content/80">{userProfile.education}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}