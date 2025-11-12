'use client';
import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';

export default function SideEditor({ node, onSave, onClose }) {
  const [title, setTitle] = useState(node.data.title || '');
  const [sections, setSections] = useState(
    node.data.sections?.map(s => ({
      name: s.name || s,
      description: s.description || '',
    })) || []
  );
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleSectionChange = (index, key, value) => {
    const updated = [...sections];
    updated[index][key] = value;
    setSections(updated);
  };

  const handleToggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSave = () => {
    const updatedData = {
      ...node.data,
      title,
      sections,
    };
    onSave({ ...node, data: updatedData });
  };

  return (
    <div>
  <div className="absolute top-0 left-16 rounded-t-xl h-full w-80 bg-white border-l border-gray-200 shadow-xl z-50 p-4 overflow-y-auto transition-transform duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-black">Project</h2>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-gray-500 hover:text-black" />
        </button>
      </div>


  <div className='text-md font-[500] pt-3 text-sprout-color-text-default'>
              Name
            </div>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
       className="w-full border border-sprout-color-border-weak text-black rounded-md p-3 mt-2 text-sm mb-4 
             focus:outline-none focus:ring-0  focus:border focus:border-sprout-color-border-weak focus-visible:ring-0 "
/>


       <div className='text-md  pt-5 font-[500] text-sprout-color-text-default'>
              Sections
            </div>

      <div className="">
        {sections.map((section, index) => (
          <div
            key={index}
            className="rounded-md p-2 "
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleToggleExpand(index)}
            >
              <Input
                type="text"
                value={section.name}
                onChange={(e) => handleSectionChange(index, 'name', e.target.value)}
              className="w-full border border-sprout-color-border-weak text-black rounded-md p-3 mt-2 text-sm mb-4 
             focus:outline-none focus:ring-0  focus:border focus:border-sprout-color-border-weak focus-visible:ring-0 "
/>
    
              {expandedIndex === index ? (
                <ChevronDown className="w-4 h-4 ml-3 -mt-2 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 ml-3 -mt-2 text-gray-600" />
              )}
            </div>


            {expandedIndex === index && (

           <>
            <div className='text-sm font-[500] text-sprout-color-text-default'>
              Description
            </div>

              <textarea
                value={section.description}
                onChange={(e) =>
                  handleSectionChange(index, 'description', e.target.value)
                }
                placeholder="Enter description..."
                className="w-full mt-2 border border-gray-300 text-black rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-0  focus:border focus:border-sprout-color-border-weak focus-visible:ring-0"
                rows={3}
              />
              </>
            )}
          </div>
        ))}
      </div>

   
      <div className="flex text-black justify-end gap-2 mt-6">
        <Button className="cursor-pointer" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button className="bg-sprout-color-secondary-lightest hover:bg-sprout-color-secondary-lightest text-sprout-color-secondary border border-sprout-color-secondary-lighter cursor-pointer" onClick={handleSave}> 
          Save
        </Button>
      </div>
    </div>

    </div>
  
  );
}
