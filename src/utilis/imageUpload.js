export const uploadImageToImgBB = async (file) => {
  const formData = new FormData();
  formData.append('image', file.split(',')[1]); // Remove the Base64 prefix
  
  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      {
        method: 'POST',
        body: formData
      }
    );
    
    const data = await response.json();
    
    if (data.success) {
      return data.data.url; // Return the image URL
    } else {
      throw new Error(data.error.message || 'Image upload failed');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};