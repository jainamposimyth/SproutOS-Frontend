'use client'

import axios from 'axios'
import React, { useCallback } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Button } from '../ui/button'
import { useState } from 'react'

import FlowDiagram from '../FlowDiagram'

import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,

} from "@/components/ui/select"


const Hero = () => {

  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState(null);
  const [selectedPages, setSelectedPages] = useState("2");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("english");


 
    const sendData = async () => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:4000/api/generate-structure', {
        prompt: prompt,
        pages: selectedPages,
        language
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
    <div className="flex flex-col h-screen   text-white ">


      <Navbar />
      <div className="flex  min-h-screen">
        <Sidebar />
        {
          !response && (
            <main className="bg-[#FFFDFA]  text-black flex-1 overflow-y-auto rounded-t-xl">
              <div className='h-full w-80 border p-6 '>
                <div className='text-xl font-[500] text-[#413735]'>
                  Project
                </div>
                <div className='pt-5 gap-8 flex items-start justify-between'>
                  <div className='text-[#574E4C] text-lg font-[500]'>
                    Sitemap Prompt <span className='text-red-600'>*</span>
                  </div>
                  <div className='text-[#88827E] font-[500] cursor-pointer underline decoration-1 decoration-dotted underline-offset-2 decoration-[#88827E]'>
                    Try example
                  </div>

                </div>
                <div className="relative mt-6 rounded-md">
                  <textarea
                    id="description"
                    placeholder=" "
                    onChange={(e) => setPrompt(e.target.value)}
                    className="peer w-full border  border-[#D7D3C9] bg-[#FFFDF9] rounded-md text-black placeholder-transparent px-3 md:px-4 pt-4 md:pt-6 text-sm md:text-base focus:outline-none  h-24 md:h-28 lg:h-32 resize-none"
                  />

                  {!prompt && (
                    <label
                      htmlFor="description"
                      className="absolute left-7 md:left-4 top-3 md:top-4 text-sm md:text-base text-[#88827E] transition-all
               peer-placeholder-shown:opacity-100
               peer-focus:opacity-0 peer-focus:hidden
               pointer-events-none"
                    >
                      
                      A compelling hero section with a catchy tagline, a brief description of the agency, and a call-to-action button.
                    </label>
                  )}
                </div>

                <div className='mt-4'>
                  <div className='flex flex-col gap-2'>
                    <div className='text-[#574E4C] font-[500] text-lg'>
                      Number of Pages
                    </div>
                    <Select
                      value={selectedPages}
                      onValueChange={(value) => setSelectedPages(value)}
                    >
                      <SelectTrigger className="text-black w-[270px] h-[100px]">
                        <div className="text-lg text-[#413735]">
                          {selectedPages} page{selectedPages > 1 ? "s" : ""}
                        </div>
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="1" className="text-lg p-2 border-b">
                          1 page
                        </SelectItem>
                        <SelectItem value="2" className="text-lg p-2 border-b">
                          2 pages
                        </SelectItem>
                        <SelectItem value="3" className="text-lg p-2 border-b">
                          3 pages
                        </SelectItem>
                        <SelectItem value="4" className="text-lg p-2 border-b">
                          4 pages
                        </SelectItem>
                        <SelectItem value="5" className="text-lg p-2 border-b">
                          5 pages
                        </SelectItem>
                        <SelectItem value="6" className="text-lg p-2 border-b">
                          6 pages
                        </SelectItem>

                      </SelectContent>
                    </Select>

                  </div>

                </div>

                <div className='mt-6'>
                  <div className="flex flex-col gap-2">
                    <div className="text-[#574E4C] font-[500] text-lg">Language</div>

                    <Select value={language} onValueChange={(value) => setLanguage(value)}>
                      <SelectTrigger className="text-black w-[270px] h-[100px]">
                        <div className="text-lg text-[#413735]">{language}</div>
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="English (US)" className="text-lg p-2 border-b">
                          English (US)
                        </SelectItem>
                        <SelectItem value="Hindi" className="text-lg p-2 border-b">
                          Hindi
                        </SelectItem>
                        <SelectItem value="Spanish" className="text-lg p-2 border-b">
                          Spanish
                        </SelectItem>
                        <SelectItem value="French" className="text-lg p-2 border-b">
                          French
                        </SelectItem>
                        <SelectItem value="Gujrati" className="text-lg p-2 border-b">
                          Gujrati
                        </SelectItem>
                      </SelectContent>
                    </Select>


                  </div>

                </div>
                <div className='mt-6 flex flex-col gap-3'>
                  <Button className="bg-[#695BE8] w-[270px] h-[48px] hover:bg-[#695BE8] cursor-pointer" onClick={sendData}
                    disabled={loading}>

                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_428_5496)">
                        <circle cx="7.99609" cy="8" r="7.55556" stroke="#FFFDF9" strokeWidth="0.888889" />
                        <path opacity="0.8" d="M11.9846 3.9983C10.3535 6.41572 10.3535 9.58137 11.9846 11.9988C9.5672 10.3677 6.40155 10.3677 3.98413 11.9988C5.61524 9.58137 5.61524 6.41572 3.98413 3.9983C6.40155 5.62941 9.5672 5.62941 11.9846 3.9983Z" fill="#FFFDF9" />
                        <path d="M7.99609 2C8.58579 5.03621 10.9599 7.4103 13.9961 8C10.9599 8.5897 8.58579 10.9638 7.99609 14C7.4064 10.9638 5.03231 8.5897 1.99609 8C5.03231 7.4103 7.4064 5.03621 7.99609 2Z" fill="#FFFDF9" />
                      </g>
                      <defs>
                        <clipPath id="clip0_428_5496">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    {loading ? 'Generating design...' : 'Generate design'}
                  </Button>
                  <span className='text-[#88827E]  text-center text-sm pl-4'>This will override all page sections.</span>
                </div>
              </div>
            </main>
          )
        }
        <div>

          {response && (
            <div className="">
              <FlowDiagram data={response} />

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero