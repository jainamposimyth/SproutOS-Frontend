// contexts/SelectionContext.js
'use client'
import React, { createContext, useContext, useState } from 'react';

const SelectionContext = createContext();

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};

export const SelectionProvider = ({ children }) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectionSource, setSelectionSource] = useState(null); // 'sidebar' or 'preview'

  const selectElement = (element, source = 'preview') => {
    setSelectedElement(element);
    setSelectionSource(source);
    console.log('Element selected:', element, 'from:', source);
  };

  const clearSelection = () => {
    setSelectedElement(null);
    setSelectionSource(null);
  };

  return (
    <SelectionContext.Provider value={{
      selectedElement,
      selectionSource,
      selectElement,
      clearSelection
    }}>
      {children}
    </SelectionContext.Provider>
  );
};