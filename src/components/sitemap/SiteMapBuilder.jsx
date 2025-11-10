'use client';
import React, { useState } from 'react';
import axios from 'axios';
import FlowDiagram from '../FlowDiagram';


const SiteMapBuilder = ({prompt}) => {

  const [response, setResponse] = useState(null);

  const [loading, setLoading] = useState(false);

  const sendData = async () => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:4000/api/generate-structure', {
        prompt: prompt,
      });
      console.log('response', res.data);
      setResponse(res.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
     {response && (
        <div className="-mt-32">
              <FlowDiagram data={response} />

        </div>
      )}
    </div>
  );
};

export default SiteMapBuilder;
