
'use client'
import React, { useEffect, useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useSelectedElement } from '@/context/SelectedElement';

export default function App() {

  const [selectedTemplate, setSelectedTemplate] = useState('website2');
  const { selectedElement, setSelectedElement } = useSelectedElement();
  const [AiResponse, SetAiResponse] = useState('')
  const [promptBox, setPromptBox] = useState(false)
  const [userPrompt, setUserPrompt] = useState('')
  const [color, setColor] = useState('#fff');
  const {selectedTexts, setSelectedTexts} = useSelectedElement()
  const [imagePromptBox , setImagePromptBox ]= useState(false)

  const [imagePrompt,setImagePrompt] =useState('')
  const [selectedImage,setSelectedImage]=useState(null)

  const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
    });



  useEffect(() => {
    const container = document.getElementById('build-container');
    if (!container) return;
    container.innerHTML = '';

    fetch(`/templates/${selectedTemplate}/index.html`)
      .then(res => res.text())
      .then(html => {

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        doc.head.querySelectorAll('link[rel="stylesheet"]').forEach(el => {
        const href = el.getAttribute('href');
          if (!href) return;
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = `/templates/${selectedTemplate}/${href}`;
          link.dataset.template = selectedTemplate;
          document.head.appendChild(link);
        });

        doc.head.querySelectorAll('style').forEach(el => {
          const clone = el.cloneNode(true);
          clone.dataset.template = selectedTemplate;
          document.head.appendChild(clone);
        });
       container.innerHTML = doc.body.innerHTML;
          

        doc.querySelectorAll('script').forEach(oldScript => {
          const script = document.createElement('script');
          if (oldScript.src) {
            const src = oldScript.getAttribute('src');
            if (src) script.src = `/templates/${selectedTemplate}/${src}`;
          } else {
            script.textContent = oldScript.textContent;
          }
          script.type = 'module';
          script.dataset.template = selectedTemplate;
          document.body.appendChild(script);
        });


        setTimeout(() => makeEditable(), 1000);
      });


    return () => {
      const addedStyles = document.head.querySelectorAll(`[data-template="${selectedTemplate}"]`);
      addedStyles.forEach(s => s.remove());

      const addedScripts = document.body.querySelectorAll(`[data-template="${selectedTemplate}"]`);
      addedScripts.forEach(s => s.remove()); 
    };

  }, [selectedTemplate]);


const makeEditable = () => {
  const container = document.getElementById("build-container");
  

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

  container.querySelectorAll('.editable[data-key]').forEach(el => {
    if (el.querySelector('.editable')) return;
    const key = `${selectedTemplate}_${el.dataset.key}`;
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
        setSelectedTexts(selectedText)
        console.log(selectedTexts)
        if (!selectedText) return;
        if (selectedText) {
          setPromptBox(true)
          
         
        }

        setSelectedElement(el);
        
        window.__selectedText = selectedText;
        window.__selectedRange = selection.getRangeAt(0).cloneRange();
        console.log("Selected text stored:", selectedText);
        
      });

    } else {
      el.style.cursor = 'pointer';
      el.addEventListener('dblclick', () => {
        const AskUseAi = confirm("Do you want to use AI to generate image?");
        if(AskUseAi){
          setSelectedImage(el);
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
        
      });
    }
  });

  container.querySelectorAll('.editable[data-store][data-field]').forEach(el => {
    if (el.querySelector('.editable')) return;
    const storeId = el.dataset.store;
    const fieldName = el.dataset.field;
    const storeKey = `${selectedTemplate}_${storeId}.${fieldName}`;
    
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
        if (selectedText) {
          setPromptBox(true)
        }

        setSelectedElement(el);
        window.__selectedText = selectedText;
        window.__selectedRange = selection.getRangeAt(0).cloneRange();
        console.log("Selected text stored:", selectedText);
      });

    } else {
      el.style.cursor = 'pointer';
      el.addEventListener('dblclick', () => {
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

  console.log('Updating style:', { property, value, element: selectedElement });

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
  console.log('Class update:', {
    before: currentClasses,
    after: filteredClasses,
    final: updatedClasses
  });
  
  selectedElement.className = updatedClasses;

  // CRITICAL: Apply inline styles with !important to override Gutenberg styles
  const tailwindToInlineStyle = {
    'text-red-500': { color: '#ef4444' },
    'text-blue-500': { color: '#3b82f6' },
    'text-green-500': { color: '#22c55e' },
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

  if (tailwindToInlineStyle[value]) {
    const styles = tailwindToInlineStyle[value];
    Object.entries(styles).forEach(([prop, val]) => {
      selectedElement.style.setProperty(prop, val, 'important');
    });
  }

  selectedElement.style.display = 'none';
  selectedElement.offsetHeight; 
  selectedElement.style.display = '';

  saveElementClasses(selectedElement, updatedClasses);
};

const saveElementClasses = (element, className) => {
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
        "Authorization": `Bearer ${import.meta.env.VITE_HF_TOKEN}`, 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        response_format: "b64_json",
        prompt: prompt,
        model: "black-forest-labs/flux-schnell",

      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error generating image:", errorText);
      throw new Error("Image generation failed");
    }

    const result = await response.json();
    if (result?.data?.[0]?.b64_json) {
      return `data:image/png;base64,${result.data[0].b64_json}`;
    }

    if (result instanceof Blob) {
      return URL.createObjectURL(result);
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
      alert("select text");
      return;
    }

    const selectedText = window.__selectedText;
    const range = window.__selectedRange;


    const aiResponse = await askAI(selectedText);
    console.log("AI returned:", aiResponse);


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

    SetAiResponse(aiResponse);
  };


const getTemplateEdits = () => {
  const container = document.getElementById("build-container");
  const edits = {};
  const styles = {};
  const dataStoreEdits = {};
  const dataStoreStyles = {};

  container.querySelectorAll('.editable[data-key]').forEach(el => {
    if (el.querySelector('.editable')) return; // only leaf
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

  return { edits, styles, dataStoreEdits, dataStoreStyles };

};


const downloadGutenbergTemplate = async()=>{
  const {edits,styles } = getTemplateEdits()
  
  const htmlTags = 'h1|h2|h3|h4|h5|h6|div|span|p|a|img|header|footer|button|input';
  const GUTENBERG_SELECTOR_TRIM_REGEX = new RegExp(`^(.*?\\b(?:${htmlTags})\\b)(?:\\s.*)?$`, 'i');
  const sanitizeForGutenberg = (selector) => {
    if (!selector || typeof selector !== 'string') return selector;
    return selector.replace(GUTENBERG_SELECTOR_TRIM_REGEX, '$1');
  };
  const tailwindClasses = Object.fromEntries(
    Object.entries(styles).map(([k, v]) => [k, sanitizeForGutenberg(v)])
  )
  const response = await fetch("http://localhost:4000/update-template", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ edits, tailwindClasses, template: "website12" }),
  });
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Template.html";
  a.click();
}

  const downloadElementorTemplate = async()=>{
const {edits,styles} = getTemplateEdits()

const data = {edits,styles,template:"website4"}
 
 
    
    const response = await fetch('http://localhost:3003/api/update-and-download',{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({data})

    })
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url 
    a.download = "elementor-template.json"
    a.click()
}


  const downloadJSX = async () => {
    const { edits , styles } = getTemplateEdits()
  
    const response = await fetch("http://localhost:3001/api/send-jsx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ edits, styles, template: "website13" }),
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Template.jsx";
    a.click();
  };


  return (

    <div >
      <div>
        <div style={{ padding: '15px', marginTop: '10px', display: 'flex', gap: '10px' }}>
          {imagePromptBox && (
  <div
    style={{
      position: "absolute",
      marginTop: "12px",
      backgroundColor: "black",
      color: "white",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "12px",
      zIndex: 9999,
      width: "280px",

    }}
  >
    <textarea
      className="w-full border rounded p-2 text-sm"
      rows={2}
      placeholder="Describe the image you want..."
      value={imagePrompt}
      onChange={(e) => setImagePrompt(e.target.value)}
    />

    <div className="flex justify-end gap-2 mt-2">
      <button
        onClick={() => setImagePromptBox(false)}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        Cancel
      </button>
      <button
        style={{
          color: "white",
          backgroundColor: "black",
          padding: "5px",
          borderRadius: "10px",
        }}
        onClick={async () => {

          if (!selectedImage || !imagePrompt) return alert("Select an image and enter a prompt.");

          const aiImage = await generateImageWithAI(imagePrompt);
          if (aiImage) 
            {
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
        }}
      >
        Generate Image
      </button>
    </div>
  </div>
)}

  {selectedElement && (
    <>
       <select
         value={color}
         onChange={(e) => {
           setColor(e.target.value);
           updateElementStyle('color', e.target.value);
         }}
         className="border rounded p-1 text-sm"
       >
         <option value="">Text Color</option>
         <option value="text-red-500">Red</option>
         <option value="text-blue-500">Blue</option>
         <option value="text-green-500">Green</option>
         <option value="text-gray-700">Gray</option>
       </select>

      

      <select
        onChange={(e) => updateElementStyle('fontSize', e.target.value)}
        className="border rounded p-1 text-sm"
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
        className="border rounded p-1 text-sm"
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

        <div>
          {promptBox && (
            <div
              style={{
                position: "absolute",
               marginTop:"12px",
               backgroundColor:'black',
               color:"white",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "12px",
                zIndex: 9999,
             
                width: "280px",
              }}
            >
              <textarea
                className="w-full border rounded p-2 text-sm"
                rows={2}
                placeholder="how you want your sentence to be?"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
              />

              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setPromptBox(false)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button

                  style={{ color: "white", backgroundColor: "black", padding: '5px', borderRadius: '10px' }}
                  onClick={() => submitPrompt()}
                >
                  Generate
                </button>
              </div>
            </div>
          )}
        </div>
        <div style={{display:"flex" , gap:"10px", marginLeft:'25%', marginTop:"-30px"}}>
    
        <div style={{marginTop:'20px', padding: "15px", gap: "10px", display: 'flex ' }}>
          <button style={{ padding: '10px', border: '1px solid black', borderRadius: "10px", cursor: 'pointer' }}
            onClick={downloadGutenbergTemplate}

          >
            Export as Gutenberg Template
          </button>
          

        </div>
          <div style={{marginTop:'20px', padding: "15px", gap: "10px", display: 'flex ' }}>
          <button style={{ padding: '10px', border: '1px solid black', borderRadius: "10px", cursor: 'pointer' }}
            onClick={downloadElementorTemplate}

          >
            Export as Elementor Template
          </button>
          

        </div>
           <div style={{marginTop:'20px', padding: "15px", gap: "10px", display: 'flex ' }}>
          <button style={{ padding: '10px', border: '1px solid black', borderRadius: "10px", cursor: 'pointer' }}
            onClick={downloadJSX}

          >
            Export as React JSX
          </button>
          

        </div>
        </div>

        <div id="build-container" style={{ backgroundColor: "none", marginLeft: '30px', marginRight: "40px", marginBottom: "40px" }}></div>
      </div>
    </div>
  );
}

