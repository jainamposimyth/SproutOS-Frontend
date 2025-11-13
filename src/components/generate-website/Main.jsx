'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useContent } from '@/context/CreateContext';

export default function App() {
  const [templates, setTemplates] = useState(['website2','website3']); 
  const loadedTemplatesRef = useRef(new Set());
  const containerRefsRef = useRef({});
  const { setTemplateContents } = useContent();

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
      setTemplateContents(prev => ({
        ...prev,
        [templateId]: content,
      }));
    };
    
    container.addEventListener('click', handleClick);
    containerRefsRef.current[`${containerId}-handler`] = handleClick;

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

      // Make editable after content is loaded
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

  const makeEditable = (container, templateId) => {
    if (!container) return;
    
    container.querySelectorAll('.editable[data-key]').forEach(el => {
      if (el.querySelector('.editable')) return;
      const key = `${templateId}_${el.dataset.key}`;
      if (!key) return;

      const saved = localStorage.getItem(key);
      if (saved) {
        if (el.tagName === 'IMG') el.src = saved;
        else el.innerText = saved;
      }

      if (el.tagName !== 'IMG') {
        el.setAttribute('contentEditable', 'true');
        el.addEventListener('input', () => localStorage.setItem(key, el.innerText));
      }
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div>
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
            <div
              id={`build-container-${index}`}
              style={{
                padding: '20px',
                minHeight: '300px',
     
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}