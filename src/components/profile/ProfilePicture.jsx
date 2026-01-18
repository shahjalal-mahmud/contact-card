import React, { useRef } from "react";
import { useProfileImage } from "../../hooks/useProfileImage";
import { FiCamera, FiCheck, FiX, FiLoader } from "react-icons/fi";

const DEFAULT_AVATAR = "https://avatars.githubusercontent.com/u/9919?s=200&v=4";

export default function ProfilePicture({ src, editable, onSave }) {
  const { state, actions } = useProfileImage(src, onSave);
  const { isEditing, image, uploading, error } = state;
  const fileInputRef = useRef(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        {/* Animated Glow Background - Uses Theme Primary Color */}
        <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        
        {/* Main Image Container */}
        <div className="relative w-36 h-36 md:w-44 md:h-44">
          <div className="avatar w-full h-full">
            <div className="w-full rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden bg-base-200">
              <img 
                src={image || DEFAULT_AVATAR} 
                alt="Professional Profile" 
                className={`object-cover transition-opacity duration-300 ${uploading ? 'opacity-40' : 'opacity-100'}`}
              />
            </div>
          </div>

          {/* Uploading Spinner Overlay */}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-base-100/40 rounded-full">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          )}

          {/* Inline Edit Trigger (Visible only if owner/editable) */}
          {editable && !isEditing && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 btn btn-circle btn-primary btn-sm shadow-lg transform transition-transform hover:scale-110"
              title="Change Photo"
            >
              <FiCamera size={16} />
            </button>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            actions.handleImageChange(e);
            actions.setIsEditing(true); // Switch to edit mode to show Save/Cancel
          }}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Inline Action Controls (Appear after selecting a new photo) */}
      {isEditing && !uploading && (
        <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-300">
          <button 
            onClick={actions.handleSave} 
            className="btn btn-success btn-sm btn-circle"
            title="Confirm Change"
          >
            <FiCheck size={18} />
          </button>
          <button 
            onClick={() => {
              actions.handleCancel();
              actions.setIsEditing(false);
            }} 
            className="btn btn-error btn-sm btn-circle"
            title="Cancel"
          >
            <FiX size={18} />
          </button>
        </div>
      )}

      {/* Error Toast-style Message */}
      {error && (
        <div className="text-error text-xs font-medium animate-bounce">
          {error}
        </div>
      )}
    </div>
  );
}