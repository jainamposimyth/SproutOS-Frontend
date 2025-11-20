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
                <path d="M2 5C2 2.79086 3.79086 1 6 1H51C53.2091 1 55 2.79086 55 5V48C55 50.2091 53.2091 52 51 52H6C3.79086 52 2 50.2091 2 48V5Z" fill="#FFFDF9" shapeRendering="crispEdges" />
                <path d="M51 0.5C53.4853 0.5 55.5 2.51472 55.5 5V48C55.5 50.4853 53.4853 52.5 51 52.5H6C3.51472 52.5 1.5 50.4853 1.5 48V5C1.5 2.51472 3.51472 0.5 6 0.5H51Z" stroke="#D7D3C9" shapeRendering="crispEdges" />
                <path d="M2 5C2 2.79086 3.79086 1 6 1H51C53.2091 1 55 2.79086 55 5V11H2V5Z" fill="#F5F3EB" />
                <circle cx="7" cy="6" r="2" fill="#ECE9DF" />
                <circle cx="13" cy="6" r="2" fill="#ECE9DF" />
                <circle cx="19" cy="6" r="2" fill="#ECE9DF" />
                <g filter="url(#filter1_d_786_16423)">
                    <rect y="10" width="57" height="14" rx="2" fill="#E7FFE7" />
                    <rect x="0.5" y="10.5" width="56" height="13" rx="1.5" stroke="#2EA343" />
                    <rect x="5" y="15" width="11" height="4" rx="1" fill="#A7EAAA" />
                    <rect x="39" y="15" width="5" height="4" rx="1" fill="#A7EAAA" />
                    <rect x="47" y="15" width="5" height="4" rx="1" fill="#A7EAAA" />
                </g>
            </g>
            <defs>
                <filter id="filter0_d_786_16423" x="0" y="0" width="57" height="56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="3" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.843137 0 0 0 0 0.827451 0 0 0 0 0.788235 0 0 0 1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_786_16423" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_786_16423" result="shape" />
                </filter>
                <filter id="filter1_d_786_16423" x="0" y="10" width="57" height="17" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="3" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.180392 0 0 0 0 0.639216 0 0 0 0 0.262745 0 0 0 1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_786_16423" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_786_16423" result="shape" />
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
                <h3 className='text-sprout-color-text-default font-medium pt-5 text-xl pl-2'>Project</h3>
              

                
         </div>
            <div className="flex rounded-md p-1 mt-5 border bg-sprout-color-secondary-lightest border-sprout-color-secondary">
                          <svg className="ml-6 mt-1.5" width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.33906 2.05071C7.51432 1.87566 7.75188 1.77734 7.99957 1.77734C8.24726 1.77734 8.48482 1.87566 8.66007 2.05071L10.4235 3.81296C10.5103 3.89977 10.5792 4.00284 10.6262 4.11628C10.6733 4.22972 10.6975 4.35132 10.6975 4.47412C10.6975 4.59692 10.6733 4.71851 10.6262 4.83196C10.5792 4.9454 10.5103 5.04847 10.4235 5.13528L8.66007 6.89753C8.48482 7.07258 8.24726 7.17089 7.99957 7.17089C7.75188 7.17089 7.51432 7.07258 7.33906 6.89753L5.57565 5.13528C5.48879 5.04847 5.41989 4.9454 5.37289 4.83196C5.32588 4.71851 5.30168 4.59692 5.30168 4.47412C5.30168 4.35132 5.32588 4.22972 5.37289 4.11628C5.41989 4.00284 5.48879 3.89977 5.57565 3.81296L7.33906 2.05071ZM10.8634 5.57584C10.9502 5.48898 11.0533 5.42008 11.1667 5.37306C11.2801 5.32605 11.4017 5.30186 11.5245 5.30186C11.6473 5.30186 11.7689 5.32605 11.8823 5.37306C11.9958 5.42008 12.0989 5.48898 12.1857 5.57584L13.9478 7.3381C14.0347 7.4249 14.1036 7.52797 14.1506 7.64142C14.1976 7.75486 14.2218 7.87646 14.2218 7.99925C14.2218 8.12205 14.1976 8.24365 14.1506 8.35709C14.1036 8.47054 14.0347 8.57361 13.9478 8.66041L12.1857 10.4227C12.0989 10.5095 11.9958 10.5784 11.8823 10.6254C11.7689 10.6725 11.6473 10.6967 11.5245 10.6967C11.4017 10.6967 11.2801 10.6725 11.1667 10.6254C11.0533 10.5784 10.9502 10.5095 10.8634 10.4227L9.10123 8.66041C9.01438 8.57361 8.94548 8.47054 8.89847 8.35709C8.85146 8.24365 8.82726 8.12205 8.82726 7.99925C8.82726 7.87646 8.85146 7.75486 8.89847 7.64142C8.94548 7.52797 9.01438 7.4249 9.10123 7.3381L10.8634 5.57584ZM3.81348 5.57584C3.90028 5.48898 4.00335 5.42008 4.11679 5.37306C4.23022 5.32605 4.35181 5.30186 4.47461 5.30186C4.5974 5.30186 4.71899 5.32605 4.83243 5.37306C4.94587 5.42008 5.04893 5.48898 5.13573 5.57584L6.8979 7.3381C6.98476 7.4249 7.05366 7.52797 7.10067 7.64142C7.14768 7.75486 7.17187 7.87646 7.17187 7.99925C7.17187 8.12205 7.14768 8.24365 7.10067 8.35709C7.05366 8.47054 6.98476 8.57361 6.8979 8.66041L5.13573 10.4227C5.04893 10.5095 4.94587 10.5784 4.83243 10.6254C4.71899 10.6725 4.5974 10.6967 4.47461 10.6967C4.35181 10.6967 4.23022 10.6725 4.11679 10.6254C4.00335 10.5784 3.90028 10.5095 3.81348 10.4227L2.05131 8.66041C1.96446 8.57361 1.89556 8.47054 1.84855 8.35709C1.80154 8.24365 1.77734 8.12205 1.77734 7.99925C1.77734 7.87646 1.80154 7.75486 1.84855 7.64142C1.89556 7.52797 1.96446 7.4249 2.05131 7.3381L3.81348 5.57584ZM7.33844 9.10098C7.42524 9.01412 7.52831 8.94521 7.64174 8.8982C7.75518 8.85119 7.87677 8.82699 7.99957 8.82699C8.12236 8.82699 8.24395 8.85119 8.35739 8.8982C8.47083 8.94521 8.57389 9.01412 8.66069 9.10098L10.4229 10.8632C10.5981 11.0385 10.6965 11.2762 10.6965 11.5241C10.6965 11.7719 10.5981 12.0096 10.4229 12.1849L8.66069 13.9478C8.57389 14.0347 8.47083 14.1036 8.35739 14.1506C8.24395 14.1976 8.12236 14.2218 7.99957 14.2218C7.87677 14.2218 7.75518 14.1976 7.64174 14.1506C7.52831 14.1036 7.42524 14.0347 7.33844 13.9478L5.57627 12.1849C5.40124 12.0097 5.30293 11.7721 5.30293 11.5244C5.30293 11.2767 5.40124 11.0391 5.57627 10.8639L7.33844 9.10098Z" fill="#2EA343"/>
                          </svg> 
                          <Button className="bg-transparent hover:bg-transparent cursor-pointer text-sprout-color-secondary">Make a Global Section</Button>
                        </div>

                        <div className='pt-5 p-3 flex flex-col gap-5 '>
                            <h1 className='text-xl text-sprout-color-text-default'>
                                Name
                            </h1>
                            <div className='p-2 border text-[#6F6765] border-sprout-color-border-weak rounded-md '>
                                Hero Section
                            </div>
                             <div className='p-2 border flex gap-5 text-[#6F6765] border-sprout-color-border-weak rounded-md '>
                              <div className='flex gap-3'>

<svg width="42" height="24" viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.444444" y="0.444444" width="41.1111" height="23.1111" rx="1.55556" fill="white"/>
<rect x="0.444444" y="0.444444" width="41.1111" height="23.1111" rx="1.55556" stroke="#E0E0E0" stroke-width="0.888889"/>
<path d="M36.0342 5C36.5666 5 36.9988 5.43151 36.999 5.96387V18.0352C36.999 18.5677 36.5667 19 36.0342 19H22.9951C22.4628 18.9998 22.0312 18.5676 22.0312 18.0352V5.96387C22.0314 5.43162 22.4629 5.00019 22.9951 5H36.0342ZM12.7754 16.1016C13.0417 16.1016 13.2578 16.3177 13.2578 16.584V18.5166C13.2576 18.7827 13.0415 18.998 12.7754 18.998H5.48242C5.21631 18.998 5.00023 18.7827 5 18.5166V16.584C5 16.3177 5.21616 16.1016 5.48242 16.1016H12.7754ZM19.4854 8.86328C19.7516 8.86328 19.9678 9.07944 19.9678 9.3457V14.6572C19.9676 14.9234 19.7515 15.1387 19.4854 15.1387H5.48242C5.21625 15.1387 5.00014 14.9234 5 14.6572V9.3457C5 9.07944 5.21616 8.86328 5.48242 8.86328H19.4854ZM19.4854 5C19.7516 5 19.9678 5.21616 19.9678 5.48242V7.41406C19.9678 7.68032 19.7516 7.89648 19.4854 7.89648H5.48242C5.21616 7.89648 5 7.68032 5 7.41406V5.48242C5 5.21616 5.21616 5 5.48242 5H19.4854Z" fill="url(#paint0_linear_428_5879)"/>
<defs>
<linearGradient id="paint0_linear_428_5879" x1="5" y1="12" x2="36.999" y2="12" gradientUnits="userSpaceOnUse">
<stop stop-color="#E7E7E7"/>
<stop offset="1" stop-color="#F9F9F9"/>
</linearGradient>
</defs>
</svg>
<div>
    Hero Section
</div>

                              </div>
                              <div className='ml-16 mt-2'>

<svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.17847 9.17847L5.17847 5.17847L1.17847 1.17847" stroke="#413735" stroke-width="1.66667" stroke-linecap="square" stroke-linejoin="round"/>
</svg>

                              </div>
                            </div>
                        </div>
        </aside>
    )
}

export default Temp