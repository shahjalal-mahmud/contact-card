import { useState } from "react";

export default function ProfilePicture({ src, editable, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(src);

  const handleSave = () => {
    onSave(image);
    setIsEditing(false);
  };

  return (
    <div className="avatar">
      <div className="w-24 rounded-full">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <input
              type="file"
              onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
              className="file-input file-input-bordered w-full max-w-xs"
            />
            <div className="flex gap-2">
              <button onClick={handleSave} className="btn btn-sm btn-primary">
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-sm btn-ghost"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img src={image || "https://via.placeholder.com/150"} alt="Profile" />
            {editable && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 right-0 btn btn-circle btn-sm"
              >
                ✏️
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}