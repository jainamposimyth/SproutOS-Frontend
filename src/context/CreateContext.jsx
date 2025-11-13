'use client';
import React, { createContext, useContext, useState } from 'react';

// Create the context
const ContentContext = createContext();

// Provider component
export const ContentProvider = ({ children }) => {
  const [templateContents, setTemplateContents] = useState({});

  return (
    <ContentContext.Provider value={{ templateContents, setTemplateContents }}>
      {children}
    </ContentContext.Provider>
  );
};

// Custom hook to use the context easily
export const useContent = () => useContext(ContentContext);
