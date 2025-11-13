'use client'
import React, { useEffect, useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const SelectedElementContext = React.createContext({
  selectedElement: null,
  setSelectedElement: () => {},
  selectedTexts: '',
  setSelectedTexts: () => {}
});

const useSelectedElement = () => React.useContext(SelectedElementContext);

export default function App() {
  const [templates, setTemplates] = useState(['website2','website3']); 
  const { selectedElement, setSelectedElement } = useSelectedElement();
  const [promptBox, setPromptBox] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const [color, setColor] = useState('#fff');
  const [imagePromptBox, setImagePromptBox] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [availableTemplates] = useState(['website2','website3']);
  const loadedTemplatesRef = useRef(new Set());
  const containerRefsRef = useRef({});

    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
    });


  useEffect(() => {
    const loadAllTemplates = async () => {
      for (let i = 0; i < templates.length; i++) {
        const templateId = templates[i];
        const uniqueKey = `${templateId}-${i}`;
        
       
        if (loadedTemplatesRef.current.has(uniqueKey)) {
          continue;
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        await loadTemplate(templateId, i);
        loadedTemplatesRef.current.add(uniqueKey);
      }
    };

    loadAllTemplates();


    return () => {
      const currentLoadedTemplates = Array.from(loadedTemplatesRef.current);
      currentLoadedTemplates.forEach(key => {
        const templateId = key.split('-')[0];
        if (!templates.includes(templateId)) {
          cleanupTemplate(templateId);
          loadedTemplatesRef.current.delete(key);
        }
      });
    };
  }, [templates.join(',')]); 

  const loadTemplate = async (templateId, index) => {
    const containerId = `build-container-${index}`;
    

    let attempts = 0;
    let container = document.getElementById(containerId);
    
    while (!container && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 50));
      container = document.getElementById(containerId);
      attempts++;
    }
    
    if (!container) {
      console.error(`Container ${containerId} not found after waiting`);
      return;
    }
    
    containerRefsRef.current[containerId] = container;
    container.innerHTML = '';
    
    const handleClick = () => {
      const content = contentExtractor(container);
      console.log(`Template ${templateId} content:`, content);
    };
    container.addEventListener('click', handleClick);
    containerRefsRef.current[`${containerId}-handler`] = handleClick;

    try {
      const response = await fetch(`/templates/${templateId}/index.html`);
      const html = await response.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Load stylesheets
      doc.head.querySelectorAll('link[rel="stylesheet"]').forEach(el => {
        const href = el.getAttribute('href');
        if (!href) return;
        
        // Check if already loaded
        const existingLink = document.head.querySelector(
          `link[data-template="${templateId}"][href*="${href}"]`
        );
        if (existingLink) return;
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `/templates/${templateId}/${href}`;
        link.dataset.template = templateId;
        link.dataset.templateIndex = index;
        document.head.appendChild(link);
      });

      // Load inline styles
      doc.head.querySelectorAll('style').forEach(el => {
        const clone = el.cloneNode(true);
        clone.dataset.template = templateId;
        clone.dataset.templateIndex = index;
        document.head.appendChild(clone);
      });
      
      // Insert HTML content
      container.innerHTML = doc.body.innerHTML;
      
      // Load scripts
      doc.querySelectorAll('script').forEach(oldScript => {
        const script = document.createElement('script');
        if (oldScript.src) {
          const src = oldScript.getAttribute('src');
          if (src) script.src = `/templates/${templateId}/${src}`;
        } else {
          script.textContent = oldScript.textContent;
        }
        script.type = 'module';
        script.dataset.template = templateId;
        script.dataset.templateIndex = index;
        document.body.appendChild(script);
      });

      // Make editable after content is loaded
      await new Promise(resolve => setTimeout(resolve, 500));
      makeEditable(container, templateId);
      
    } catch (error) {
      console.error(`Failed to load template ${templateId}:`, error);
      container.innerHTML = `<p style="color: red; padding: 20px;">Failed to load template: ${templateId}</p>`;
    }
  };

  const cleanupTemplate = (templateId) => {
    // Remove styles
    const addedStyles = document.head.querySelectorAll(`[data-template="${templateId}"]`);
    addedStyles.forEach(s => s.remove());

    // Remove scripts
    const addedScripts = document.body.querySelectorAll(`[data-template="${templateId}"]`);
    addedScripts.forEach(s => s.remove());
    
    // Remove event listeners
    Object.keys(containerRefsRef.current).forEach(key => {
      if (key.includes('handler') && key.includes(templateId)) {
        delete containerRefsRef.current[key];
      }
    });
  };

  const contentExtractor = (container) => {
    let images = [];
    let texts = [];
    let buttons = [];

    container.querySelectorAll("h1, h2, h3, h4, h5, h6, p").forEach(el => {
      const text = el.innerText.trim();
      if (text.length > 5) {
        texts.push(text);
      }
    });

    container.querySelectorAll('img').forEach(img => {
      const src = img.src;
      if (src) {
        images.push(src);
      }
    });

    container.querySelectorAll("button, a").forEach(el => {
      const label = el.innerText.trim();
      if (label) buttons.push(label);
    });

    return {
      texts: Array.from(new Set(texts)),
      images,
      buttons: Array.from(new Set(buttons)),
    };
  };

  const applyTailwindAsInlineStyles = (element, className) => {
    const classes = className.split(' ');
    const tailwindToInlineStyle = {
      'text-red-500': { color: '#ef4444' },
      "text-red-200": {color: '#fecaca'},
      "text-red-300": {color: '#fca5a1'},
      "text-red-400": {color:" '#f87171'}"},
      "text-red-600": {color: '#dc2626'},
      "text-red-700": {color: '#b91c1c'},
      "text-red-800":{color: '#991b1b'},
      "text-red-900": {color: '#7f1d1d'},
      
      "text-blue-200": {color: '#bfdbfe'},
      "text-blue-300": {color: '#93c5fd'},
      "text-blue-400": {color: '#60a5fa'},
      "text-blue-600": {color: '#2563eb'},
      "text-blue-700": {color: '#1d4ed8'},
      "text-blue-800": {color: '#1e40af'},
      "text-blue-900": {color: '#1e3a8a'},
      'text-green-200': {color: '#bbf7d0'},
      'text-green-300': {color: '#86efac'},
      'text-green-400': {color: '#4ade80'},
      'text-green-600': {color: '#16a34a'},
      'text-green-700': {color: '#15803d'},
      'text-green-800': {color: '#166534'},
      'text-green-900': {color: '#14532d'},
      'text-blue-500': { color: '#3b82f6' },
      'text-green-500': { color: '#22c55e' },
      "text-yellow-50": {color: '#fef3c7'},
      'text-gray-700': { color: '#374151' },
      'text-gray-800': { color: '#1f2937' },
      'text-black': { color: '#000000' },

      'text-white': { color: '#ffffff' },
      'text-sm': { fontSize: '14px' },
      'text-base': { fontSize: '16px' },
      'text-lg': { fontSize: '18px' },
      'text-xl': { fontSize: '20px' },
      'text-2xl': { fontSize: '24px' },
      'text-3xl': { fontSize: '30px' },
      'text-4xl': { fontSize: '36px' },
      'font-normal': { fontWeight: '400' },
      'font-medium': { fontWeight: '500' },
      'font-semibold': { fontWeight: '600' },
      'font-bold': { fontWeight: '700' },
      'font-extrabold': { fontWeight: '800' }
    };

    classes.forEach(cls => {
      if (tailwindToInlineStyle[cls]) {
        const styles = tailwindToInlineStyle[cls];
        Object.entries(styles).forEach(([prop, val]) => {
          element.style.setProperty(prop, val, 'important');
        });
      }
    });
  };

  const makeEditable = (container, templateId) => {
    if (!container) return;
    
    container.querySelectorAll('.editable[data-key]').forEach(el => {
      if (el.querySelector('.editable')) return;
      const key = `${templateId}_${el.dataset.key}`;
      if (!key) return;

      const classKey = key + '_class';
      const savedClass = localStorage.getItem(classKey);
      if (savedClass) {
        el.className = savedClass;
        applyTailwindAsInlineStyles(el, savedClass);
      }

      const saved = localStorage.getItem(key);
      if (saved) {
        if (el.tagName === 'IMG') el.src = saved;
        else el.innerText = saved;
      }

      if (el.tagName !== 'IMG') {
        el.setAttribute('contentEditable', 'true');
        el.addEventListener('input', () => localStorage.setItem(key, el.innerText));

        el.addEventListener("mouseup", (e) => {
          const selection = window.getSelection();
          const selectedText = selection?.toString().trim();
          if (!selectedText) return;
          
          setPromptBox(true);
          setSelectedElement(el);
          window.__selectedText = selectedText;
          window.__selectedRange = selection.getRangeAt(0).cloneRange();
          window.__currentTemplateId = templateId;
        });
      } else {
        el.style.cursor = 'pointer';
        el.addEventListener('dblclick', () => {
          const askUseAi = confirm("Do you want to use AI to generate image?");
          if (askUseAi) {
            setSelectedImage(el);
            setImagePromptBox(true);
            window.__currentTemplateId = templateId;
          } else {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const url = URL.createObjectURL(file);
              el.src = url;
              localStorage.setItem(key, url);
            };
            input.click();
          }
        });
      }
    });
  };

  const updateElementStyle = (property, value) => {
    if (!selectedElement) return;

    const currentClasses = selectedElement.className.split(' ').filter(Boolean);
    const classPrefixes = {
      color: ['text-'],
      fontSize: ['text-'],
      fontWeight: ['font-'],
    };

    const prefixesToRemove = classPrefixes[property] || [];
    let filteredClasses = currentClasses.filter(className => {
      if (property === 'color' && className.match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/)) {
        return true;
      }
      if (property === 'fontSize' && !className.match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/)) {
        return true;
      }
      return !prefixesToRemove.some(prefix => className.startsWith(prefix));
    });

    if (value && value.trim() !== '') {
      filteredClasses.push(value.trim());
    }

    const updatedClasses = filteredClasses.join(' ').trim();
    selectedElement.className = updatedClasses;
    applyTailwindAsInlineStyles(selectedElement, value);

    // Save to localStorage with template-specific key
    const templateId = window.__currentTemplateId || templates[0];
    if (selectedElement.dataset.key) {
      const key = `${templateId}_${selectedElement.dataset.key}`;
      localStorage.setItem(key + '_class', updatedClasses);
    }
  };

  return (
    <SelectedElementContext.Provider value={{
      selectedElement,
      setSelectedElement,
      selectedTexts: '',
      setSelectedTexts: () => {}
    }}>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
     
        <div style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          borderBottom: '2px solid #e5e5e5',
          padding: '15px',
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
         

         
            {selectedElement && (
              <>
                <select
                  value={color}
                  onChange={(e) => {
                    setColor(e.target.value);
                    updateElementStyle('color', e.target.value);
                  }}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Text Color</option>
                  <option value="text-red-500">Red</option>
                  <option value="text-blue-500">Blue</option>
                  <option value="text-green-500">Green</option>
                  <option value="text-gray-700">Gray</option>
                </select>

                <select
                  onChange={(e) => updateElementStyle('fontSize', e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Font Size</option>
                  <option value="text-sm">Small</option>
                  <option value="text-base">Base</option>
                  <option value="text-lg">Large</option>
                  <option value="text-xl">XL</option>
                  <option value="text-2xl">2XL</option>
                </select>

                <select
                  onChange={(e) => updateElementStyle('fontWeight', e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Weight</option>
                  <option value="font-normal">Normal</option>
                  <option value="font-medium">Medium</option>
                  <option value="font-semibold">Semibold</option>
                  <option value="font-bold">Bold</option>
                </select>
              </>
            )}
          </div>
        </div>

        {/* Prompt Boxes */}
        {promptBox && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '12px',
            padding: '20px',
            zIndex: 9999,
            width: '320px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <textarea
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                padding: '10px',
                fontSize: '14px',
                minHeight: '80px'
              }}
              placeholder="How you want your sentence to be?"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
              <button
                onClick={() => setPromptBox(false)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: 'white'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('AI generation would happen here');
                  setPromptBox(false);
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Generate
              </button>
            </div>
          </div>
        )}


        <div style={{ padding: '20px' }}>
          {templates.map((templateId, index) => (
            <div
              key={`${templateId}-${index}`}
              style={{
                marginBottom: '40px',
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
     
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 20px',
                backgroundColor: '#f9fafb',
                borderBottom: '1px solid #e5e7eb'
              }}>
             
            
              </div>

           
              <div
                id={`build-container-${index}`}
                style={{
                  padding: '20px',
                  minHeight: '300px',
                  backgroundColor: '#fafafa'
                }}
              ></div>
            </div>
          ))}

        
        </div>
      </div>
    </SelectedElementContext.Provider>
  );
}