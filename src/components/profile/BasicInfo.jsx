import { useState } from "react";

export default function BasicInfo({ name, profession, location, editable, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name, profession, location });

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-3">
      {isEditing ? (
        <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="input input-bordered w-full focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Profession</label>
            <input
              type="text"
              value={editData.profession || ""}
              onChange={(e) => setEditData({ ...editData, profession: e.target.value })}
              className="input input-bordered w-full focus:ring-2 focus:ring-primary"
              placeholder="e.g. Software Engineer"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Location</label>
            <input
              type="text"
              value={editData.location || ""}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              className="input input-bordered w-full focus:ring-2 focus:ring-primary"
              placeholder="e.g. New York, USA"
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button onClick={handleSave} className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2 relative">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{name}</h1>
          {profession && (
            <p className="text-xl md:text-2xl text-primary">
              {profession}
            </p>
          )}
          {location && (
            <div className="flex items-center gap-1 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{location}</span>
            </div>
          )}
          {editable && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-0 right-0 btn btn-sm btn-ghost hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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