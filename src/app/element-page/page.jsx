'use client'
import React, { useState, useEffect } from 'react';
import ElementsSidebar from '@/components/design/Tabs/AIEditor';
export default function ElementsPage() {
  const [extractedElements, setExtractedElements] = useState({});
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [showElementsList, setShowElementsList] = useState(true);

  useEffect(() => {
    const savedElements = localStorage.getItem('extractedElements');
    if (savedElements) {
      setExtractedElements(JSON.parse(savedElements));
    }


    const templateKeys = Object.keys(extractedElements);
    if (templateKeys.length > 0 && !activeTemplate) {
      setActiveTemplate(templateKeys[0]);
    }
  }, []);

  
  const handleTemplateSelect = (templateId) => {
    setActiveTemplate(templateId);
    setShowElementsList(true);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
          Template Elements Manager
        </h1>

        {/* Template Selection */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ marginBottom: '15px', fontSize: '18px' }}>Select Template</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {Object.keys(extractedElements).map(templateId => (
              <button
                key={templateId}
                onClick={() => handleTemplateSelect(templateId)}
                style={{
                  padding: '10px 20px',
                  border: activeTemplate === templateId ? '2px solid #4CAF50' : '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: activeTemplate === templateId ? '#4CAF50' : 'white',
                  color: activeTemplate === templateId ? 'white' : '#333',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {templateId}
                <div style={{ fontSize: '12px', opacity: '0.8' }}>
                  {extractedElements[templateId].stats.totalElements} elements
                </div>
              </button>
            ))}
          </div>
        </div>


        {activeTemplate && extractedElements[activeTemplate] && (
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}>
            <h3 style={{ marginBottom: '15px', fontSize: '16px', fontWeight: '600' }}>
              Elements Summary for {activeTemplate}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {Object.entries(extractedElements[activeTemplate].stats.byType).map(([type, count]) => (
                <div key={type} style={{
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#4CAF50' }}>
                    {count}
                  </div>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: '600', color: '#666' }}>
                    {type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div style={{
          backgroundColor: '#e3f2fd',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #bbdefb'
        }}>
          <h3 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: '600', color: '#1976d2' }}>
            How to Use
          </h3>
          <ul style={{ color: '#1976d2', fontSize: '14px', lineHeight: '1.6' }}>
            <li>Select a template from the options above to view its elements</li>
            <li>The sidebar shows all editable elements with their data attributes</li>
            <li>Elements are categorized by type (h1, p, img, etc.)</li>
            <li>Click on any template button to switch between different templates</li>
          </ul>
        </div>
      </div>

      {/* Elements Sidebar */}
      <ElementsSidebar
        showElementsList={showElementsList}
        setShowElementsList={setShowElementsList}
        activeTemplate={activeTemplate}
        extractedElements={extractedElements}
      />
    </div>
  );
}