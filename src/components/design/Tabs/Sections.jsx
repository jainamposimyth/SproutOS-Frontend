'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useContent } from '@/context/CreateContext'
import { useSelectedElement } from '@/context/SelectedElement'
import { useState, useEffect } from 'react'
import { useElements } from '@/context/ElementsContext'

const Sections = () => {
  const {
    activeTemplate,
    extractedElements,
    updateElementAndDOM 
  } = useElements();

  const currentElements = activeTemplate ? extractedElements[activeTemplate]?.elements || [] : [];

  useEffect(() => {
    console.log('Current Elements:', currentElements);
    console.log('Active Template:', activeTemplate);
    console.log('Extracted Elements:', extractedElements);
  }, [currentElements, activeTemplate, extractedElements]);

  const sectionElements = currentElements.filter(element => {
    if (!element) return false;
    
    const text = element.text?.toLowerCase() || '';
    const tagName = element.tagName?.toLowerCase() || '';
    const className = element.attributes?.class?.toLowerCase() || '';
    const id = element.attributes?.id?.toLowerCase() || '';
    
    return (
      tagName === 'h1' || 
      tagName === 'h2' || 
      tagName === 'h3' ||
      tagName === 'p' ||
      tagName === 'span' ||
      tagName === 'button' ||
      tagName === 'a' ||
      tagName === 'img' ||
      className.includes('hero') ||
      className.includes('title') ||
      className.includes('heading') ||
      className.includes('description') ||
      className.includes('subtitle') ||
      className.includes('text') ||
      className.includes('content') ||
      className.includes('caption') ||
      id.includes('hero') ||
      id.includes('title') ||
      id.includes('heading') ||
      id.includes('description') ||
      text.includes('hero') ||
      text.includes('title') ||
      text.includes('heading') ||
      text.includes('description') ||
      text.includes('subtitle') ||
      text.includes('welcome') ||
      text.includes('about') ||
      text.includes('intro')
    );
  });

  const titleElements = sectionElements.filter(el => {
    const tagName = el.tagName?.toLowerCase() || '';
    const text = el.text?.toLowerCase() || '';
    const className = el.attributes?.class?.toLowerCase() || '';
    
    const isButtonLike = text.includes('get started') || 
                        text.includes('book demo') || 
                        text.includes('click') || 
                        text.includes('button') ||
                        className.includes('btn') ||
                        className.includes('button');
    
   
    const isDescriptionTag = tagName === 'p' || (tagName === 'span' && text.length > 40);
    
    return (
      (tagName === 'h1' || tagName === 'h2' || tagName === 'h3') &&
      !isButtonLike &&
      !isDescriptionTag && 
      (text.length > 5 && text.length < 100) &&
      !text.includes('get started') &&
      !text.includes('book demo')
    );
  });


  const descriptionElements = sectionElements.filter(el => {
    const tagName = el.tagName?.toLowerCase() || '';
    const text = el.text?.toLowerCase() || '';
    const className = el.attributes?.class?.toLowerCase() || '';
    
  
    const isTitleTag = tagName === 'h1' || tagName === 'h2' || tagName === 'h3';
    
    return (
      !isTitleTag && 
      (tagName === 'p' || (tagName === 'span' && text.length > 40)) &&
      text.length > 20 &&
      !text.includes('get started') &&
      !text.includes('book demo') &&
      !className.includes('btn') &&
      !className.includes('button')
    );
  });

  const verifyElementType = (element, expectedType) => {
    const text = element.text?.toLowerCase() || '';
    const tagName = element.tagName?.toLowerCase() || '';
    
    switch (expectedType) {
      case 'title':
        return (tagName === 'h1' || tagName === 'h2' || tagName === 'h3') && 
               !text.includes('get started') && 
               !text.includes('book demo');
      case 'button':
        return (tagName === 'button' || tagName === 'a') || 
               text.includes('get started') || 
               text.includes('book demo');
      case 'description':
        return (tagName === 'p' || tagName === 'span') && 
               text.length > 20 &&
               !text.includes('get started') && 
               !text.includes('book demo') &&
               tagName !== 'h1' && tagName !== 'h2' && tagName !== 'h3'; 
      default:
        return true;
    }
  };

  const fallbackTitle = "Hero Section Title";
  const fallbackDescription = "A compelling hero section with a catchy tagline, a brief description, and a call-to-action button.";


  const getElementIndex = (element) => {
    if (!element || element.id === 'fallback-title' || element.id === 'fallback-description') {
      return -1;
    }
    
    return currentElements.findIndex(el => 
      el.id === element.id &&
      el.tagName === element.tagName &&
      el.text === element.text
    );
  };

  return (
    <main className="bg-[#FFFDFA] text-black flex-1 overflow-x-auto  rounded-t-xl">
      <div className='min-h-screen w-80 border p-6 '>
        <div className='text-xl font-[500] text-sprout-color-text-default'>
          Section 
        </div>

        <div className="flex rounded-md p-1 mt-5 border bg-sprout-color-secondary-lightest border-sprout-color-secondary">
          <svg className="ml-6 mt-1.5" width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.33906 2.05071C7.51432 1.87566 7.75188 1.77734 7.99957 1.77734C8.24726 1.77734 8.48482 1.87566 8.66007 2.05071L10.4235 3.81296C10.5103 3.89977 10.5792 4.00284 10.6262 4.11628C10.6733 4.22972 10.6975 4.35132 10.6975 4.47412C10.6975 4.59692 10.6733 4.71851 10.6262 4.83196C10.5792 4.9454 10.5103 5.04847 10.4235 5.13528L8.66007 6.89753C8.48482 7.07258 8.24726 7.17089 7.99957 7.17089C7.75188 7.17089 7.51432 7.07258 7.33906 6.89753L5.57565 5.13528C5.48879 5.04847 5.41989 4.9454 5.37289 4.83196C5.32588 4.71851 5.30168 4.59692 5.30168 4.47412C5.30168 4.35132 5.32588 4.22972 5.37289 4.11628C5.41989 4.00284 5.48879 3.89977 5.57565 3.81296L7.33906 2.05071ZM10.8634 5.57584C10.9502 5.48898 11.0533 5.42008 11.1667 5.37306C11.2801 5.32605 11.4017 5.30186 11.5245 5.30186C11.6473 5.30186 11.7689 5.32605 11.8823 5.37306C11.9958 5.42008 12.0989 5.48898 12.1857 5.57584L13.9478 7.3381C14.0347 7.4249 14.1036 7.52797 14.1506 7.64142C14.1976 7.75486 14.2218 7.87646 14.2218 7.99925C14.2218 8.12205 14.1976 8.24365 14.1506 8.35709C14.1036 8.47054 14.0347 8.57361 13.9478 8.66041L12.1857 10.4227C12.0989 10.5095 11.9958 10.5784 11.8823 10.6254C11.7689 10.6725 11.6473 10.6967 11.5245 10.6967C11.4017 10.6967 11.2801 10.6725 11.1667 10.6254C11.0533 10.5784 10.9502 10.5095 10.8634 10.4227L9.10123 8.66041C9.01438 8.57361 8.94548 8.47054 8.89847 8.35709C8.85146 8.24365 8.82726 8.12205 8.82726 7.99925C8.82726 7.87646 8.85146 7.75486 8.89847 7.64142C8.94548 7.52797 9.01438 7.4249 9.10123 7.3381L10.8634 5.57584ZM3.81348 5.57584C3.90028 5.48898 4.00335 5.42008 4.11679 5.37306C4.23022 5.32605 4.35181 5.30186 4.47461 5.30186C4.5974 5.30186 4.71899 5.32605 4.83243 5.37306C4.94587 5.42008 5.04893 5.48898 5.13573 5.57584L6.8979 7.3381C6.98476 7.4249 7.05366 7.52797 7.10067 7.64142C7.14768 7.75486 7.17187 7.87646 7.17187 7.99925C7.17187 8.12205 7.14768 8.24365 7.10067 8.35709C7.05366 8.47054 6.98476 8.57361 6.8979 8.66041L5.13573 10.4227C5.04893 10.5095 4.94587 10.5784 4.83243 10.6254C4.71899 10.6725 4.5974 10.6967 4.47461 10.6967C4.35181 10.6967 4.23022 10.6725 4.11679 10.6254C4.00335 10.5784 3.90028 10.5095 3.81348 10.4227L2.05131 8.66041C1.96446 8.57361 1.89556 8.47054 1.84855 8.35709C1.80154 8.24365 1.77734 8.12205 1.77734 7.99925C1.77734 7.87646 1.80154 7.75486 1.84855 7.64142C1.89556 7.52797 1.96446 7.4249 2.05131 7.3381L3.81348 5.57584ZM7.33844 9.10098C7.42524 9.01412 7.52831 8.94521 7.64174 8.8982C7.75518 8.85119 7.87677 8.82699 7.99957 8.82699C8.12236 8.82699 8.24395 8.85119 8.35739 8.8982C8.47083 8.94521 8.57389 9.01412 8.66069 9.10098L10.4229 10.8632C10.5981 11.0385 10.6965 11.2762 10.6965 11.5241C10.6965 11.7719 10.5981 12.0096 10.4229 12.1849L8.66069 13.9478C8.57389 14.0347 8.47083 14.1036 8.35739 14.1506C8.24395 14.1976 8.12236 14.2218 7.99957 14.2218C7.87677 14.2218 7.75518 14.1976 7.64174 14.1506C7.52831 14.1036 7.42524 14.0347 7.33844 13.9478L5.57627 12.1849C5.40124 12.0097 5.30293 11.7721 5.30293 11.5244C5.30293 11.2767 5.40124 11.0391 5.57627 10.8639L7.33844 9.10098Z" fill="#2EA343"/>
          </svg> 
          <Button className="bg-transparent hover:bg-transparent cursor-pointer text-sprout-color-secondary">Make a Global Section</Button>
        </div>

        <div className='pt-5 gap-8'>

          {(titleElements.length > 0 ? titleElements : [{ text: fallbackTitle, id: 'fallback-title' }]).map((element, index) => (
            <div key={`title-${element.id || index}`} className="mb-4">
              <div className='text-sprout-color-text-weaker text-lg font-[500]'>
                Title {index > 0 ? `${index + 1}` : ''} <span className='text-red-600'>*</span>
              </div>
              <div className="relative mt-2 rounded-md border border-sprout-color-border-weak">
                <Input
                  value={element.text || ''}
                  onChange={(e) => {
                    if (element.id !== 'fallback-title') {
                      const elementIndex = getElementIndex(element);
                      
                      if (elementIndex !== -1 && verifyElementType(element, 'title')) {
                        console.log('Updating title at index:', elementIndex, 'New value:', e.target.value);
                        updateElementAndDOM(activeTemplate, elementIndex, { text: e.target.value });
                      } else {
                        console.warn('Title element not found or type mismatch:', { element, elementIndex });
                      }
                    }
                  }}
                  placeholder="Enter title"
                  className="w-full border-none text-black px-3 md:px-4 py-3 text-sm md:text-base focus-visible:ring-0 focus:ring-0 focus:outline-none bg-transparent"
                />
              </div>
            </div>
          ))}


          {(descriptionElements.length > 0 ? descriptionElements : [{ text: fallbackDescription, id: 'fallback-description' }]).map((element, index) => (
            <div key={`description-${element.id || index}`} className="mb-4">
              <div className='text-sprout-color-text-weaker text-lg font-[500]'>
                Description {index > 0 ? `${index + 1}` : ''} <span className='text-red-600'>*</span>
              </div>
              <div className="relative mt-2 rounded-md border border-sprout-color-border-weak">
                <textarea
                  value={element.text || ''}
                  onChange={(e) => {
                    if (element.id !== 'fallback-description') {
                      const elementIndex = getElementIndex(element);
                      
                      if (elementIndex !== -1 && verifyElementType(element, 'description')) {
                        console.log('Updating description at index:', elementIndex, 'New value:', e.target.value);
                        updateElementAndDOM(activeTemplate, elementIndex, { text: e.target.value });
                      } else {
                        console.warn('Description element not found or type mismatch:', { element, elementIndex });
                      }
                    }
                  }}
                  placeholder="Enter description"
                  className="w-full min-h-[100px] border-none text-black px-3 md:px-4 py-3 text-sm md:text-base focus-visible:ring-0 focus:ring-0 focus:outline-none bg-transparent resize-vertical"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-5 gap-8">
          <div>
   <div className='text-xl font-[500] text-sprout-color-text-default'>
          Layout 
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex justify-between p-2">
            <div className="text-sprout-color-text-weakest mt-2 font-[500]">
              Theme
            </div>
            <div className='border flex gap-2 border-sprout-color-border-weak rounded-md p-1'>
          <Button className="border border-sprout-color-secondary bg-sprout-color-secondary-lightest hover:bg-sprout-color-secondary-lightest text-sprout-color-secondary" >
            Light
          </Button>
          <Button className="text-sprout-color-text-disabled bg-white hover:bg-white">
            Dark
          </Button>
            </div>
          </div>
        </div>
               <div className="flex flex-col gap-4 mt-4">
          <div className="flex justify-between p-2">
            <div className="text-sprout-color-text-weakest mt-2 font-[500]">
              Alignment
            </div>
            <div className='border flex  border-sprout-color-border-weak rounded-md p-1'>
          <Button className="border border-sprout-color-secondary bg-sprout-color-secondary-lightest hover:bg-sprout-color-secondary-lightest text-sprout-color-secondary" >
            
        <svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.5 1.03906C2.66576 1.03906 2.82473 1.10491 2.94194 1.22212C3.05915 1.33933 3.125 1.4983 3.125 1.66406V18.3307C3.125 18.4965 3.05915 18.6555 2.94194 18.7727C2.82473 18.8899 2.66576 18.9557 2.5 18.9557C2.33424 18.9557 2.17527 18.8899 2.05806 18.7727C1.94085 18.6555 1.875 18.4965 1.875 18.3307V1.66406C1.875 1.4983 1.94085 1.33933 2.05806 1.22212C2.17527 1.10491 2.33424 1.03906 2.5 1.03906ZM7.89 3.53906H15.4433C15.81 3.53906 16.1267 3.53906 16.385 3.5624C16.66 3.5874 16.9317 3.6424 17.1875 3.7899C17.4725 3.9549 17.7092 4.19156 17.8742 4.47656C18.0217 4.7324 18.0767 5.00406 18.1017 5.27823C18.125 5.53823 18.125 5.85406 18.125 6.21989V6.27406C18.125 6.64073 18.125 6.95739 18.1017 7.21573C18.0767 7.49073 18.0217 7.76239 17.8742 8.01823C17.7095 8.30345 17.4727 8.54028 17.1875 8.7049C16.9317 8.8524 16.66 8.90739 16.3858 8.93239C16.1258 8.95573 15.81 8.95573 15.4442 8.95573H7.88917C7.5225 8.95573 7.20583 8.95573 6.9475 8.93239C6.6725 8.90739 6.40083 8.8524 6.145 8.7049C5.85978 8.54028 5.62295 8.30345 5.45833 8.01823C5.31083 7.76239 5.25583 7.49073 5.23083 7.21656C5.2075 6.95656 5.2075 6.64073 5.2075 6.2749V6.22073C5.2075 5.85406 5.2075 5.5374 5.23083 5.27906C5.25583 5.00406 5.31083 4.7324 5.45833 4.47656C5.62295 4.19134 5.85978 3.95451 6.145 3.7899C6.40083 3.6424 6.6725 3.5874 6.94667 3.5624C7.20667 3.53906 7.5225 3.53906 7.88833 3.53906H7.89ZM7.06083 4.80739C6.87333 4.82406 6.805 4.85323 6.77083 4.8724C6.67562 4.9273 6.59658 5.00635 6.54167 5.10156C6.5225 5.1349 6.49333 5.20406 6.47667 5.39156C6.45917 5.5874 6.45833 5.84656 6.45833 6.2474C6.45833 6.64823 6.45833 6.9074 6.47667 7.10323C6.49333 7.29073 6.5225 7.35906 6.54167 7.39323C6.59658 7.48844 6.67562 7.56748 6.77083 7.62239C6.80417 7.64156 6.87333 7.67073 7.06083 7.68739C7.25667 7.70489 7.51583 7.70573 7.91667 7.70573H15.4167C15.8175 7.70573 16.0767 7.70573 16.2725 7.68739C16.46 7.67073 16.5283 7.64156 16.5625 7.62239C16.6574 7.56737 16.7362 7.48833 16.7908 7.39323C16.8108 7.35989 16.8392 7.29073 16.8567 7.10323C16.8742 6.9074 16.875 6.64823 16.875 6.2474C16.875 5.84656 16.875 5.5874 16.8567 5.39156C16.84 5.20406 16.8108 5.13573 16.7908 5.10156C16.7362 5.00646 16.6574 4.92742 16.5625 4.8724C16.5292 4.85323 16.46 4.82406 16.2725 4.80739C15.9876 4.78984 15.7021 4.78373 15.4167 4.78906H7.91667C7.51583 4.78906 7.25667 4.78906 7.06083 4.80739ZM7.89 11.0391H12.9433C13.31 11.0391 13.6267 11.0391 13.885 11.0624C14.16 11.0874 14.4317 11.1424 14.6875 11.2899C14.9725 11.4549 15.2092 11.6916 15.3742 11.9766C15.5217 12.2324 15.5767 12.5041 15.6017 12.7782C15.625 13.0382 15.625 13.3541 15.625 13.7199V13.7741C15.625 14.1407 15.625 14.4574 15.6017 14.7157C15.5767 14.9907 15.5217 15.2624 15.3742 15.5182C15.2095 15.8034 14.9727 16.0402 14.6875 16.2049C14.4317 16.3524 14.16 16.4074 13.8858 16.4324C13.6258 16.4557 13.31 16.4557 12.9442 16.4557H7.88917C7.5225 16.4557 7.20583 16.4557 6.9475 16.4324C6.6725 16.4074 6.40083 16.3524 6.145 16.2049C5.85978 16.0403 5.62295 15.8034 5.45833 15.5182C5.31083 15.2624 5.25583 14.9907 5.23083 14.7166C5.2075 14.4566 5.2075 14.1407 5.2075 13.7749V13.7207C5.2075 13.3541 5.2075 13.0374 5.23083 12.7791C5.25583 12.5041 5.31083 12.2324 5.45833 11.9766C5.62295 11.6913 5.85978 11.4545 6.145 11.2899C6.40083 11.1424 6.6725 11.0874 6.94667 11.0624C7.20667 11.0391 7.5225 11.0391 7.88833 11.0391H7.89ZM7.06083 12.3074C6.87333 12.3241 6.805 12.3532 6.77083 12.3732C6.67573 12.4279 6.59669 12.5067 6.54167 12.6016C6.5225 12.6349 6.49333 12.7041 6.47667 12.8916C6.45912 13.1765 6.453 13.462 6.45833 13.7474C6.45833 14.1482 6.45833 14.4074 6.47667 14.6032C6.49333 14.7907 6.5225 14.8591 6.54167 14.8932C6.59669 14.9881 6.67573 15.0669 6.77083 15.1216C6.80417 15.1416 6.87333 15.1699 7.06083 15.1874C7.25667 15.2049 7.51583 15.2057 7.91667 15.2057H12.9167C13.3175 15.2057 13.5767 15.2057 13.7725 15.1874C13.96 15.1707 14.0283 15.1416 14.0625 15.1216C14.1573 15.0668 14.236 14.988 14.2908 14.8932C14.3108 14.8599 14.3392 14.7907 14.3567 14.6032C14.3742 14.4074 14.375 14.1482 14.375 13.7474C14.375 13.3466 14.375 13.0874 14.3567 12.8916C14.34 12.7041 14.3108 12.6357 14.2908 12.6016C14.236 12.5068 14.1573 12.428 14.0625 12.3732C14.0292 12.3532 13.96 12.3241 13.7725 12.3074C13.4876 12.2898 13.2021 12.2837 12.9167 12.2891H7.91667C7.51583 12.2891 7.25667 12.2891 7.06083 12.3074Z" fill="#88827E"/>
        </svg>

          </Button>
          <Button className="text-sprout-color-text-disabled bg-white hover:bg-white ">
          
<svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 1.66406V4.16406M10 18.3307V15.8307M10 11.6641V8.33073" stroke="#695BE8" strokeWidth="1.2" strokeLinecap="round"/>
<path d="M4.16406 6.2474C4.16406 5.46823 4.16406 5.07906 4.33156 4.78906C4.44127 4.59905 4.59905 4.44127 4.78906 4.33156C5.07906 4.16406 5.46823 4.16406 6.2474 4.16406H13.7474C14.5266 4.16406 14.9157 4.16406 15.2057 4.33156C15.3957 4.44127 15.5535 4.59905 15.6632 4.78906C15.8307 5.07906 15.8307 5.46823 15.8307 6.2474C15.8307 7.02656 15.8307 7.41573 15.6632 7.70573C15.5535 7.89574 15.3957 8.05352 15.2057 8.16323C14.9157 8.33073 14.5266 8.33073 13.7474 8.33073H6.2474C5.46823 8.33073 5.07906 8.33073 4.78906 8.16323C4.59905 8.05352 4.44127 7.89574 4.33156 7.70573C4.16406 7.41573 4.16406 7.02656 4.16406 6.2474ZM5.83073 13.7474C5.83073 12.9682 5.83073 12.5791 5.99823 12.2891C6.10794 12.0991 6.26572 11.9413 6.45573 11.8316C6.74573 11.6641 7.1349 11.6641 7.91406 11.6641H12.0807C12.8599 11.6641 13.2491 11.6641 13.5391 11.8316C13.7291 11.9413 13.8869 12.0991 13.9966 12.2891C14.1641 12.5791 14.1641 12.9682 14.1641 13.7474C14.1641 14.5266 14.1641 14.9157 13.9966 15.2057C13.8869 15.3957 13.7291 15.5535 13.5391 15.6632C13.2491 15.8307 12.8599 15.8307 12.0807 15.8307H7.91406C7.1349 15.8307 6.74573 15.8307 6.45573 15.6632C6.26572 15.5535 6.10794 15.3957 5.99823 15.2057C5.83073 14.9157 5.83073 14.5266 5.83073 13.7474Z" stroke="#695BE8" strokeWidth="1.2"/>
</svg>

          </Button>
          <Button className="text-sprout-color-text-disabled bg-white hover:bg-white ">
          

<svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M17.5 1.03906C17.3342 1.03906 17.1753 1.10491 17.0581 1.22212C16.9408 1.33933 16.875 1.4983 16.875 1.66406V18.3307C16.875 18.4965 16.9408 18.6555 17.0581 18.7727C17.1753 18.8899 17.3342 18.9557 17.5 18.9557C17.6658 18.9557 17.8247 18.8899 17.9419 18.7727C18.0592 18.6555 18.125 18.4965 18.125 18.3307V1.66406C18.125 1.4983 18.0592 1.33933 17.9419 1.22212C17.8247 1.10491 17.6658 1.03906 17.5 1.03906ZM12.11 3.53906H4.55667C4.19 3.53906 3.87333 3.53906 3.615 3.5624C3.34 3.5874 3.06833 3.6424 2.8125 3.7899C2.5275 3.9549 2.29083 4.19156 2.12583 4.47656C1.97833 4.7324 1.92333 5.00406 1.89833 5.27823C1.875 5.53823 1.875 5.85406 1.875 6.21989V6.27406C1.875 6.64073 1.875 6.95739 1.89833 7.21573C1.92333 7.49073 1.97833 7.76239 2.12583 8.01823C2.29045 8.30345 2.52728 8.54028 2.8125 8.7049C3.06833 8.8524 3.34 8.90739 3.61417 8.93239C3.87417 8.95573 4.19 8.95573 4.55583 8.95573H12.1108C12.4775 8.95573 12.7942 8.95573 13.0525 8.93239C13.3275 8.90739 13.5992 8.8524 13.855 8.7049C14.1402 8.54028 14.3771 8.30345 14.5417 8.01823C14.6892 7.76239 14.7442 7.49073 14.7692 7.21656C14.7925 6.95656 14.7925 6.64073 14.7925 6.2749V6.22073C14.7925 5.85406 14.7925 5.5374 14.7692 5.27906C14.7442 5.00406 14.6892 4.7324 14.5417 4.47656C14.3771 4.19134 14.1402 3.95451 13.855 3.7899C13.5992 3.6424 13.3275 3.5874 13.0533 3.5624C12.7933 3.53906 12.4775 3.53906 12.1117 3.53906H12.11ZM12.9392 4.80739C13.1267 4.82406 13.195 4.85323 13.2292 4.8724C13.3244 4.9273 13.4034 5.00635 13.4583 5.10156C13.4775 5.1349 13.5067 5.20406 13.5233 5.39156C13.5408 5.5874 13.5417 5.84656 13.5417 6.2474C13.5417 6.64823 13.5417 6.9074 13.5233 7.10323C13.5067 7.29073 13.4775 7.35906 13.4583 7.39323C13.4034 7.48844 13.3244 7.56748 13.2292 7.62239C13.1958 7.64156 13.1267 7.67073 12.9392 7.68739C12.7433 7.70489 12.4842 7.70573 12.0833 7.70573H4.58333C4.1825 7.70573 3.92333 7.70573 3.7275 7.68739C3.54 7.67073 3.47167 7.64156 3.4375 7.62239C3.3426 7.56737 3.26385 7.48833 3.20917 7.39323C3.18917 7.35989 3.16083 7.29073 3.14333 7.10323C3.12583 6.9074 3.125 6.64823 3.125 6.2474C3.125 5.84656 3.125 5.5874 3.14333 5.39156C3.16 5.20406 3.18917 5.13573 3.20917 5.10156C3.26385 5.00646 3.3426 4.92742 3.4375 4.8724C3.47083 4.85323 3.54 4.82406 3.7275 4.80739C4.01242 4.78984 4.29793 4.78373 4.58333 4.78906H12.0833C12.4842 4.78906 12.7433 4.78906 12.9392 4.80739ZM12.11 11.0391H7.05667C6.69 11.0391 6.37333 11.0391 6.115 11.0624C5.84 11.0874 5.56833 11.1424 5.3125 11.2899C5.0275 11.4549 4.79083 11.6916 4.62583 11.9766C4.47833 12.2324 4.42333 12.5041 4.39833 12.7782C4.375 13.0382 4.375 13.3541 4.375 13.7199V13.7741C4.375 14.1407 4.375 14.4574 4.39833 14.7157C4.42333 14.9907 4.47833 15.2624 4.62583 15.5182C4.79048 15.8034 5.02731 16.0402 5.3125 16.2049C5.56833 16.3524 5.84 16.4074 6.11417 16.4324C6.37417 16.4557 6.69 16.4557 7.05583 16.4557H12.1108C12.4775 16.4557 12.7942 16.4557 13.0525 16.4324C13.3275 16.4074 13.5992 16.3524 13.855 16.2049C14.1402 16.0403 14.3771 15.8034 14.5417 15.5182C14.6892 15.2624 14.7442 14.9907 14.7692 14.7166C14.7925 14.4566 14.7925 14.1407 14.7925 13.7749V13.7207C14.7925 13.3541 14.7925 13.0374 14.7692 12.7791C14.7442 12.5041 14.6892 12.2324 14.5417 11.9766C14.3771 11.6913 14.1402 11.4545 13.855 11.2899C13.5992 11.1424 13.3275 11.0874 13.0533 11.0624C12.7933 11.0391 12.4775 11.0391 12.1117 11.0391H12.11ZM12.9392 12.3074C13.1267 12.3241 13.195 12.3532 13.2292 12.3732C13.3243 12.4279 13.4033 12.5067 13.4583 12.6016C13.4775 12.6349 13.5067 12.7041 13.5233 12.8916C13.5409 13.1765 13.547 13.462 13.5417 13.7474C13.5417 14.1482 13.5417 14.4074 13.5233 14.6032C13.5067 14.7907 13.4775 14.8591 13.4583 14.8932C13.4033 14.9881 13.3243 15.0669 13.2292 15.1216C13.1958 15.1416 13.1267 15.1699 12.9392 15.1874C12.7433 15.2049 12.4842 15.2057 12.0833 15.2057H7.08333C6.6825 15.2057 6.42333 15.2057 6.2275 15.1874C6.04 15.1707 5.97167 15.1416 5.9375 15.1216C5.8427 15.0668 5.76396 14.988 5.70917 14.8932C5.68917 14.8599 5.66083 14.7907 5.64333 14.6032C5.62583 14.4074 5.625 14.1482 5.625 13.7474C5.625 13.3466 5.625 13.0874 5.64333 12.8916C5.66 12.7041 5.68917 12.6357 5.70917 12.6016C5.76396 12.5068 5.8427 12.428 5.9375 12.3732C5.97083 12.3532 6.04 12.3241 6.2275 12.3074C6.51242 12.2898 6.79793 12.2837 7.08333 12.2891H12.0833C12.4842 12.2891 12.7433 12.2891 12.9392 12.3074Z" fill="#88827E"/>
</svg>


          </Button>
            </div>
          </div>
        </div>
<div className="flex flex-col gap-4 mt-4">
  <div className="flex justify-between p-2">
    <div className="text-sprout-color-text-weakest mt-2 font-[500]">
      Assets
    </div>

    <div className="border flex gap-2 border-sprout-color-border-weak rounded-md p-1">

      {/* Selected Button */}
      <Button
        className="h-8 w-8 p-0 flex items-center justify-center 
                   rounded-md border border-sprout-color-secondary 
                   bg-sprout-color-secondary-lightest text-sprout-color-secondary
                   hover:bg-sprout-color-secondary-lightest
                   "
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
   <path d="M2 5.19987C2 4.35121 2.33713 3.53731 2.93722 2.93722C3.53731 2.33713 4.35121 2 5.19987 2H14.7995C15.6481 2 16.462 2.33713 17.0621 2.93722C17.6622 3.53731 17.9993 4.35121 17.9993 5.19987V14.7995C17.9993 15.6481 17.6622 16.462 17.0621 17.0621C16.462 17.6622 15.6481 17.9993 14.7995 17.9993H5.19987C4.35121 17.9993 3.53731 17.6622 2.93722 17.0621C2.33713 16.462 2 15.6481 2 14.7995V5.19987Z" stroke="#695BE8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.19914 9.19906C8.30366 9.19906 9.19906 8.30366 9.19906 7.19914C9.19906 6.09461 8.30366 5.19922 7.19914 5.19922C6.09461 5.19922 5.19922 6.09461 5.19922 7.19914C5.19922 8.30366 6.09461 9.19906 7.19914 9.19906Z" stroke="#695BE8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.0197 10.4962L5.19922 17.9991H14.9052C15.7257 17.9991 16.5125 17.6732 17.0926 17.0931C17.6728 16.5129 17.9987 15.7261 17.9987 14.9057V14.7993C17.9987 14.4265 17.8587 14.2833 17.6067 14.0073L14.3828 10.4914C14.2326 10.3275 14.0498 10.1968 13.8462 10.1074C13.6426 10.0181 13.4226 9.97221 13.2002 9.97266C12.9779 9.97311 12.7581 10.0199 12.5548 10.1101C12.3516 10.2002 12.1693 10.3317 12.0197 10.4962Z" stroke="#695BE8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>

        </svg>
      </Button>

     
      <Button
        className="h-8 w-8 p-0 flex items-center justify-center 
                   rounded-md border border-transparent hover:bg-white
                   text-sprout-color-text-disabled bg-white"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
    <path d="M12.292 9.30742L9.62787 7.53075C9.50225 7.44694 9.35622 7.39884 9.20538 7.39159C9.05454 7.38434 8.90457 7.41821 8.77149 7.48958C8.63841 7.56096 8.52723 7.66715 8.44983 7.79682C8.37242 7.92648 8.33171 8.07474 8.33203 8.22575V11.7783C8.33201 11.9291 8.37295 12.0772 8.45047 12.2066C8.528 12.336 8.6392 12.442 8.77223 12.5131C8.90525 12.5843 9.05511 12.618 9.2058 12.6107C9.35649 12.6034 9.50237 12.5553 9.62787 12.4716L12.292 10.6949C12.4062 10.6188 12.4997 10.5157 12.5645 10.3948C12.6292 10.2738 12.6631 10.1388 12.6631 10.0016C12.6631 9.86441 12.6292 9.72935 12.5645 9.6084C12.4997 9.48745 12.4062 9.38352 12.292 9.30742Z" stroke="#88827E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 10C17.5 10.9849 17.306 11.9602 16.9291 12.8701C16.5522 13.7801 15.9997 14.6069 15.3033 15.3033C14.6069 15.9997 13.7801 16.5522 12.8701 16.9291C11.9602 17.306 10.9849 17.5 10 17.5C9.01509 17.5 8.03982 17.306 7.12987 16.9291C6.21993 16.5522 5.39314 15.9997 4.6967 15.3033C4.00026 14.6069 3.44781 13.7801 3.0709 12.8701C2.69399 11.9602 2.5 10.9849 2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C11.9891 2.5 13.8968 3.29018 15.3033 4.6967C16.7098 6.10322 17.5 8.01088 17.5 10Z" stroke="#88827E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>

        </svg>
      </Button>

    </div>
  </div>
</div>
  <div className="flex justify-between p-2">
            <div className="text-sprout-color-text-weakest mt-2 font-[500]">
              Element
            </div>
            <div className='border flex  border-sprout-color-border-weak rounded-md p-1'>
          <Button className="border border-sprout-color-secondary bg-sprout-color-secondary-lightest hover:bg-sprout-color-secondary-lightest text-sprout-color-secondary" >
            
  Button

          </Button>
          <Button className="text-sprout-color-text-disabled bg-white hover:bg-white ">
          Form


          </Button>
        
            </div>
          </div>

          </div>


        </div>

        <div className="pt-5 gap-8">
          <div>
             <div className='text-xl font-[500] text-sprout-color-text-default'>
          Colors 
        </div>
        <div>
          <div className="flex justify-between p-2 border border-sprout-color-border-weak rounded-md  mt-4">
            <div className="flex justify-between gap-4 p-1 pl-3" >
              <img src="./frame.png" alt="" srcSet="" />
            <h1 className="text-sprout-color-text-default mt-0.5 font-[400]">Scheme_1</h1>
            </div>
            <div className="mt-2">

<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 12L10 8L6 4" stroke="#413735" strokeWidth="1.66667" strokeLinecap="square" strokeLinejoin="round"/>
</svg>

            </div>
          </div>
        </div>
          </div>

        </div>
 <div className="pt-5 gap-8">
          <div>
             <div className='text-xl font-[500] text-sprout-color-text-default'>
          Image 
        </div>
        <div>
          <div className="flex justify-between p-2 border border-sprout-color-border-weak rounded-md  mt-4">
            <div className="flex justify-between gap-4 p-1 pl-3" >
              <img src="./frame2.png" alt="" srcSet="" />
            <h1 className="text-sprout-color-text-default mt-0.5 font-[400]">Image</h1>
            </div>
            <div className="mt-2">

<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 12L10 8L6 4" stroke="#413735" strokeWidth="1.66667" strokeLinecap="square" strokeLinejoin="round"/>
</svg>

            </div>
          </div>
        </div>
          </div>

        </div>


 <div className="pt-5 gap-8">
          <div>
             <div className='text-xl font-[500] text-sprout-color-text-default'>
          Icon 
        </div>
        <div>
          <div className="flex justify-between p-2 border border-sprout-color-border-weak rounded-md  mt-4">
            <div className="flex justify-between gap-4 p-1 pl-2" >
              
<div className="rounded-md border border-sprout-color-border-weak"><svg  width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" rx="4.66667" fill="#FFFDF9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M16.2126 6.0392L16.3826 6.06053C16.8319 6.12253 17.4266 6.20586 17.7632 6.5432C18.0392 6.81853 18.1452 7.26653 18.2086 7.66653L18.2459 7.92386C18.3299 8.53053 18.3519 9.3252 18.2086 10.2079C17.9259 11.9499 16.9986 14.0285 14.6699 15.6379C14.6572 15.7632 14.6566 15.8899 14.6592 16.0165L14.6659 16.2059C14.6766 16.4972 14.6872 16.7885 14.6059 17.0712C14.4792 17.5112 14.0279 17.8012 13.6059 18.0092L13.3992 18.1072L13.1326 18.2245C12.6339 18.4365 11.9606 18.6539 11.5386 18.2312C11.2852 17.9785 11.1812 17.6079 11.0966 17.2392L11.0652 17.1012C11.0294 16.9271 10.9849 16.7549 10.9319 16.5852C10.8986 16.4874 10.8626 16.3885 10.8239 16.2885C10.7813 16.3408 10.7362 16.3908 10.6886 16.4385C10.4586 16.6685 10.1152 16.8292 9.83257 16.9419C9.52391 17.0639 9.17457 17.1705 8.85124 17.2585L8.68524 17.3025L8.36724 17.3819L8.07924 17.4485L7.73457 17.5219L7.51924 17.5639C7.41184 17.5837 7.30123 17.5772 7.19692 17.5448C7.09262 17.5124 6.99776 17.4551 6.92053 17.3779C6.8433 17.3007 6.78602 17.2058 6.75362 17.1015C6.72123 16.9972 6.71469 16.8866 6.73457 16.7792L6.7919 16.4919L6.89457 16.0265L6.97724 15.6865L7.0399 15.4465C7.1279 15.1239 7.23457 14.7745 7.35724 14.4665C7.46924 14.1832 7.6299 13.8399 7.8599 13.6099L7.91324 13.5585L7.87057 13.5412C7.75662 13.4979 7.64122 13.4586 7.52457 13.4232L7.3399 13.3665C6.87724 13.2265 6.38257 13.0759 6.07524 12.7679C5.7019 12.3952 5.8279 11.8279 6.0079 11.3559L6.08124 11.1732L6.19924 10.9065L6.29724 10.6999C6.50524 10.2785 6.79524 9.8272 7.23524 9.70053C7.46857 9.63386 7.71124 9.62986 7.95524 9.63653L8.1019 9.6412C8.29257 9.64786 8.48257 9.6552 8.66857 9.6372C10.2779 7.30786 12.3566 6.38053 14.0986 6.09786C14.7974 5.98325 15.5085 5.96351 16.2126 6.0392ZM9.67124 14.4892C9.56635 14.4115 9.44094 14.3662 9.31058 14.3591C9.18021 14.352 9.05063 14.3833 8.9379 14.4492L8.86457 14.4985L8.80257 14.5539L8.71924 14.6592C8.54591 14.9099 8.44724 15.2565 8.37057 15.5805L8.29857 15.8925L8.26457 16.0345L8.3919 16.0039L8.67057 15.9399C9.05591 15.8499 9.48324 15.7332 9.74591 15.4965C9.86011 15.3824 9.92901 15.2307 9.9398 15.0696C9.95059 14.9084 9.90254 14.7489 9.80457 14.6205L9.7499 14.5579L9.7339 14.5425L9.67124 14.4892ZM14.4599 9.83986C14.3361 9.71603 14.1891 9.61779 14.0274 9.55075C13.8656 9.48371 13.6922 9.44919 13.5171 9.44916C13.342 9.44913 13.1686 9.48359 13.0069 9.55057C12.8451 9.61755 12.6981 9.71574 12.5742 9.83953C12.4504 9.96332 12.3522 10.1103 12.2851 10.2721C12.2181 10.4338 12.1836 10.6072 12.1835 10.7823C12.1835 10.9574 12.218 11.1308 12.2849 11.2926C12.3519 11.4544 12.4501 11.6014 12.5739 11.7252C12.8239 11.9753 13.163 12.1158 13.5167 12.1159C13.8703 12.116 14.2095 11.9755 14.4596 11.7255C14.7097 11.4755 14.8502 11.1364 14.8503 10.7828C14.8503 10.4291 14.7099 10.09 14.4599 9.83986Z" fill="#413735"/>
</svg></div>

            <h1 className="text-sprout-color-text-default mt-1 font-[400]">Image</h1>
            </div>
            <div className="mt-3">

<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 12L10 8L6 4" stroke="#413735" strokeWidth="1.66667" strokeLinecap="square" strokeLinejoin="round"/>
</svg>

            </div>
          </div>
          
        </div>
            <div>
          <div className="flex justify-between p-2 border border-sprout-color-border-weak rounded-md  mt-4">
            <div className="flex justify-between gap-4 p-1 pl-2" >
              
<div className="rounded-md border border-sprout-color-border-weak p-1">

<svg  width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.1486 4.89946L3.51523 11.5328C3.39379 11.6585 3.32659 11.8269 3.32811 12.0017C3.32963 12.1765 3.39974 12.3437 3.52335 12.4673C3.64695 12.5909 3.81416 12.6611 3.98896 12.6626C4.16376 12.6641 4.33216 12.5969 4.45789 12.4755L11.0912 5.84212V9.56612C11.0912 9.74293 11.1615 9.9125 11.2865 10.0375C11.4115 10.1626 11.5811 10.2328 11.7579 10.2328C11.9347 10.2328 12.1043 10.1626 12.2293 10.0375C12.3543 9.9125 12.4246 9.74293 12.4246 9.56612V4.23279C12.4246 4.05598 12.3543 3.88641 12.2293 3.76138C12.1043 3.63636 11.9347 3.56612 11.7579 3.56612H6.42456C6.24775 3.56612 6.07818 3.63636 5.95316 3.76138C5.82813 3.88641 5.75789 4.05598 5.75789 4.23279C5.75789 4.4096 5.82813 4.57917 5.95316 4.7042C6.07818 4.82922 6.24775 4.89946 6.42456 4.89946H10.1486Z" fill="#413735"/>
</svg>

</div>

            <h1 className="text-sprout-color-text-default mt-1 font-[400]">Image</h1>
            </div>
            <div className="mt-3">

<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 12L10 8L6 4" stroke="#413735" strokeWidth="1.66667" strokeLinecap="square" strokeLinejoin="round"/>
</svg>

            </div>
          </div>
          
        </div>
            <div>
          <div className="flex justify-between p-2 border border-sprout-color-border-weak rounded-md  mt-4">
            <div className="flex justify-between gap-4 p-1 pl-2" >
              
<div className="rounded-md border border-sprout-color-border-weak p-1">


<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.99992 1.3335C4.31992 1.3335 1.33325 4.32016 1.33325 8.00016C1.33325 11.6802 4.31992 14.6668 7.99992 14.6668C11.6799 14.6668 14.6666 11.6802 14.6666 8.00016C14.6666 4.32016 11.6799 1.3335 7.99992 1.3335ZM6.33325 11.0002V5.00016L10.9999 8.00016L6.33325 11.0002Z" fill="#413735"/>
</svg>

</div>

            <h1 className="text-sprout-color-text-default mt-1 font-[400]">Image</h1>
            </div>
            <div className="mt-3">

<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 12L10 8L6 4" stroke="#413735" strokeWidth="1.66667" strokeLinecap="square" strokeLinejoin="round"/>
</svg>

            </div>
          </div>
          
        </div>
          </div>

        </div>

      </div>
    </main>
  )
}

export default Sections