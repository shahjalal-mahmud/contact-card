import { useState } from "react";
import { uploadImageToImgBB } from "../../utilis/imageUpload";

export default function ProfilePicture({ src, editable, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(src);
  const [isHovered, setIsHovered] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (!file.type.match('image.*')) {
      setUploadError('Please select an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB max
      setUploadError('Image must be less than 5MB');
      return;
    }

    setUploadError(null);
    setUploadProgress('Uploading...');

    try {
      // Convert to Base64 first
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const imageUrl = await uploadImageToImgBB(event.target.result);
          setImage(imageUrl);
          setUploadProgress(null);
        } catch (error) {
          setUploadError(error.message);
          setUploadProgress(null);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setUploadError(error.message);
      setUploadProgress(null);
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
    setIsEditing(false);
    setUploadError(null);
  };

  return (
    <div className="relative group">
      <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
        {isEditing ? (
          <div className="flex flex-col gap-4 p-4 h-full justify-center items-center">
            <div className="w-full space-y-2">
              <input
                type="file"
                onChange={handleImageChange}
                className="file-input file-input-bordered file-input-primary w-full"
                accept="image/*"
                disabled={uploadProgress !== null}
              />
              
              {uploadProgress && (
                <div className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-xs"></span>
                  <span className="text-sm">{uploadProgress}</span>
                </div>
              )}
              
              {uploadError && (
                <div className="alert alert-error alert-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs">{uploadError}</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={handleSave} 
                className="btn btn-sm btn-primary px-4"
                disabled={!image || image === src || uploadProgress}
              >
                Save
              </button>
              <button
                onClick={handleCancel}
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