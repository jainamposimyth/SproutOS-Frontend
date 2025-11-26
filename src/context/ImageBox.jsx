'use client'
import React, { createContext, useContext, useState } from 'react';

const ImageBoxContext = createContext();

export const useImageBox = () => {
  const context = useContext(ImageBoxContext);
  if (!context) {
    throw new Error('useImageBox must be used within an ImageBoxProvider');
  }
  return context;
};

export const ImageBoxProvider = ({ children }) => {
  const [imageBoxOpen, setImageBoxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [allImages, setAllImages] = useState([]);

  const value = {
    imageBoxOpen,
    setImageBoxOpen,
    selectedImage,
    setSelectedImage,
    allImages,
    setAllImages
  
  };

  return (
    <ImageBoxContext.Provider value={value}>
      {children}
    </ImageBoxContext.Provider>
  );
};