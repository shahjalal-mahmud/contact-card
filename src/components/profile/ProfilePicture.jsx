import { useState } from "react";

export default function ProfilePicture({ src, editable, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(src);
  const [isHovered, setIsHovered] = useState(false);

  const handleSave = () => {
    onSave(image);
    setIsEditing(false);
  };

  return (
    <div className="relative group">
      <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
        {isEditing ? (
          <div className="flex flex-col gap-4 p-2 h-full justify-center items-center bg-gray-50">
            <input
              type="file"
              onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              accept="image/*"
            />
            <div className="flex gap-2">
              <button 
                onClick={handleSave} 
                className="btn btn-sm btn-primary px-4"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-sm btn-ghost px-4"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div 
            className="relative h-full w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img 
              src={image || "https://avatars.githubusercontent.com/u/9919?s=200&v=4"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
            {editable && (isHovered || !image) && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full transition-opacity duration-300">
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-circle btn-sm btn-ghost text-white hover:bg-white hover:bg-opacity-20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}