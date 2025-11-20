"use client";
import { createContext, useContext, useState } from "react";

const BoxContext = createContext();

export function BoxProvider({ children }) {
  const [boxOpen, setBoxOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  return (
    <BoxContext.Provider value={{ 
      boxOpen, 
      setBoxOpen, 
      activeSection, 
      setActiveSection 
    }}>
      {children}
    </BoxContext.Provider>
  );
}

export function useBox() {
  return useContext(BoxContext);
}