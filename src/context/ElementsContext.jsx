'use client'

import React, { createContext, useContext, useState } from 'react';

const ElementsContext = createContext();

export const useElements = () => {
  const context = useContext(ElementsContext);
  if (!context) {
    throw new Error('useElements must be used within an ElementsProvider');
  }
  return context;
};

export const ElementsProvider = ({ children }) => {
  const [showElementsList, setShowElementsList] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [extractedElements, setExtractedElements] = useState([]);

  const onUpdateElement = (elementId, updates) => {
    setExtractedElements(prev => 
      prev.map(el => el.id === elementId ? { ...el, ...updates } : el)
    );
  };

  const value = {
    showElementsList,
    setShowElementsList,
    activeTemplate,
    setActiveTemplate,
    extractedElements,
    setExtractedElements,
    onUpdateElement
  };

  return (
    <ElementsContext.Provider value={value}>
      {children}
    </ElementsContext.Provider>
  );
};