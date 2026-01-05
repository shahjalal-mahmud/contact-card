import { useState } from "react";

export default function BasicInfo({ name, profession, location, editable, onSave, tagline = "" }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name, profession, location, tagline });

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      {isEditing ? (
        <div className="p-6 rounded-2xl space-y-4 backdrop-blur-sm bg-base-100/80 border border-base-300 shadow-lg">
          <div className="space-y-3">
            <div>
              <label className="block mb-2 text-sm font-medium text-base-content">
                Full Name
              </label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="input input-bordered w-full focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-base-content">
                Profession
              </label>
              <input
                type="text"
                value={editData.profession || ""}
                onChange={(e) => setEditData({ ...editData, profession: e.target.value })}
                className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                placeholder="e.g. Software Engineer"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-base-content">
                Location
              </label>
              <input
                type="text"
                value={editData.location || ""}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                placeholder="e.g. New York, USA"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-base-content">
                Tagline
              </label>
              <input
                type="text"
                value={editData.tagline || ""}
                onChange={(e) => setEditData({ ...editData, tagline: e.target.value })}
                className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                placeholder="A short tagline about you"
              />
            </div>
          </div>
          
          <div className="flex gap-3 justify-end pt-4">
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-outline px-4 py-2 rounded-lg hover:scale-105 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              className="btn btn-primary px-6 py-2 rounded-lg hover:scale-105 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-base-content">
            {name}
          </h1>
          
          {profession && (
            <p className="text-xl md:text-2xl text-base-content/70">
              {profession}
            </p>
          )}
          
          {tagline && (
            <p className="text-base md:text-lg text-primary">
              {tagline}
            </p>
          )}
          
          {location && (
            <div className="flex items-center gap-2 text-base-content/70">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{location}</span>
            </div>
          )}
          
          {editable && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-0 right-0 btn btn-outline btn-sm px-4 py-2 rounded-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  );
}