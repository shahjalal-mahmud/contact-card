import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useEffect } from "react";
import ProfilePicture from "../components/ProfilePicture";
import BasicInfo from "../components/BasicInfo";
import ContactInfo from "../components/ContactInfo";
import SocialLinks from "../components/SocialLinks";
import Bio from "../components/Bio";
import Skills from "../components/Skills";
import CvButton from "../components/CvButton";

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

  if (loading) {
    return <div className="flex justify-center mt-8">Loading profile...</div>;
  }

  if (!userProfile) {
    return <div className="flex justify-center mt-8">Profile not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <ProfilePicture
            src={userProfile.profilePicture}
            editable={isEditable}
            onSave={(image) => updateProfile({ profilePicture: image })}
          />
        </div>
        
        <div className="flex-grow">
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
      
      <Bio
        text={userProfile.bio}
        editable={isEditable}
        onSave={(bio) => updateProfile({ bio })}
      />
      
      <Skills
        skills={userProfile.skills || []}
        editable={isEditable}
        onSave={(skills) => updateProfile({ skills })}
      />
      
      <SocialLinks
        links={userProfile.socialLinks || []}
        editable={isEditable}
        onSave={(socialLinks) => updateProfile({ socialLinks })}
      />
      
      <CvButton
        hasCv={!!userProfile.cvUrl}
        editable={isEditable}
        onUpload={async (file) => {
          // Implement file upload logic here
          // For now just simulating
          const cvUrl = "path/to/uploaded/file.pdf";
          await updateProfile({ cvUrl });
        }}
      />
    </div>
  );
}