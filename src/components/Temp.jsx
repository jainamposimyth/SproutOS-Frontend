'use client';

import React, { use } from 'react';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from './ui/input';
import { Button } from './ui/button';

export const sections = [
    "Navbar",
    "Header",
    "Mega Menu",
    "Mobile App Menu",
    "Hero",
    "About Us",
    "Why Choose Us",
    "Services",
    "Features",
    "Metrics",
    "Gallery",
    "Portfolio",
    "Blog",
    "Pricing Table",
    "Team",
    "Testimonial",
    "Company Logo",
    "Contact Form",
    "FAQ",
    "Location",
    "CTA",
    "Breadcrumbs",
    "Footer",
    "404",
    "Coming Soon",
    "Under Maintenance",
].map((name) => ({
    label: name,
    svg: (
      <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_786_16423)">
                        <path d="M2 5C2 2.79086 3.79086 1 6 1H51C53.2091 1 55 2.79086 55 5V48C55 50.2091 53.2091 52 51 52H6C3.79086 52 2 50.2091 2 48V5Z" fill="#FFFDF9" shapeRendering="crispEdges"/>
                        <path d="M51 0.5C53.4853 0.5 55.5 2.51472 55.5 5V48C55.5 50.4853 53.4853 52.5 51 52.5H6C3.51472 52.5 1.5 50.4853 1.5 48V5C1.5 2.51472 3.51472 0.5 6 0.5H51Z" stroke="#D7D3C9" shapeRendering="crispEdges"/>
                        <path d="M2 5C2 2.79086 3.79086 1 6 1H51C53.2091 1 55 2.79086 55 5V11H2V5Z" fill="#F5F3EB"/>
                        <circle cx="7" cy="6" r="2" fill="#ECE9DF"/>
                        <circle cx="13" cy="6" r="2" fill="#ECE9DF"/>
                        <circle cx="19" cy="6" r="2" fill="#ECE9DF"/>
                        <g filter="url(#filter1_d_786_16423)">
                        <rect y="10" width="57" height="14" rx="2" fill="#E7FFE7"/>
                        <rect x="0.5" y="10.5" width="56" height="13" rx="1.5" stroke="#2EA343"/>
                        <rect x="5" y="15" width="11" height="4" rx="1" fill="#A7EAAA"/>
                        <rect x="39" y="15" width="5" height="4" rx="1" fill="#A7EAAA"/>
                        <rect x="47" y="15" width="5" height="4" rx="1" fill="#A7EAAA"/>
                        </g>
                        </g>
                        <defs>
                        <filter id="filter0_d_786_16423" x="0" y="0" width="57" height="56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="3"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.843137 0 0 0 0 0.827451 0 0 0 0 0.788235 0 0 0 1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_786_16423"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_786_16423" result="shape"/>
                        </filter>
                        <filter id="filter1_d_786_16423" x="0" y="10" width="57" height="17" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="3"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.180392 0 0 0 0 0.639216 0 0 0 0 0.262745 0 0 0 1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_786_16423"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_786_16423" result="shape"/>
                        </filter>
                        </defs>
                        </svg>
    ),
}));
const Temp = () => {

     const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('global');

  const globalSet = new Set(['Navbar', 'Footer']);

  const match = (label) => label.toLowerCase().includes(searchQuery.trim().toLowerCase());

  const getVisibleSections = () => {
    if (activeTab === 'global') {
      return sections.filter(s => globalSet.has(s.label) && match(s.label));
    }
    if (activeTab === 'saved') {
      return savedSections.filter(s => s.label && match(s.label));
    }
    // default 'all'
    return sections.filter(s => match(s.label));
  };

  const visibleSections = getVisibleSections();

  const handleInsert = (s) => {
    if (typeof onInsert === 'function') {
      onInsert(s);
    } else {
      console.log('insert:', s);
    }
    if (typeof onClose === 'function') onClose();
  };

  return (
      <aside className="fixed left-20 top-4 bottom-0 w-80 bg-sprout-color-background-weaker shadow-xl roundedR-2xl z-50 p-4 overflow-y-auto">
                          <div className="flex items-center text- justify-between mb-4">
                            <h3 className='text-sprout-color-text-default font-medium pt-3 text-xl pl-2'>Add Component</h3>
                            <button
                               onClick={() => onClose ? onClose() : null}
                                className="text-2xl leading-none p-1 text-black"
                                aria-label="Close side panel "
                            >
                                ×
                            </button>
                        </div>
                        <div className='pt-5 flex gap-3 '>
                            <div className='bg-sprout-color-background-weaker border border-sprout-color-border-weak text-sprout-color-text-weakest   flex w-56 md:w-56 rounded-md'>
                                <div className='pl-4 pt-0.5'>


                                    <svg className='mt-2' width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#6F6765" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M13.9986 13.9991L11.0986 11.0991" stroke="#6F6765" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>


                                </div>
                              <Input
                                  type="text"
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  placeholder="Search sections"
                                  className=" placeholder:pt-1 border-none focus-visible:ring-0 focus-visible:ringOffset-0 w-36  focus:outline-none placeholder:text-sprout-color-text-weakest placeholder:text-md"
                                />
                                  </div>
                            <div className='p-2 rounded-md bg-sprout-color-background-weaker border border-sprout-color-border-weak text-sprout-color-text-weakest '>

                                <svg className='mt-0.5' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.1663 8.00009H5.92967M3.02234 8.00009H1.83301M3.02234 8.00009C3.02234 7.61464 3.17546 7.24498 3.44801 6.97243C3.72057 6.69987 4.09023 6.54676 4.47567 6.54676C4.86112 6.54676 5.23078 6.69987 5.50334 6.97243C5.77589 7.24498 5.92901 7.61464 5.92901 8.00009C5.92901 8.38554 5.77589 8.7552 5.50334 9.02775C5.23078 9.3003 4.86112 9.45342 4.47567 9.45342C4.09023 9.45342 3.72057 9.3003 3.44801 9.02775C3.17546 8.7552 3.02234 8.38554 3.02234 8.00009ZM14.1663 12.4048H10.3343M10.3343 12.4048C10.3343 12.7903 10.1809 13.1604 9.90824 13.433C9.63562 13.7056 9.26588 13.8588 8.88034 13.8588C8.49489 13.8588 8.12523 13.705 7.85268 13.4324C7.58013 13.1599 7.42701 12.7902 7.42701 12.4048M10.3343 12.4048C10.3343 12.0192 10.1809 11.6498 9.90824 11.3772C9.63562 11.1046 9.26588 10.9514 8.88034 10.9514C8.49489 10.9514 8.12523 11.1045 7.85268 11.3771C7.58013 11.6496 7.42701 12.0193 7.42701 12.4048M7.42701 12.4048H1.83301M14.1663 3.59542H12.0963M9.18901 3.59542H1.83301M9.18901 3.59542C9.18901 3.20998 9.34213 2.84031 9.61468 2.56776C9.88723 2.29521 10.2569 2.14209 10.6423 2.14209C10.8332 2.14209 11.0222 2.17968 11.1985 2.25272C11.3748 2.32576 11.535 2.43281 11.67 2.56776C11.805 2.70272 11.912 2.86293 11.985 3.03926C12.0581 3.21558 12.0957 3.40457 12.0957 3.59542C12.0957 3.78628 12.0581 3.97526 11.985 4.15159C11.912 4.32792 11.805 4.48813 11.67 4.62308C11.535 4.75804 11.3748 4.86509 11.1985 4.93813C11.0222 5.01116 10.8332 5.04876 10.6423 5.04876C10.2569 5.04876 9.88723 4.89564 9.61468 4.62308C9.34213 4.35053 9.18901 3.98087 9.18901 3.59542Z" stroke="black" strokeMiterlimit="10" strokeLinecap="round" />
                                </svg>

                            </div>



                        </div>
                        <div className='inline-block h-[1px] mt-8 w-full  bg-sprout-color-border-weak'></div>
                        <div >
                                       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[550px] p-4" >
                               <TabsList className="p-2 pl-4 ml-8 pt-4 pb-4 gap-2 bg-sprout-color-background-weaker border border-sprout-color-border-weak "> 

                                    <TabsTrigger
                                        value="all"
                                        className="
                            px-4 py-3 rounded-md border transition-colors
                            data-[state=active]:border-sprout-color-secondary
                            data-[state=active]:text-sprout-color-secondary
                            data-[state=active]:bg-sprout-color-secondary-lightest
      "
                                    >
                                        All
                                    </TabsTrigger>

                                    <TabsTrigger
                                        value="global"
                                        className="
        px-4 py-3 rounded-md border transition-colors
        data-[state=active]:border-sprout-color-secondary
        data-[state=active]:text-sprout-color-secondary
        data-[state=active]:bg-sprout-color-secondary-lightest
      "
                                    >
                                        Global
                                    </TabsTrigger>
                                </TabsList>

                            
                                   <TabsContent value="global"> 
                                      <div className='mt-5'>
                            <div className='text-sprout-color-text-disabled'>
                                Global Sections
                            </div>
                <div className="grid grid-cols-2 p-3 pt-5 gap-6 w-[260px] h-[150px]">

                                <div className='border border-sprout-color-border-weak  rounded-md '>
                                    
                      <div className='p-4 pl-6 rounded-t-md  bg-sprout-color-background-strongest '>
                          <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_786_16423)">
                        <path d="M2 5C2 2.79086 3.79086 1 6 1H51C53.2091 1 55 2.79086 55 5V48C55 50.2091 53.2091 52 51 52H6C3.79086 52 2 50.2091 2 48V5Z" fill="#FFFDF9" shapeRendering="crispEdges"/>
                        <path d="M51 0.5C53.4853 0.5 55.5 2.51472 55.5 5V48C55.5 50.4853 53.4853 52.5 51 52.5H6C3.51472 52.5 1.5 50.4853 1.5 48V5C1.5 2.51472 3.51472 0.5 6 0.5H51Z" stroke="#D7D3C9" shapeRendering="crispEdges"/>
                        <path d="M2 5C2 2.79086 3.79086 1 6 1H51C53.2091 1 55 2.79086 55 5V11H2V5Z" fill="#F5F3EB"/>
                        <circle cx="7" cy="6" r="2" fill="#ECE9DF"/>
                        <circle cx="13" cy="6" r="2" fill="#ECE9DF"/>
                        <circle cx="19" cy="6" r="2" fill="#ECE9DF"/>
                        <g filter="url(#filter1_d_786_16423)">
                        <rect y="10" width="57" height="14" rx="2" fill="#E7FFE7"/>
                        <rect x="0.5" y="10.5" width="56" height="13" rx="1.5" stroke="#2EA343"/>
                        <rect x="5" y="15" width="11" height="4" rx="1" fill="#A7EAAA"/>
                        <rect x="39" y="15" width="5" height="4" rx="1" fill="#A7EAAA"/>
                        <rect x="47" y="15" width="5" height="4" rx="1" fill="#A7EAAA"/>
                        </g>
                        </g>
                        <defs>
                        <filter id="filter0_d_786_16423" x="0" y="0" width="57" height="56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="3"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.843137 0 0 0 0 0.827451 0 0 0 0 0.788235 0 0 0 1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_786_16423"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_786_16423" result="shape"/>
                        </filter>
                        <filter id="filter1_d_786_16423" x="0" y="10" width="57" height="17" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="3"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.180392 0 0 0 0 0.639216 0 0 0 0 0.262745 0 0 0 1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_786_16423"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_786_16423" result="shape"/>
                        </filter>
                        </defs>
                        </svg>
                      </div>
                      <div>
                        <h1 className='text-sprout-color-text-default text-sm font-semibold  p-2'>Navbar</h1>
                      </div>

                                </div>
                                <div className='border border-sprout-color-border-weak  rounded-md '>
                                    
                      <div className='p-4 pl-6 rounded-t-md  bg-sprout-color-background-strongest '>
                          <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_786_16423)">
                        <path d="M2 5C2 2.79086 3.79086 1 6 1H51C53.2091 1 55 2.79086 55 5V48C55 50.2091 53.2091 52 51 52H6C3.79086 52 2 50.2091 2 48V5Z" fill="#FFFDF9" shapeRendering="crispEdges"/>
                        <path d="M51 0.5C53.4853 0.5 55.5 2.51472 55.5 5V48C55.5 50.4853 53.4853 52.5 51 52.5H6C3.51472 52.5 1.5 50.4853 1.5 48V5C1.5 2.51472 3.51472 0.5 6 0.5H51Z" stroke="#D7D3C9" shapeRendering="crispEdges"/>
                        <path d="M2 5C2 2.79086 3.79086 1 6 1H51C53.2091 1 55 2.79086 55 5V11H2V5Z" fill="#F5F3EB"/>
                        <circle cx="7" cy="6" r="2" fill="#ECE9DF"/>
                        <circle cx="13" cy="6" r="2" fill="#ECE9DF"/>
                        <circle cx="19" cy="6" r="2" fill="#ECE9DF"/>
                        <g filter="url(#filter1_d_786_16423)">
                        <rect y="10" width="57" height="14" rx="2" fill="#E7FFE7"/>
                        <rect x="0.5" y="10.5" width="56" height="13" rx="1.5" stroke="#2EA343"/>
                        <rect x="5" y="15" width="11" height="4" rx="1" fill="#A7EAAA"/>
                        <rect x="39" y="15" width="5" height="4" rx="1" fill="#A7EAAA"/>
                        <rect x="47" y="15" width="5" height="4" rx="1" fill="#A7EAAA"/>
                        </g>
                        </g>
                        <defs>
                        <filter id="filter0_d_786_16423" x="0" y="0" width="57" height="56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="3"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.843137 0 0 0 0 0.827451 0 0 0 0 0.788235 0 0 0 1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_786_16423"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_786_16423" result="shape"/>
                        </filter>
                        <filter id="filter1_d_786_16423" x="0" y="10" width="57" height="17" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="3"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.180392 0 0 0 0 0.639216 0 0 0 0 0.262745 0 0 0 1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_786_16423"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_786_16423" result="shape"/>
                        </filter>
                        </defs>
                        </svg>
                      </div>
                      <div>
                        <h1 className='text-sprout-color-text-default text-sm font-semibold  p-2'>Navbar</h1>
                      </div>

                                </div>
                             
                            </div>
                            <div className='pt-5 p-3 pl-10'>
                        <Button className="border border-sprout-color-secondary-lighter text-sprout-color-secondary-lighter bg-sprout-color-secondary-lightest hover:bg-sprout-color-secondary-lightest">
                       
                       
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.33906 2.05071C7.51432 1.87566 7.75188 1.77734 7.99957 1.77734C8.24726 1.77734 8.48482 1.87566 8.66007 2.05071L10.4235 3.81296C10.5103 3.89977 10.5792 4.00284 10.6262 4.11628C10.6733 4.22972 10.6975 4.35132 10.6975 4.47412C10.6975 4.59692 10.6733 4.71851 10.6262 4.83196C10.5792 4.9454 10.5103 5.04847 10.4235 5.13528L8.66007 6.89753C8.48482 7.07258 8.24726 7.17089 7.99957 7.17089C7.75188 7.17089 7.51432 7.07258 7.33906 6.89753L5.57565 5.13528C5.48879 5.04847 5.41989 4.9454 5.37289 4.83196C5.32588 4.71851 5.30168 4.59692 5.30168 4.47412C5.30168 4.35132 5.32588 4.22972 5.37289 4.11628C5.41989 4.00284 5.48879 3.89977 5.57565 3.81296L7.33906 2.05071ZM10.8634 5.57584C10.9502 5.48898 11.0533 5.42008 11.1667 5.37306C11.2801 5.32605 11.4017 5.30186 11.5245 5.30186C11.6473 5.30186 11.7689 5.32605 11.8823 5.37306C11.9958 5.42008 12.0989 5.48898 12.1857 5.57584L13.9478 7.3381C14.0347 7.4249 14.1036 7.52797 14.1506 7.64142C14.1976 7.75486 14.2218 7.87646 14.2218 7.99925C14.2218 8.12205 14.1976 8.24365 14.1506 8.35709C14.1036 8.47054 14.0347 8.57361 13.9478 8.66041L12.1857 10.4227C12.0989 10.5095 11.9958 10.5784 11.8823 10.6254C11.7689 10.6725 11.6473 10.6967 11.5245 10.6967C11.4017 10.6967 11.2801 10.6725 11.1667 10.6254C11.0533 10.5784 10.9502 10.5095 10.8634 10.4227L9.10123 8.66041C9.01438 8.57361 8.94548 8.47054 8.89847 8.35709C8.85146 8.24365 8.82726 8.12205 8.82726 7.99925C8.82726 7.87646 8.85146 7.75486 8.89847 7.64142C8.94548 7.52797 9.01438 7.4249 9.10123 7.3381L10.8634 5.57584ZM3.81348 5.57584C3.90028 5.48898 4.00335 5.42008 4.11679 5.37306C4.23022 5.32605 4.35181 5.30186 4.47461 5.30186C4.5974 5.30186 4.71899 5.32605 4.83243 5.37306C4.94587 5.42008 5.04893 5.48898 5.13573 5.57584L6.8979 7.3381C6.98476 7.4249 7.05366 7.52797 7.10067 7.64142C7.14768 7.75486 7.17187 7.87646 7.17187 7.99925C7.17187 8.12205 7.14768 8.24365 7.10067 8.35709C7.05366 8.47054 6.98476 8.57361 6.8979 8.66041L5.13573 10.4227C5.04893 10.5095 4.94587 10.5784 4.83243 10.6254C4.71899 10.6725 4.5974 10.6967 4.47461 10.6967C4.35181 10.6967 4.23022 10.6725 4.11679 10.6254C4.00335 10.5784 3.90028 10.5095 3.81348 10.4227L2.05131 8.66041C1.96446 8.57361 1.89556 8.47054 1.84855 8.35709C1.80154 8.24365 1.77734 8.12205 1.77734 7.99925C1.77734 7.87646 1.80154 7.75486 1.84855 7.64142C1.89556 7.52797 1.96446 7.4249 2.05131 7.3381L3.81348 5.57584ZM7.33844 9.10098C7.42524 9.01412 7.52831 8.94521 7.64174 8.8982C7.75518 8.85119 7.87677 8.82699 7.99957 8.82699C8.12236 8.82699 8.24395 8.85119 8.35739 8.8982C8.47083 8.94521 8.57389 9.01412 8.66069 9.10098L10.4229 10.8632C10.5981 11.0385 10.6965 11.2762 10.6965 11.5241C10.6965 11.7719 10.5981 12.0096 10.4229 12.1849L8.66069 13.9478C8.57389 14.0347 8.47083 14.1036 8.35739 14.1506C8.24395 14.1976 8.12236 14.2218 7.99957 14.2218C7.87677 14.2218 7.75518 14.1976 7.64174 14.1506C7.52831 14.1036 7.42524 14.0347 7.33844 13.9478L5.57627 12.1849C5.40124 12.0097 5.30293 11.7721 5.30293 11.5244C5.30293 11.2767 5.40124 11.0391 5.57627 10.8639L7.33844 9.10098Z" fill="#2EA343"/>
</svg>

     Add Global Section
                        </Button>
                            </div>

                        </div></TabsContent>
                                <TabsContent value="all">   <div className='pt-3'>
                                   <div className='text-sprout-color-text-disabled'>
                                Categories
                            </div>
                            <div className="grid grid-cols-2 p-3 pt-5 gap-6 w-[260px] h-[150px]">

  {visibleSections.length === 0 && (
    <div className="col-span-2 text-sprout-color-text-disabled p-2">No results</div>
  )}

  {visibleSections.map((s, i) => (
   <button
  key={i}
  type="button"
  onClick={() => handleInsert(s)}
  className="border border-sprout-color-border-weak  rounded-md "
>
     <div className='p-4 pl-6 rounded-t-md  bg-sprout-color-background-strongest '>
            {s.svg}
     </div>
     <div>
                        <h1 className='text-sprout-color-text-default text-sm font-semibold  p-2'>{s.label}</h1>
                      </div>
    </button>
  ))}

</div>


                        </div></TabsContent>
                            </Tabs>


                        </div>
                     
                        {/* <div className='pt-3'>
                            <div className='text-sprout-color-text-disabled'>
                                Categories
                            </div>
                            <div className="grid grid-cols-2 gap-4 p-3">

                                {sections.map((s, i) => (

                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => handleInsertPaletteSection(s)}
                                        className="text-left border border-sprout-color-border-weak rounded-md w-[130px] h-[130px] p-0 overflow-hidden"
                                    >
                                        <div className="border-b p-2 bg-sprout-color-background-strongest pl-7">
                                            {s.svg}
                                        </div>
                                        <div className="whitespace-nowrap text-sprout-color-text-default font-semibold p-2 pl-4 pt-1">
                                            {s.label}
                                        </div>
                                    </button>
                                ))}

                            </div>

                        </div> */}
                    </aside>
  )
}

export default Temp