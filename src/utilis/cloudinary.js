// src/utilis/cloudinary.js

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const PROFILE_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload image/file to Cloudinary (unsigned)
 */
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", PROFILE_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data?.error?.message || "Cloudinary upload failed");
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    bytes: data.bytes,
    format: data.format,
  };
};

/**
 * ❌ Frontend delete is NOT SAFE
 * Keep this as a stub or remove calls entirely
 */
export const deleteFromCloudinary = async () => {
  console.warn(
    "Cloudinary deletion is disabled on frontend for security reasons."
  );
  return true;
};
