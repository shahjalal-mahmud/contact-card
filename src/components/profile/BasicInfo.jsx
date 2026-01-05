import { useState } from "react";

export default function BasicInfo({ name, profession, location, editable, onSave, isDarkMode = false, tagline = "" }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name, profession, location, tagline });

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      {isEditing ? (
        <div className={`p-6 rounded-2xl space-y-4 backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/80 border border-gray-200 shadow-lg'
        }`}>
          <div className="space-y-3">
            <div>
              <label className={`block mb-2 text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Full Name
              </label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className={`input w-full focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-white/20 text-white' 
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>
            
            <div>
              <label className={`block mb-2 text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Profession
              </label>
              <input
                type="text"
                value={editData.profession || ""}
                onChange={(e) => setEditData({ ...editData, profession: e.target.value })}
                className={`input w-full focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-white/20 text-white' 
                    : 'bg-white border-gray-300'
                }`}
                placeholder="e.g. Software Engineer"
              />
            </div>
            
            <div>
              <label className={`block mb-2 text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Location
              </label>
              <input
                type="text"
                value={editData.location || ""}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                className={`input w-full focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-white/20 text-white' 
                    : 'bg-white border-gray-300'
                }`}
                placeholder="e.g. New York, USA"
              />
            </div>
            
            <div>
              <label className={`block mb-2 text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Tagline
              </label>
              <input
                type="text"
                value={editData.tagline || ""}
                onChange={(e) => setEditData({ ...editData, tagline: e.target.value })}
                className={`input w-full focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-white/20 text-white' 
                    : 'bg-white border-gray-300'
                }`}
                placeholder="A short tagline about you"
              />
            </div>
          </div>
          
          <div className="flex gap-3 justify-end pt-4">
            <button
              onClick={() => setIsEditing(false)}
              className={`px-4 py-2 rounded-lg transition-all ${
                isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 hover:scale-105 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3 relative">
          <h1 className={`text-4xl md:text-5xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {name}
          </h1>
          
          {profession && (
            <p className={`text-xl md:text-2xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {profession}
            </p>
          )}
          
          {tagline && (
            <p className={`text-base md:text-lg ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {tagline}
            </p>
          )}
          
          {location && (
            <div className={`flex items-center gap-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{location}</span>
            </div>
          )}
          
          {editable && (
            <button
              onClick={() => setIsEditing(true)}
              className={`absolute top-0 right-0 px-4 py-2 rounded-lg transition-all flex items-center gap-2 hover:scale-105 ${
                isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
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