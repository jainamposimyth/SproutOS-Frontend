'use client'
import React from 'react'
import Navbar from '../sitemap/Navbar'
import Sections from './Tabs/Sections'
import StyleGuide from './Tabs/StyleGuide'
import PromptBox from './Tabs/PromptBox'
import Main from '../generate-website/Main'
import AIEditor from './Tabs/AIEditor'
export default function Hero({ activeIndex }) {
  const tabs = [
   
  ]

  return (
    <div className="flex h-screen text-white">

  

      <div className="w-full p-4">
        <div className='p-12  text-black'>
          <div className='bg-sprout-color-background-strongest flex justify-between item-start p-3 rounded-md border-sprout-color-border-weak border'>

            <div className='flex gap-3 '>
              <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6.00065L8 1.33398L14 6.00065V13.334C14 13.6876 13.8595 14.0267 13.6095 14.2768C13.3594 14.5268 13.0203 14.6673 12.6667 14.6673H3.33333C2.97971 14.6673 2.64057 14.5268 2.39052 14.2768C2.14048 14.0267 2 13.6876 2 13.334V6.00065Z" stroke="#88827E" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 14.6667V8H10V14.6667" stroke="#88827E" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <div className='text-sprout-color-text-disabledfont-md font-[500]'>Home</div>
            </div>
            <div className='border border-sprout-color-secondary bg-white rounded-sm'>
              <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3.33325V12.6666" stroke="#695BE8" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.33337 8H12.6667" stroke="#695BE8" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

          </div>
          <div className="border border-sprout-color-border-weak py-16 rounded-md mt-4">
            <Main />
          </div>

          <div>



          </div>
        </div>
      </div>
    </div>

  )
}
