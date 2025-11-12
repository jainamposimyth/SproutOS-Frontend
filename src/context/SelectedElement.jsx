'use client'
import React, { createContext, useContext, useState } from 'react';

const SelectedElementContext = createContext();

export const SelectedElementProvider = ({ children }) => {
  const [selectedTexts, setSelectedTexts] = useState(null);

  return (
    <SelectedElementContext.Provider value={{ selectedTexts, setSelectedTexts }}>
      {children}
    </SelectedElementContext.Provider>
  );
};

export const useSelectedElement = () => useContext(SelectedElementContext);
