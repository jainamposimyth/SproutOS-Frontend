'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from '@/components/ui/input'
import { useImageBox } from '@/context/ImageBox'
import { useElements } from '@/context/ElementsContext'

const ImageBox = () => {
  const { imageBoxOpen, setImageBoxOpen, allImages, setAllImages } = useImageBox();
  const { activeTemplate, updateElementAndDOM, extractedElements } = useElements();
  const [activeUpload,setActiveUpload] = useState(true)
    const [activeLummi,setActiveLummi] = useState(false)
      const [activeGenerate,setActiveGenerate] = useState(false)
  const [currentImage, setCurrentImage] = useState(null);
  const [overlay, setOverlay] = useState('yes');
    const [hideLabel, setHideLabel] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('edit');
  const [prompt,setPrompt] = useState('')

  const templates = ['website2', 'website3'];
  const currentElements = activeTemplate ? extractedElements[activeTemplate]?.elements || [] : [];
const generateImageWithAI = async (prompt) => {
  try {
    const response = await fetch("https://router.huggingface.co/nebius/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_HF_TOKEN}`,
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
      const generatedImageSrc = `data:image/png;base64,${result.data[0].b64_json}`;
      
      // Update the current image with the generated image
      if (currentImage) {
        updateImageSource(currentImage, generatedImageSrc);
      }
      
      return generatedImageSrc;
    }

    throw new Error("Unexpected image format from API");
  } catch (err) {
    console.error("Image generation failed:", err);
    alert("Image generation failed. Please try again later.");
    return null;
  }
};
  useEffect(() => {
    if (allImages.length > 0 && !currentImage) {
      setCurrentImage(allImages[0]);
    }
  }, [allImages, currentImage]);

  const getElementIndex = (element) => {
    if (!element) return -1;
    return currentElements.findIndex(el =>
      el.id === element.id &&
      el.tagName === element.tagName
    );
  };

  const updateImageSource = (element, newSrc) => {
    if (!element || !activeTemplate) return;

    const elementIndex = getElementIndex(element);
    if (elementIndex === -1) return;

    const container = document.getElementById(`build-container-${templates.findIndex(t => t === activeTemplate)}`);
    if (!container) return;

    let domElement = null;

    if (element.attributes?.dataKey) {
      domElement = container.querySelector(`[data-key="${element.attributes.dataKey}"]`);
    } else if (element.attributes?.dataStore && element.attributes?.dataField) {
      domElement = container.querySelector(`[data-store="${element.attributes.dataStore}"][data-field="${element.attributes.dataField}"]`);
    }

    if (domElement && domElement.tagName.toLowerCase() === 'img') {
      // Update DOM
      domElement.src = newSrc;

      // Update localStorage
      if (element.attributes?.dataKey) {
        const key = `${activeTemplate}_${element.attributes.dataKey}`;
        localStorage.setItem(key + '_src', newSrc);
      } else if (element.attributes?.dataStore && element.attributes?.dataField) {
        const key = `${activeTemplate}_${element.attributes.dataStore}.${element.attributes.dataField}`;
        localStorage.setItem(key + '_src', newSrc);
      }

      // Update context state
      updateElementAndDOM(activeTemplate, elementIndex, {
        attributes: {
          ...element.attributes,
          src: newSrc
        }
      });

      // Update allImages in context to reflect the change
      const updatedAllImages = allImages.map(img => 
        img.id === element.id 
          ? { ...img, attributes: { ...img.attributes, src: newSrc } }
          : img
      );
      setAllImages(updatedAllImages);

      // Update current image if it's the one being modified
      if (currentImage && currentImage.id === element.id) {
        setCurrentImage({
          ...currentImage,
          attributes: {
            ...currentImage.attributes,
            src: newSrc
          }
        });
      }

      // Trigger DOM update event
      window.dispatchEvent(new CustomEvent('domUpdated', {
        detail: { templateId: activeTemplate }
      }));
    }
  };

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file && currentImage) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const newSrc = e.target.result;
  //       updateImageSource(currentImage, newSrc);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleReplaceImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && currentImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newSrc = e.target.result;
        updateImageSource(currentImage, newSrc);
      };
      reader.readAsDataURL(file);
    }
  };


  if (!imageBoxOpen) return null;

  return (
    <div className='p-4 bg-[#FFFDF9] border min-h-screen w-80'>
      <div className='p-4 flex gap-3 items-center'>
        <svg 
          onClick={() => setImageBoxOpen(false)} 
          width="28" 
          height="28" 
          viewBox="0 0 20 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
        >
          <path d="M12.5 15L7.5 10L12.5 5" stroke="#413735" strokeWidth="2.08333" strokeLinecap="square" strokeLinejoin="round"/>
        </svg>
        <h1 className='text-xl text-sprout-color-text-default'>
          Image
        </h1>
      </div>

      <div className="flex flex-col gap-4 mt-2 pl-4">
        <div className="flex justify-between p-2">
          <div className='flex rounded-md p-1 w-full'>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

              <TabsList className="border flex border-sprout-color-border-weak gap-2 bg-transparent px-2 py-6 shadow-none">
                <TabsTrigger
                  value="edit"
                  className="p-0 bg-transparent border-none shadow-none data-[state=active]:bg-transparent"
                >
                  <Button className={`border ${
                    activeTab === 'edit' 
                      ? 'border-sprout-color-secondary bg-white hover:bg-white text-sprout-color-secondary' 
                      : 'text-sprout-color-text-disabled bg-white hover:bg-white'
                  }`}>
                    Edit Image
                  </Button>
                </TabsTrigger>

                <TabsTrigger
                  value="replace"
                  className="p-0 bg-transparent border-none shadow-none data-[state=active]:bg-transparent"
                >
                  <Button className={`border ${
                    activeTab === 'replace' 
                      ? 'border-sprout-color-secondary bg-white hover:bg-white text-sprout-color-secondary' 
                      : 'text-sprout-color-text-disabled bg-white hover:bg-white'
                  }`}>
                    Replace
                  </Button>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="edit" className="m-0 p-0 border-none">
                <div>
                  <div className='pt-6'>
                    {currentImage && currentImage.attributes?.src ? (
                      <img 
                        src={currentImage.attributes.src} 
                        alt={currentImage.attributes?.alt || "Template image"}
                        className="w-full h-auto rounded-md"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-gray-500">No image selected</span>
                      </div>
                    )}
                  </div>

                  

                  <div className='flex justify-between pt-7'>
                    <div className='pt-2 text-sprout-color-text-disabled'>
                      Ratio
                    </div> 
                    <div className='border gap-4 flex justify-between border-sprout-color-border-weak rounded-md px-6 py-2'>
                      <svg className='mt-1' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2.08203" y="2.08594" width="11.8333" height="11.8333" rx="1.25" stroke="#413735" strokeWidth="1.5"/>
                      </svg>
                      <div>
                        1:1
                      </div>
                      <div>
                        <svg className='mt-1' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6L8 10L12 6" stroke="#413735" strokeWidth="1.66667" strokeLinecap="square" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-between pt-7'>
                    <div className='pt-2 text-sprout-color-text-disabled'>
                      Overlay
                    </div> 
                    <div className='border gap-1 flex justify-between border-sprout-color-border-weak rounded-md px-2 py-1'>
                      <Button 
                        className={`border ${
                          overlay === 'yes' 
                            ? 'border-sprout-color-secondary bg-sprout-color-secondary-lightest text-sprout-color-secondary' 
                            : 'text-sprout-color-text-disabled bg-white hover:bg-white'
                        }`}
                        onClick={() => setOverlay('yes')}
                      >
                        Yes
                      </Button>
                      <Button 
                        className={`border ${
                          overlay === 'no' 
                            ? 'border-sprout-color-secondary bg-sprout-color-secondary-lightest text-sprout-color-secondary' 
                            : 'text-sprout-color-text-disabled bg-white hover:bg-white'
                        }`}
                        onClick={() => setOverlay('no')}
                      >
                        No
                      </Button>
                    </div>
                  </div>

                  <div className='flex justify-between pt-7'>
                    <div className='pt-2 text-sprout-color-text-disabled'>
                      Position
                    </div> 
                    <div className='border gap-4 flex justify-between border-sprout-color-border-weak rounded-md px-6 py-2'>
                      <div>
                        Center
                      </div>
                      <div>
                        <svg className='mt-1' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6L8 10L12 6" stroke="#413735" strokeWidth="1.66667" strokeLinecap="square" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="replace" className="m-0 p-0">
                <div>
                  <div className='pt-6'>
                    {currentImage && currentImage.attributes?.src ? (
                      <img 
                        src={currentImage.attributes.src} 
                        alt={currentImage.attributes?.alt || "Template image"}
                        className="w-full h-auto rounded-md"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-gray-500">No image selected</span>
                      </div>
                    )}
                  </div>

               

                  <div className='pt-7'>
                    <div className='pt-2 text-sprout-color-text-disabled'>
                      Content
                    </div> 
                    <div className='border mt-3 flex justify-between border-sprout-color-border-weak rounded-md px-1 py-1'>
                      <Button className="border border-sprout-color-secondary bg-sprout-color-secondary-lightest hover:bg-sprout-color-secondary-lightest text-sprout-color-secondary" onClick={()=> 
                    {
                            setActiveUpload(false)
                        setActiveGenerate(false)
                        setActiveLummi(true)
                    }    }>
                        Lummi
                      </Button>
                      <Button className="text-sprout-color-text-disabled bg-white hover:bg-white" onClick={()=> 
                    {
                            setActiveUpload(true)
                        setActiveGenerate(false)
                        setActiveLummi(false)
                    }    }>
                        Uploads
                      </Button>
                      <Button className="text-sprout-color-text-disabled bg-white hover:bg-white" onClick={()=> 
                    {
                            setActiveUpload(false)
                        setActiveGenerate(true)
                        setActiveLummi(false)
                    }    }>
                        Generate
                      </Button>
                    </div>
                  </div>

              {activeUpload && (
                    <div className='pt-7'>
                    <div className='border p-4 border-dashed border-sprout-color-border-weak rounded-md text-center'>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleReplaceImageUpload}
                        className="hidden"
                        id="image-upload-replace"
                      />
                      <label 
                        htmlFor="image-upload-replace"
                        className="cursor-pointer block"
                      >
                        <div className="text-sprout-color-text-weaker mb-2">
                          Click to upload replacement image
                        </div>
                        <Button className="bg-sprout-color-secondary-lightest text-sprout-color-secondary hover:bg-sprout-color-secondary-light">
                          Choose File
                        </Button>
                      </label>
                    </div>
                  </div>
              )}

      {
  activeGenerate && (
    <>
      <div className='pt-7 relative'>
        <div className='text-[#413735]'>
          Prompt
        </div>
        <Input 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)}  
          placeholder="Write a prompt" 
          onClick={() => setHideLabel(true)} 
          className='border p-4 pt-12 pt-6 mt-2 border-sprout-color-border-weak rounded-md text-center cursor-text placeholder:absolute placeholder:top-3 placeholder:bottom-2'
        />
        
        <div 
          className="flex rounded-md p-1 mt-5 border bg-sprout-color-secondary-lightest border-sprout-color-secondary cursor-pointer"
          onClick={() => generateImageWithAI(prompt)}
        >
          <div className='pl-14 pt-2.5'>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Your SVG code */}
            </svg>
          </div>
          <Button className="bg-transparent hover:bg-transparent cursor-pointer text-sprout-color-secondary">
            Generate
          </Button>
        </div>
    
      </div>
    </>
  )
}
            
               {
            activeLummi && (
                <>
                <div>No content Available</div>
                </>
            )
        }
            

                 
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageBox;