import { useState } from "react";
import { uploadImageToImgBB } from "../../utilis/imageUpload";

export default function ProfilePicture({ src, editable, onSave, isDarkMode = false }) {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(src);
  const [isHovered, setIsHovered] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setUploadError('Please select an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be less than 5MB');
      return;
    }

    setUploadError(null);
    setUploadProgress('Uploading...');

    try {
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
      {/* Decorative background blur */}
      <div className={`absolute -inset-4 rounded-full blur-2xl opacity-30 ${
        isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
      }`}></div>
      
      {/* Profile picture container */}
      <div className={`relative w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden border-4 transition-all duration-500 hover:scale-105 ${
        isDarkMode 
          ? 'border-blue-500/30 shadow-2xl shadow-blue-500/20' 
          : 'border-blue-400/30 shadow-2xl shadow-blue-400/20'
      }`}>
        {isEditing ? (
          <div className={`flex flex-col gap-4 p-6 h-full justify-center items-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <div className="w-full space-y-4">
              <label className="block">
                <span className={`block mb-2 text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Upload New Photo
                </span>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full max-w-xs bg-transparent"
                  accept="image/*"
                  disabled={uploadProgress !== null}
                />
              </label>
              
              {uploadProgress && (
                <div className="flex items-center gap-3">
                  <div className="loading loading-spinner loading-sm text-primary"></div>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {uploadProgress}
                  </span>
                </div>
              )}
              
              {uploadError && (
                <div className="alert alert-error p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs">{uploadError}</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-3 mt-4">
              <button 
                onClick={handleSave} 
                className="btn btn-primary btn-sm px-6 rounded-lg hover:scale-105 transition-transform"
                disabled={!image || image === src || uploadProgress}
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className={`btn btn-sm px-6 rounded-lg hover:scale-105 transition-transform ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
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
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-3xl transition-all duration-300 backdrop-blur-sm">
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-circle btn-md bg-white/20 hover:bg-white/30 border-0 text-white hover:scale-110 transition-transform backdrop-blur-sm"
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