import { useState } from "react";
import { uploadToCloudinary } from "../../utilis/cloudinary";

export default function ProfilePicture({ src, editable, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(src);
  const [isHovered, setIsHovered] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null); // Clear previous errors
      const result = await uploadToCloudinary(file);
      setImage(result.url);
    } catch (err) {
      setError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    if (image && image !== src) {
      onSave(image);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setImage(src);
    setError(null);
    setIsEditing(false);
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-4 rounded-full blur-2xl opacity-30 bg-primary/30"></div>

      <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden border-4 border-primary/30 shadow-2xl">
        {isEditing ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 p-6 bg-base-100">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered file-input-primary w-full"
              disabled={uploading}
            />

            {uploading && (
              <div className="flex items-center gap-2">
                <span className="loading loading-spinner loading-sm"></span>
                <span className="text-sm">Uploading...</span>
              </div>
            )}

            {error && (
              <div className="alert alert-error p-2 text-xs">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="btn btn-primary btn-sm"
                disabled={!image || image === src || uploading}
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="btn btn-outline btn-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            className="relative w-full h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={
                image ||
                "https://avatars.githubusercontent.com/u/9919?s=200&v=4"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />

            {editable && (isHovered || !image) && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-circle bg-white/20 border-0 text-white hover:scale-110"
                >
                  ✎
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}