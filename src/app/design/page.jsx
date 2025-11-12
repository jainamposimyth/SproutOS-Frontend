'use client'
import React, { useState } from 'react'
import SideBar from '@/components/design/Sidebar'
import Hero from '@/components/design/Hero'
import Navbar from '@/components/sitemap/Navbar'
export default function DesignPage() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
      <div className="flex flex-col h-screen">

      <Navbar />
       <div className="flex flex-1 overflow-hidden">
        <div className="w-20 bg-sprout-color-background-dark border-r border-[#3A2F2C]">
          <SideBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          </div>

          <div className="flex-1 overflow-auto  ">
          <Hero activeIndex={activeIndex} />
          </div>
        </div>
      </div>
  )
}
