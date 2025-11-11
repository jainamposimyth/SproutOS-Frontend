'use client';
import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-200 shadow-xl z-50 p-4 overflow-y-auto transition-transform duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-black">Edit Page</h2>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-gray-500 hover:text-black" />
        </button>
      </div>

      {/* Page Title */}
      <label className="block text-black text-sm font-medium mb-1">Page Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 text-black rounded-md p-2 text-sm mb-4"
      />

      {/* Sections */}
      <label className="block text-sm font-medium text-black mb-2">Sections</label>

      <div className="space-y-2">
        {sections.map((section, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md p-2 bg-[#F9F9F9]"
          >
            {/* Section Header */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleToggleExpand(index)}
            >
              <input
                type="text"
                value={section.name}
                onChange={(e) => handleSectionChange(index, 'name', e.target.value)}
                className="w-full border border-gray-300 text-black rounded-md p-1 text-sm mr-2"
              />
              {expandedIndex === index ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </div>

            {/* Section Description (only visible when expanded) */}
            {expandedIndex === index && (
              <textarea
                value={section.description}
                onChange={(e) =>
                  handleSectionChange(index, 'description', e.target.value)
                }
                placeholder="Enter description..."
                className="w-full mt-2 border border-gray-300 text-black rounded-md p-2 text-sm"
                rows={3}
              />
            )}
          </div>
        ))}
      </div>

      {/* Footer Buttons */}
      <div className="flex text-black justify-end gap-2 mt-6">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
