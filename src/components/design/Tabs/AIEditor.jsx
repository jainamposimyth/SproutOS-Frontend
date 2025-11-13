'use client';
import React, { useEffect, useState } from 'react';
import { useContent } from '@/context/CreateContext';
import { Input } from '@/components/ui/input';

const AIEditor = () => {
  const [formData, setFormData] = useState({});
  const { templateContents, setTemplateContents } = useContent();

  
  useEffect(() => {
    if (templateContents && Object.keys(templateContents).length > 0) {
      setFormData(templateContents);
    }
  }, [templateContents]);

  // Handle live update from editor → context → preview
  const handleChange = (sectionKey, field, value) => {
    // Update local state
    setFormData(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value,
      },
    }));

    // Update global context so preview updates live
    setTemplateContents(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value,
      },
    }));
  };

  if (!formData || Object.keys(formData).length === 0) {
    return (
      <main className="bg-[#FFFDFA] text-black flex-1 overflow-y-auto h-screen rounded-t-xl flex items-center justify-center">
        <p className="text-sprout-color-text-weaker">Loading template data...</p>
      </main>
    );
  }

  return (
    <main className="bg-[#FFFDFA] text-black flex-1 overflow-y-auto h-screen rounded-t-xl">
      <div className="h-full w-80 border p-6 overflow-x-auto">
        <div className="text-xl font-[500] text-sprout-color-text-default">
          Sections
        </div>

        {Object.entries(formData).map(([sectionKey, sectionValue]) => (
          <div
            key={sectionKey}
            className="border-b border-sprout-color-border-weak pb-4 mb-4"
          >
            <div className="text-lg font-semibold text-sprout-color-text-strong mb-2">
              {sectionKey}
            </div>

            {/* Heading */}
            <div className="pt-5 p-2">
              <div className="text-sprout-color-text-weaker pt-3 mb-2 text-md font-[500]">
                Heading
              </div>
              <Input
                value={sectionValue.heading || ''}
                onChange={e =>
                  handleChange(sectionKey, 'heading', e.target.value)
                }
                className="border border-sprout-color-border-weak focus:ring-0 focus-visible:ring-0"
              />
            </div>

            {/* Description */}
            <div className="pt-5 p-2">
              <div className="text-sprout-color-text-weaker pt-3 mb-2 text-md font-[500]">
                Description
              </div>
              <Input
                value={sectionValue.description || ''}
                onChange={e =>
                  handleChange(sectionKey, 'description', e.target.value)
                }
                className="border border-sprout-color-border-weak focus:ring-0 focus-visible:ring-0"
              />
            </div>

            {/* Button */}
            <div className="pt-5 p-2">
              <div className="text-black pt-3 mb-2 text-md font-[500]">
                Button
              </div>
              <Input
                value={sectionValue.button || ''}
                onChange={e =>
                  handleChange(sectionKey, 'button', e.target.value)
                }
                className="border border-sprout-color-border-weak w-full h-12 rounded-md text-center p-3 focus:ring-0 focus-visible:ring-0"
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AIEditor;
