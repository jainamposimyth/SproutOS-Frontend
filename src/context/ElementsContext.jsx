// context/ElementsContext.js
'use client'
import React, { createContext, useContext, useState, useCallback } from 'react';

const ElementsContext = createContext(undefined);

export const ElementsProvider = ({ children }) => {
  const [showElementsList, setShowElementsList] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [extractedElements, setExtractedElements] = useState({});
  const [templates] = useState(['website2', 'website3']); // Add templates here

  const onUpdateElement = useCallback((templateId, elementIndex, updates) => {
    setExtractedElements(prev => ({
      ...prev,
      [templateId]: {
        ...prev[templateId],
        elements: prev[templateId]?.elements?.map((element, index) => 
          index === elementIndex ? { ...element, ...updates } : element
        ) || []
      }
    }));
  }, []);

// In your ElementsContext, update the updateDOMElement function:

const updateDOMElement = useCallback((templateId, elementIndex, updates) => {
  // Find the container for this template
  const containerIndex = templates.findIndex(t => t === templateId);
  if (containerIndex === -1) {
    console.log('Template not found:', templateId);
    return;
  }
  
  const container = document.getElementById(`build-container-${containerIndex}`);
  if (!container) {
    console.log('Container not found for template:', templateId);
    return;
  }

  // Get the current extracted elements to find the target element
  const currentExtracted = extractedElements[templateId];
  if (!currentExtracted || !currentExtracted.elements) {
    console.log('No extracted elements for template:', templateId);
    return;
  }
  
  const targetElement = currentExtracted.elements[elementIndex];
  if (!targetElement) {
    console.log('Target element not found at index:', elementIndex);
    return;
  }

  console.log('Updating DOM element:', { 
    templateId, 
    elementIndex, 
    targetElement: {
      tagName: targetElement.tagName,
      text: targetElement.text,
      attributes: targetElement.attributes
    }, 
    updates 
  });

  // Find the actual DOM element based on the stored data
  let domElement = null;
  
  // First try: Use data attributes for precise matching
  if (targetElement.attributes?.dataKey) {
    domElement = container.querySelector(`[data-key="${targetElement.attributes.dataKey}"]`);
    console.log('Looking for data-key element:', targetElement.attributes.dataKey, 'Found:', !!domElement);
  } else if (targetElement.attributes?.dataStore && targetElement.attributes?.dataField) {
    domElement = container.querySelector(`[data-store="${targetElement.attributes.dataStore}"][data-field="${targetElement.attributes.dataField}"]`);
    console.log('Looking for data-store element:', targetElement.attributes.dataStore, targetElement.attributes.dataField, 'Found:', !!domElement);
  }

  // Second try: If not found, try more specific matching
  if (!domElement) {
    console.log('DOM element not found with data attributes, trying enhanced search...');
    
    const allEditableElements = container.querySelectorAll('.editable[data-key], .editable[data-store][data-field]');
    
    for (const el of allEditableElements) {
      let match = false;
      
      // Match by exact text content (for text elements)
      if (targetElement.text && el.textContent?.trim() === targetElement.text.trim()) {
        match = true;
        console.log('Found element by exact text match:', targetElement.text);
      }
      
      // Match by tag name and approximate text
      if (!match && targetElement.text && el.tagName.toLowerCase() === targetElement.tagName) {
        const elText = el.textContent?.trim();
        const targetText = targetElement.text.trim();
        if (elText && targetText && elText.includes(targetText.substring(0, 20))) {
          match = true;
          console.log('Found element by tag name and partial text match');
        }
      }
      
      // Match by image src
      if (!match && targetElement.tagName === 'img' && targetElement.attributes?.src) {
        if (el.src === targetElement.attributes.src) {
          match = true;
          console.log('Found image element by src match');
        }
      }
      
      if (match) {
        domElement = el;
        break;
      }
    }
  }

  if (domElement) {
    console.log('DOM element found, applying updates. Current element text:', domElement.textContent, 'New text:', updates.text);
    
    // Apply the updates to the DOM element
    if (updates.text !== undefined && domElement.tagName !== 'IMG') {
      // Store the original content for comparison
      const originalText = domElement.textContent;
      domElement.textContent = updates.text;
      
      // Save to localStorage
      if (targetElement.attributes?.dataKey) {
        const key = `${templateId}_${targetElement.attributes.dataKey}`;
        localStorage.setItem(key, updates.text);
        console.log('Saved to localStorage with key:', key);
      } else if (targetElement.attributes?.dataStore && targetElement.attributes?.dataField) {
        const storeId = targetElement.attributes.dataStore;
        const fieldName = targetElement.attributes.dataField;
        const key = `${templateId}_${storeId}.${fieldName}`;
        localStorage.setItem(key, updates.text);
        console.log('Saved to localStorage with key:', key);
      }
      
      console.log('Text updated from:', originalText, 'to:', updates.text);
    }
    
    if (updates.attributes?.src && domElement.tagName === 'IMG') {
      domElement.src = updates.attributes.src;
      
      // Save to localStorage
      if (targetElement.attributes?.dataKey) {
        const key = `${templateId}_${targetElement.attributes.dataKey}`;
        localStorage.setItem(key, updates.attributes.src);
      } else if (targetElement.attributes?.dataStore && targetElement.attributes?.dataField) {
        const storeId = targetElement.attributes.dataStore;
        const fieldName = targetElement.attributes.dataField;
        const key = `${templateId}_${storeId}.${fieldName}`;
        localStorage.setItem(key, updates.attributes.src);
      }
    }
    
    // Force a re-render by triggering a custom event
    const event = new CustomEvent('domUpdated', { detail: { templateId } });
    window.dispatchEvent(event);
    
  } else {
    console.log('DOM element still not found after enhanced search');
    console.log('Available elements in container:');
    const allElements = container.querySelectorAll('.editable[data-key], .editable[data-store][data-field]');
    allElements.forEach((el, idx) => {
      console.log(`Element ${idx}:`, {
        tagName: el.tagName,
        text: el.textContent?.trim(),
        dataKey: el.dataset.key,
        dataStore: el.dataset.store,
        dataField: el.dataset.field
      });
    });
  }
}, [extractedElements, templates]);


  const updateElementAndDOM = useCallback((templateId, elementIndex, updates) => {
    console.log('updateElementAndDOM called:', { templateId, elementIndex, updates });
    
    // Update the context state first
    onUpdateElement(templateId, elementIndex, updates);
    
    // Then update the actual DOM element
    setTimeout(() => {
      updateDOMElement(templateId, elementIndex, updates);
    }, 0);
  }, [onUpdateElement, updateDOMElement]);

  const value = {
    showElementsList,
    setShowElementsList,
    activeTemplate,
    setActiveTemplate,
    extractedElements,
    setExtractedElements,
    onUpdateElement,
    updateElementAndDOM, // Export this function
    templates // Export templates
  };

  return (
    <ElementsContext.Provider value={value}>
      {children}
    </ElementsContext.Provider>
  );
};

// Custom hook to use the context
export const useElements = () => {
  const context = useContext(ElementsContext);
  if (context === undefined) {
    throw new Error('useElements must be used within an ElementsProvider');
  }
  return context;
};