// IconTabContext.js
'use client'
import React, { createContext, useContext, useState } from 'react';

const IconTabContext = createContext()

export const useIconTab = () => {
    const context = useContext(IconTabContext)
    if (!context) {
        throw new Error('useIconTab must be used within an IconTabProvider');
    }
    return context;
}

export const IconTabProvider = ({ children }) => {
    const [iconBoxOpen, setIconBoxOpen] = useState(false)
    const [allIcons, setAllIcons] = useState([])
    const [selectedIcon, setSelectedIcon] = useState(null)
    const [extractedIcons, setExtractedIcons] = useState([]) // Add this

    const value = {
        iconBoxOpen,
        setIconBoxOpen,
        allIcons,
        setAllIcons,
        selectedIcon,
        setSelectedIcon,
        extractedIcons, // Add this
        setExtractedIcons // Add this
    }
    
    return (
        <IconTabContext.Provider value={value}>
            {children}
        </IconTabContext.Provider>
    )
}