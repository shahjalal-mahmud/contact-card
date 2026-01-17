import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useEffect } from "react";
import ProfilePicture from "../components/profile/ProfilePicture";
import BasicInfo from "../components/profile/BasicInfo";
import ContactInfo from "../components/profile/ContactInfo";
import SocialLinks from "../components/profile/SocialLinks";
import Bio from "../components/profile/Bio";
import Skills from "../components/profile/Skills";
import CvButton from "../components/profile/CvButton";
import { Share2, Download, UserPlus, Briefcase } from "lucide-react";

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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${userProfile?.name} - Digital Profile`,
        text: 'Check out my LinkUp profile!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSaveContact = () => {
    if (!userProfile) return;
    
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${userProfile.name}
TEL:${userProfile.phone || ''}
EMAIL:${userProfile.email}
ADR:;;${userProfile.location || ''};;;;
URL:${window.location.href}
NOTE:${userProfile.profession || ''}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${userProfile.name.replace(/\s+/g, '_')}_contact.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadCV = () => {
    if (userProfile?.cvUrl) {
      window.open(userProfile.cvUrl, '_blank');
    } else {
      alert('No CV uploaded yet');
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
      {/* Premium Hero Section */}
      <div className="py-8 md:py-12 px-4">
        <div className="max-w-6xl mx-auto rounded-3xl p-6 md:p-12 transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200 border border-base-300 shadow-2xl shadow-base-300/20">
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 bg-primary/20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20 bg-secondary/20"></div>

          <div className="relative z-10">
            <div className="flex flex-col items-center text-center">
              {/* Profile Picture with Status */}
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

              {/* Name & Profession */}
              <div className="mb-8 max-w-2xl">
                <BasicInfo
                  name={userProfile.name}
                  profession={userProfile.profession}
                  location={userProfile.location}
                  tagline={userProfile.tagline}
                  editable={isEditable}
                  onSave={(data) => updateProfile(data)}
                />

                {/* Contact Info Cards */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <ContactInfo
                    email={userProfile.email}
                    phone={userProfile.phone}
                    editable={isEditable}
                    onSave={(data) => updateProfile(data)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleSaveContact}
                  className="group px-6 md:px-8 py-3 md:py-3.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-primary to-primary-focus text-primary-content shadow-lg shadow-primary/40"
                >
                  <span className="flex items-center gap-2 justify-center">
                    <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Save Contact</span>
                  </span>
                </button>

                <button
                  onClick={handleShare}
                  className="px-6 md:px-8 py-3 md:py-3.5 rounded-xl transition-all duration-300 hover:scale-105 border-2 border-base-300 text-base-content hover:bg-base-200 hover:border-base-400"
                >
                  <span className="flex items-center gap-2 justify-center">
                    <Share2 className="w-5 h-5" />
                    <span>Share Profile</span>
                  </span>
                </button>
              </div>

              {/* Download CV Button */}
              <button
                onClick={handleDownloadCV}
                className="mb-8 px-6 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 text-base-content/70 hover:text-base-content hover:bg-base-200"
              >
                <span className="flex items-center gap-2 justify-center">
                  <Briefcase className="w-4 h-4" />
                  <span>{userProfile?.cvUrl ? 'View Full Resume' : 'Upload Resume'}</span>
                  <Download className="w-4 h-4" />
                </span>
              </button>

              {/* Social Links */}
              <div className="w-full max-w-md">
                <SocialLinks
                  links={userProfile.socialLinks || []}
                  editable={isEditable}
                  onSave={(socialLinks) => updateProfile({ socialLinks })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <div className="rounded-3xl p-6 md:p-8 transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200 border border-base-300 shadow-2xl shadow-base-300/20">
              <Bio
                text={userProfile.bio}
                editable={isEditable}
                onSave={(bio) => updateProfile({ bio })}
              />
            </div>

            {/* Skills Section */}
            <div className="rounded-3xl p-6 md:p-8 transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200 border border-base-300 shadow-2xl shadow-base-300/20">
              <Skills
                skills={userProfile.skills || []}
                editable={isEditable}
                onSave={(skills) => updateProfile({ skills })}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* CV Section */}
            <div className="rounded-3xl p-6 md:p-8 transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200 border border-base-300 shadow-2xl shadow-base-300/20">
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
            <div className="rounded-3xl p-6 md:p-8 transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200 border border-base-300 shadow-2xl shadow-base-300/20">
              <h3 className="text-2xl font-bold mb-6 text-base-content">Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-[1.02] bg-base-100 hover:bg-base-200 border border-base-300 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-base-content/70">Joined on</p>
                    <p className="font-medium text-base-content">
                      {new Date(
                        userProfile.createdAt?.toDate
                          ? userProfile.createdAt.toDate()
                          : userProfile.createdAt
                      ).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                {userProfile.education && (
                  <div className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:scale-[1.02] bg-base-100 hover:bg-base-200 border border-base-300 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-base-content/70">Education</p>
                      <p className="font-medium text-base-content">{userProfile.education}</p>
                    </div>
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