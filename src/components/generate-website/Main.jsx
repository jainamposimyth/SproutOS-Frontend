'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useElements } from '@/context/ElementsContext';
// import ElementsSidebar from '../design/Tabs/AIEditor';
import { GoogleGenAI } from "@google/genai";

export default function App() {
  const [templates, setTemplates] = useState(['website2', 'website3']);
  const loadedTemplatesRef = useRef(new Set());
  const containerRefsRef = useRef({});
  
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [promptBox, setPromptBox] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const [color, setColor] = useState('#fff');
  const [imagePromptBox, setImagePromptBox] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  


  const {
    showElementsList,
    setShowElementsList,
    activeTemplate,
    setActiveTemplate,
    extractedElements,
    setExtractedElements,
   
  } = useElements();
   const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
    });

  useEffect(() => {
    console.log("from context", extractedElements);
  }, [extractedElements]);

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
}, [templates]);



useEffect(() => {
  const handleDOMUpdate = (event) => {
    console.log('DOM updated for template:', event.detail.templateId);
    // Optionally refresh the extracted elements
    if (activeTemplate === event.detail.templateId) {
      const containerIndex = templates.findIndex(t => t === activeTemplate);
      if (containerIndex !== -1) {
        const extracted = extractTemplateElements(activeTemplate, containerIndex);
        if (extracted) {
          setExtractedElements(prev => ({
            ...prev,
            [activeTemplate]: extracted
          }));
        }
      }
    }
  };

  window.addEventListener('domUpdated', handleDOMUpdate);
  
  return () => {
    window.removeEventListener('domUpdated', handleDOMUpdate);
  };
}, [activeTemplate, templates]);

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

    try {
      const response = await fetch(`/templates/${templateId}/index.html`);
      const html = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      doc.head.querySelectorAll('link[rel="stylesheet"]').forEach(el => {
        const href = el.getAttribute('href');
        if (!href) return;

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

      doc.head.querySelectorAll('style').forEach(el => {
        const clone = el.cloneNode(true);
        clone.dataset.template = templateId;
        clone.dataset.templateIndex = index;
        document.head.appendChild(clone);
      });

      container.innerHTML = doc.body.innerHTML;

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

      await new Promise(resolve => setTimeout(resolve, 500));
      makeEditable(container, templateId);
      
   

    } catch (error) {
      console.error(`Failed to load template ${templateId}:`, error);
      container.innerHTML = `<p style="color: red; padding: 20px;">Failed to load template: ${templateId}</p>`;
    }
  };

  const cleanupTemplate = (templateId) => {
    const addedStyles = document.head.querySelectorAll(`[data-template="${templateId}"]`);
    addedStyles.forEach(s => s.remove());

    const addedScripts = document.body.querySelectorAll(`[data-template="${templateId}"]`);
    addedScripts.forEach(s => s.remove());

    Object.keys(containerRefsRef.current).forEach(key => {
      if (key.includes('handler') && key.includes(templateId)) {
        delete containerRefsRef.current[key];
      }
    });
  };

  const applyTailwindAsInlineStyles = (element, className) => {
    const classes = className.split(' ');
    const tailwindToInlineStyle = { 
      'text-red-500': { color: '#ef4444' },
      'text-red-200': { color: '#fecaca' },
      'text-red-300': { color: '#fca5a1' },
      'text-red-400': { color: '#f87171' },
      'text-red-600': { color: '#dc2626' },
      'text-blue-500': { color: '#3b82f6' },
      'text-blue-200': { color: '#bfdbfe' },
      'text-blue-600': { color: '#2563eb' },
      'text-green-500': { color: '#22c55e' },
      'text-green-200': { color: '#bbf7d0' },
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
          setSelectedTemplate(templateId);
          window.__selectedText = selectedText;
          window.__selectedRange = selection.getRangeAt(0).cloneRange();
        });
      
      }
       else {
        el.style.cursor = 'pointer';
        el.addEventListener('dblclick', () => {
          const AskUseAi = confirm("Do you want to use AI to generate image?");
          if (AskUseAi) {
            setSelectedImage(el);
            setSelectedTemplate(templateId);
            setImagePromptBox(true);
            return;
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

        el.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          const url = prompt("Enter image URL:");
          if (url) {
            el.src = url;
            localStorage.setItem(key, url);
          }
          else{
            console.log("url not found")
          }
        });
      }
    });

   
    container.querySelectorAll('.editable[data-store][data-field]').forEach(el => {
      if (el.querySelector('.editable')) return;
      const storeId = el.dataset.store;
      const fieldName = el.dataset.field;
      const storeKey = `${templateId}_${storeId}.${fieldName}`;

      if (!storeId || !fieldName) return;

      const classKey = storeKey + '_class';
      const savedClass = localStorage.getItem(classKey);
      if (savedClass) {
        el.className = savedClass;
        applyTailwindAsInlineStyles(el, savedClass);
      }

      const saved = localStorage.getItem(storeKey);
      if (saved) {
        if (el.tagName === 'IMG') el.src = saved;
        else el.innerText = saved;
      }

      if (el.tagName !== 'IMG') {
        el.setAttribute('contentEditable', 'true');
        el.addEventListener('input', () => localStorage.setItem(storeKey, el.innerText));

        el.addEventListener("mouseup", (e) => {
          const selection = window.getSelection();
          const selectedText = selection?.toString().trim();
          if (!selectedText) return;
          
          setPromptBox(true);
          setSelectedElement(el);
          setSelectedTemplate(templateId);
          window.__selectedText = selectedText;
          window.__selectedRange = selection.getRangeAt(0).cloneRange();
        });
      } else {
        el.style.cursor = 'pointer';
        el.addEventListener('dblclick', () => {
          const AskUseAi = confirm("Do you want to use AI to generate image?");
          if (AskUseAi) {
            setSelectedImage(el);
            setSelectedTemplate(templateId);
            setImagePromptBox(true);
            return;
          } else {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const url = URL.createObjectURL(file);
              el.src = url;
              localStorage.setItem(storeKey, url);
            };
            input.click();
          }
        });

        el.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          const url = prompt("Enter image URL:");
          if (url) {
            el.src = url;
            localStorage.setItem(storeKey, url);
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
      backgroundColor: ['bg-']
    };

    const prefixesToRemove = classPrefixes[property] || [];

    let filteredClasses = currentClasses.filter(className => {
      if (property === 'color') {
        if (className.match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/)) {
          return true;
        }
        if (className.startsWith('text-')) {
          return false;
        }
      }

      if (property === 'fontSize') {
        if (!className.match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/)) {
          return true;
        }
        if (className.startsWith('text-')) {
          return false;
        }
      }

      return !prefixesToRemove.some(prefix => className.startsWith(prefix));
    });

    if (value && value.trim() !== '') {
      filteredClasses.push(value.trim());
    }

    const updatedClasses = filteredClasses.join(' ').trim();
    selectedElement.className = updatedClasses;

    applyTailwindAsInlineStyles(selectedElement, updatedClasses);

    selectedElement.style.display = 'none';
    selectedElement.offsetHeight;
    selectedElement.style.display = '';

    saveElementClasses(selectedElement, updatedClasses);
  };

  const saveElementClasses = (element, className) => {
    if (!selectedTemplate) return;
    
    if (element.dataset.key) {
      const key = `${selectedTemplate}_${element.dataset.key}`;
      localStorage.setItem(key + '_class', className);
    } else if (element.dataset.store && element.dataset.field) {
      const storeId = element.dataset.store;
      const fieldName = element.dataset.field;
      const key = `${selectedTemplate}_${storeId}.${fieldName}`;
      localStorage.setItem(key + '_class', className);
    }
  };

  const generateImageWithAI = async (prompt) => {
    try {
      
      const response = await fetch("https://router.huggingface.co/nebius/v1/images/generations", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${NEXT_PUBLIC_HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          response_format: "b64_json",
          prompt: prompt,
          model: "black-forest-labs/flux-schnell",
        }),
      });

      if (!response.ok) {
        throw new Error("Image generation failed");
      }

      const result = await response.json();
      if (result?.data?.[0]?.b64_json) {
        return `data:image/png;base64,${result.data[0].b64_json}`;
      }

      throw new Error("Unexpected image format from API");
    } catch (err) {
      console.error("Image generation failed:", err);
      alert("Image generation failed. Please try again later.");
      return null;
    }
  };

 const askAI = async (selectedText) => {
    const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Rewrite the given sentence/word as per the user's ${userPrompt}.
        - Respond with limited words/sentence (as per the ${selectedText} and ${userPrompt} ).
        - no explanations, no punctuation, no quotes.
        - Output must be a valid english based on given ${selectedText} — nothing else.
          Word: ${selectedText}
          Prompt: ${userPrompt}

        `,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      }
    })

    const ans = response.text;
    return ans;
 }

  const submitPrompt = async () => {
    if (!selectedElement || !window.__selectedText || !window.__selectedRange) {
      alert("Please select text first");
      return;
    }

    const selectedText = window.__selectedText;
    const range = window.__selectedRange;

    const aiResponse = await askAI(selectedText);

    range.deleteContents();
    range.insertNode(document.createTextNode(aiResponse));

    if (selectedElement.dataset.key) {
      const key = `${selectedTemplate}_${selectedElement.dataset.key}`;
      localStorage.setItem(key, selectedElement.innerText);
    } else if (selectedElement.dataset.store && selectedElement.dataset.field) {
      const storeId = selectedElement.dataset.store;
      const fieldName = selectedElement.dataset.field;
      const key = `${selectedTemplate}_${storeId}.${fieldName}`;
      localStorage.setItem(key, selectedElement.innerText);
    }

    window.__selectedText = null;
    window.__selectedRange = null;
    setPromptBox(false);
    setUserPrompt('');
  };

const getTemplateEdits = (templateId, containerIndex) => {
  const container = document.getElementById(`build-container-${containerIndex}`);
  if (!container) return { edits: {}, styles: {}, dataStoreEdits: {}, dataStoreStyles: {}, theme: {} };

  const edits = {};
  const styles = {};
  const dataStoreEdits = {};
  const dataStoreStyles = {};

  // Get current theme data
  const themeData = JSON.parse(localStorage.getItem(`${templateId}_theme_data`) || '{}');
  const currentTheme = localStorage.getItem(`${templateId}_theme`) || 'light';

  container.querySelectorAll('.editable[data-key]').forEach(el => {
    if (el.querySelector('.editable')) return;
    const key = el.dataset.key;
    if (!key) return;

    if (el.tagName === 'IMG') {
      edits[key] = el.src;
    } else {
      edits[key] = el.innerText.trim();
    }

    styles[key] = el.className.trim();
  });

  container.querySelectorAll('.editable[data-store][data-field]').forEach(el => {
    if (el.querySelector('.editable')) return;
    const storeId = el.dataset.store;
    const fieldName = el.dataset.field;

    if (!storeId || !fieldName) return;

    if (!dataStoreEdits[storeId]) {
      dataStoreEdits[storeId] = {};
    }
    if (!dataStoreStyles[storeId]) {
      dataStoreStyles[storeId] = {};
    }

    if (el.tagName === 'IMG') {
      dataStoreEdits[storeId][fieldName] = el.src;
    } else {
      dataStoreEdits[storeId][fieldName] = el.innerText.trim();
    }

    dataStoreStyles[storeId][fieldName] = el.className.trim();
  });



  return { 
    edits, 
    styles, 
    dataStoreEdits, 
    dataStoreStyles, 
    theme: {
      current: currentTheme,
      data: themeData
    },
    containerClasses: Array.from(container.classList)
  };
};

  const extractTemplateElements = (templateId, containerIndex) => {
    const container = document.getElementById(`build-container-${containerIndex}`);
    if (!container) return null;

    const extracted = {
      templateId: templateId,
      timestamp: new Date().toISOString(),
      elements: [],
      stats: {
        totalElements: 0,
        byType: {}
      }
    };

    const editableElements = container.querySelectorAll('.editable[data-key], .editable[data-store][data-field]');
    
    editableElements.forEach((el, index) => {
      const elementData = {
        index: index,
        tagName: el.tagName.toLowerCase(),
        id: el.id || null,
        className: el.className || null,
        text: el.tagName === 'IMG' ? null : (el.innerText?.trim() || el.textContent?.trim() || null),
        attributes: {}
      };

    
      if (el.dataset.key) {
        elementData.attributes.dataKey = el.dataset.key;
      }
      if (el.dataset.store) {
        elementData.attributes.dataStore = el.dataset.store;
      }
      if (el.dataset.field) {
        elementData.attributes.dataField = el.dataset.field;
      }

     
      if (el.tagName === 'IMG') {
        elementData.attributes.src = el.src || null;
        elementData.attributes.alt = el.alt || null;
      }

      
      if (el.style.cssText) {
        elementData.inlineStyles = el.style.cssText;
      }

      extracted.elements.push(elementData);
    });

   
    extracted.stats.totalElements = extracted.elements.length;
    
    // Count by type
    extracted.elements.forEach(element => {
      if (!extracted.stats.byType[element.tagName]) {
        extracted.stats.byType[element.tagName] = 0;
      }
      extracted.stats.byType[element.tagName]++;
    });

    return extracted;
  };

const handleTemplateClick = (templateId, containerIndex) => {
  setActiveTemplate(templateId);
  setShowElementsList(true);

  const extracted = extractTemplateElements(templateId, containerIndex);
  
  if (extracted) {
    setExtractedElements(prev => ({
      ...prev,
      [templateId]: extracted
    }));
    
    
  }
};


  const downloadGutenbergTemplate = async (templateId, index) => {
    const { edits, styles } = getTemplateEdits(templateId, index);

    const htmlTags = 'h1|h2|h3|h4|h5|h6|div|span|p|a|img|header|footer|button|input';
    const GUTENBERG_SELECTOR_TRIM_REGEX = new RegExp(`^(.*?\\b(?:${htmlTags})\\b)(?:\\s.*)?$`, 'i');
    const sanitizeForGutenberg = (selector) => {
      if (!selector || typeof selector !== 'string') return selector;
      return selector.replace(GUTENBERG_SELECTOR_TRIM_REGEX, '$1');
    };
    const tailwindClasses = Object.fromEntries(
      Object.entries(styles).map(([k, v]) => [k, sanitizeForGutenberg(v)])
    );

    try {
      const response = await fetch("http://localhost:4000/update-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ edits, tailwindClasses, template: templateId }),
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${templateId}-gutenberg.html`;
      a.click();
    } catch (error) {
      console.error("Gutenberg export failed:", error);
      alert("Export failed. Please ensure the backend server is running.");
    }
  };

  const downloadElementorTemplate = async (templateId, index) => {
    const { edits, styles } = getTemplateEdits(templateId, index);
    const data = { edits, styles, template: templateId };

    try {
      const response = await fetch('http://localhost:3003/api/update-and-download', {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ data })
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${templateId}-elementor.json`;
      a.click();
    } catch (error) {
      console.error("Elementor export failed:", error);
      alert("Export failed. Please ensure the backend server is running.");
    }
  };

const downloadJSX = async ( index) => {
  const { edits, styles, theme, containerClasses } = getTemplateEdits(index);
  const templateId = 'website12'
  try {
    const response = await fetch("http://localhost:3001/api/send-jsx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        edits, 
        styles, 
        template: templateId,
        theme: theme,
        containerClasses: containerClasses 
      }),
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${templateId}-template.jsx`;
    a.click();
  } catch (error) {
    console.error("JSX export failed:", error);
    alert("Export failed. Please ensure the backend server is running.");
  }
};

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
   
      {promptBox && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: 'black',
            color: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "12px",
            zIndex: 9999,
            width: "320px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
          }}
        >
          <textarea
            style={{
              width: "100%",
              border: "1px solid #555",
              borderRadius: "4px",
              padding: "8px",
              fontSize: "14px",
              backgroundColor: "#222",
              color: "white"
            }}
            rows={3}
            placeholder="How do you want to change this text?"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "8px" }}>
            <button
              onClick={() => {
                setPromptBox(false);
                setUserPrompt('');
              }}
              style={{
                fontSize: "14px",
                color: "#aaa",
                background: "none",
                border: "none",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button
              style={{
                color: "white",
                backgroundColor: "#4CAF50",
                padding: '8px 16px',
                borderRadius: '6px',
                border: "none",
                cursor: "pointer"
              }}
              onClick={submitPrompt}
            >
              Generate
            </button>
          </div>
        </div>
      )}

    
      {imagePromptBox && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "black",
            color: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "12px",
            zIndex: 9999,
            width: "320px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
          }}
        >
          <textarea
            style={{
              width: "100%",
              border: "1px solid #555",
              borderRadius: "4px",
              padding: "8px",
              fontSize: "14px",
              backgroundColor: "#222",
              color: "white"
            }}
            rows={3}
            placeholder="Describe the image you want..."
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "8px" }}>
            <button
              onClick={() => {
                setImagePromptBox(false);
                setImagePrompt('');
              }}
              style={{
                fontSize: "14px",
                color: "#aaa",
                background: "none",
                border: "none",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button
              style={{
                color: "white",
                backgroundColor: "#4CAF50",
                padding: '8px 16px',
                borderRadius: '6px',
                border: "none",
                cursor: "pointer"
              }}
              onClick={async () => {
                if (!selectedImage || !imagePrompt) {
                  alert("Select an image and enter a prompt.");
                  return;
                }

                const aiImage = await generateImageWithAI(imagePrompt);
                if (aiImage) {
                  selectedImage.src = aiImage;

                  if (selectedImage.dataset.key) {
                    const key = `${selectedTemplate}_${selectedImage.dataset.key}`;
                    localStorage.setItem(key, aiImage);
                  } else if (selectedImage.dataset.store && selectedImage.dataset.field) {
                    const storeId = selectedImage.dataset.store;
                    const fieldName = selectedImage.dataset.field;
                    const key = `${selectedTemplate}_${storeId}.${fieldName}`;
                    localStorage.setItem(key, aiImage);
                  }
                }
                setImagePromptBox(false);
                setImagePrompt('');
              }}
            >
              Generate Image
            </button>
          </div>
        </div>
      )}

 {/* <ElementsSidebar
  showElementsList={showElementsList}
  setShowElementsList={setShowElementsList}
  activeTemplate={activeTemplate}
  extractedElements={extractedElements}
  onUpdateElement={onUpdateElement}
/> */}

      {/* Style Controls */}
      {selectedElement && (
        <div style={{
          padding: '15px',
          backgroundColor: 'white',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <select
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              updateElementStyle('color', e.target.value);
            }}
            style={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '6px',
              fontSize: '14px'
            }}
          >
            <option value="">Text Color</option>
            <option value="text-red-500">Red</option>
            <option value="text-blue-500">Blue</option>
            <option value="text-green-500">Green</option>
            <option value="text-gray-700">Gray</option>
            <option value="text-black">Black</option>
          </select>

          <select
            onChange={(e) => updateElementStyle('fontSize', e.target.value)}
            style={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '6px',
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
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '6px',
              fontSize: '14px'
            }}
          >
            <option value="">Weight</option>
            <option value="font-normal">Normal</option>
            <option value="font-medium">Medium</option>
            <option value="font-semibold">Semibold</option>
            <option value="font-bold">Bold</option>
          </select>
        </div>
      )}


      <div style={{ padding: '20px' }}>
        {templates.map((templateId, index) => (
          <div
            key={`${templateId}-${index}`}
            style={{
              marginBottom: '20px',
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
       
            <div style={{
              display: 'flex',
              gap: '10px',
              padding: '15px',
              backgroundColor: '#f9f9f9',
              borderBottom: '1px solid #eee',
              flexWrap: 'wrap'
            }}>
              {/* <button
                onClick={() => handleExtractElements(templateId, index)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Extract Elements
              </button> */}

              <button
                onClick={() => downloadGutenbergTemplate(templateId, index)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Export as Gutenberg
              </button>

              <button
                onClick={() => downloadElementorTemplate(templateId, index)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Export as Elementor
              </button>

              <button
                onClick={() => downloadJSX(templateId, index)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Export as React
              </button>
            </div>

            {/* Template Container */}
            <div
              id={`build-container-${index}`}
              onClick={() => handleTemplateClick(templateId, index)}
              style={{
                padding: '20px',
                minHeight: '300px',
                cursor: 'pointer',
                border: activeTemplate === templateId ? '2px solid #4CAF50' : '2px solid transparent',
                transition: 'border 0.2s'
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}