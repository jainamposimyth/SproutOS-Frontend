"use client";
import React from "react";

export default function ElementsSidebar({
  showElementsList,
  setShowElementsList,
  activeTemplate,
  extractedElements,
  onUpdateElement,   
}) {
  if (!showElementsList || !activeTemplate || !extractedElements[activeTemplate]) {
    return null;
  }

  const elements = extractedElements[activeTemplate].elements;

  const handleEdit = (index, newValue) => {
    onUpdateElement(activeTemplate, index, newValue);
  };

  return (
    <div
      className="
        fixed left-[75px] top-[62px] w-[350px] h-screen
        bg-white shadow-xl border-r border-gray-200
        z-[100] overflow-y-auto p-5
        animate-slideIn
      "
    >
     
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-gray-800">Elements</h2>

        <button
          onClick={() => setShowElementsList(false)}
          className="
            text-gray-500 text-2xl leading-none
            hover:text-gray-700 transition
          "
        >
          ×
        </button>
      </div>


      <div>
        {elements.map((el, idx) => (
          <div
            key={idx}
            className="
              mb-4 p-4 rounded-lg border border-gray-200 bg-gray-50
              hover:shadow-sm transition
            "
          >
 
            <div className="font-semibold text-gray-900 mb-2 text-sm">
              {el.tagName.toUpperCase()}
            </div>

           
            <textarea
              value={el.text || ""}
              onChange={(e) => handleEdit(idx, e.target.value)}
              placeholder="Edit content..."
              className="
                w-full mt-1 p-3 rounded-md text-sm text-gray-700 bg-white border
                border-gray-300 focus:border-green-500 focus:ring-2
                focus:ring-green-200 outline-none transition resize-none
              "
              rows={3}
            />

          
          </div>
        ))}
      </div>
    </div>
  );
}