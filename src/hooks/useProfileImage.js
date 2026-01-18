import { useState } from "react";
import { uploadToCloudinary } from "../utilis/cloudinary";

export const useProfileImage = (initialSrc, onSave) => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(initialSrc);
  const [isHovered, setIsHovered] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      const result = await uploadToCloudinary(file);
      setImage(result.url);
    } catch (err) {
      setError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    if (image && image !== initialSrc) {
      onSave(image);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setImage(initialSrc);
    setError(null);
    setIsEditing(false);
  };

  return {
    state: { isEditing, image, isHovered, uploading, error },
    actions: { 
        setIsEditing, 
        setIsHovered, 
        handleImageChange, 
        handleSave, 
        handleCancel 
    },
  };
};