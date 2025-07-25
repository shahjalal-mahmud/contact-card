import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function EditProfile() {
  const { profile, updateProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    skills: '',
    // Add more fields as needed
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        bio: profile.bio || '',
        skills: profile.skills ? profile.skills.join(', ') : '',
        // Initialize other fields
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedProfile = {
      ...profile,
      name: formData.name,
      bio: formData.bio,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      // Update other fields
    };
    
    await updateProfile(updatedProfile);
    alert('Profile updated successfully!');
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
          />
        </div>
        
        <div>
          <label className="block mb-1">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        {/* Add more fields as needed */}
        
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}