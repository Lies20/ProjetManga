import React, { useState } from 'react';
import axios from 'axios';

const CloudinaryUploader = ({ onUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    if (selectedImage) {
      try {
        const formData = new FormData();
        formData.append('file', selectedImage);

        const cloudinaryResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/your-cloud-name/image/upload', // Remplacez 'your-cloud-name' par votre cloud name
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const imageUrl = cloudinaryResponse.data.secure_url;
        onUpload(imageUrl);
      } catch (error) {
        console.error('Erreur lors de l\'upload de l\'image :', error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default CloudinaryUploader;
