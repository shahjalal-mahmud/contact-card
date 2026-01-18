import React from "react";
import { useProfileImage } from "../../hooks/useProfileImage";

const DEFAULT_AVATAR = "https://avatars.githubusercontent.com/u/9919?s=200&v=4";

export default function ProfilePicture({ src, editable, onSave }) {
  const { state, actions } = useProfileImage(src, onSave);
  const { isEditing, image, isHovered, uploading, error } = state;

  return (
    <div className="relative group">
      <div className="absolute -inset-4 rounded-full blur-2xl opacity-30 bg-primary/30"></div>

      <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden border-4 border-primary/30 shadow-2xl">
        {isEditing ? (
          <EditOverlay 
            uploading={uploading} 
            error={error} 
            onImageChange={actions.handleImageChange}
            onSave={actions.handleSave}
            onCancel={actions.handleCancel}
            canSave={image && image !== src && !uploading}
          />
        ) : (
          <DisplayOverlay 
            image={image || DEFAULT_AVATAR}
            editable={editable}
            isHovered={isHovered}
            onHover={actions.setIsHovered}
            onEditClick={() => actions.setIsEditing(true)}
          />
        )}
      </div>
    </div>
  );
}

// Small sub-components for even better readability
const EditOverlay = ({ uploading, error, onImageChange, onSave, onCancel, canSave }) => (
  <div className="flex flex-col items-center justify-center h-full gap-4 p-6 bg-base-100">
    <input
      type="file"
      accept="image/*"
      onChange={onImageChange}
      className="file-input file-input-bordered file-input-primary w-full"
      disabled={uploading}
    />
    {uploading && (
      <div className="flex items-center gap-2">
        <span className="loading loading-spinner loading-sm"></span>
        <span className="text-sm">Uploading...</span>
      </div>
    )}
    {error && <div className="alert alert-error p-2 text-xs">{error}</div>}
    <div className="flex gap-3">
      <button onClick={onSave} className="btn btn-primary btn-sm" disabled={!canSave}>
        Save
      </button>
      <button onClick={onCancel} className="btn btn-outline btn-sm">
        Cancel
      </button>
    </div>
  </div>
);

const DisplayOverlay = ({ image, editable, isHovered, onHover, onEditClick }) => (
  <div
    className="relative w-full h-full"
    onMouseEnter={() => onHover(true)}
    onMouseLeave={() => onHover(false)}
  >
    <img src={image} alt="Profile" className="w-full h-full object-cover" />
    {editable && (isHovered || !image) && (
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <button
          onClick={onEditClick}
          className="btn btn-circle bg-white/20 border-0 text-white hover:scale-110"
        >
          ✎
        </button>
      </div>
    )}
  </div>
);