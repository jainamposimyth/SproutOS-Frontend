'use client'
import React, { useState } from 'react'
import SideBar from '@/components/design/Sidebar'
import Hero from '@/components/design/Hero'
import Navbar from '@/components/sitemap/Navbar'
export default function DesignPage() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
      <div className="flex flex-col h-screen">
      {/* Navbar at the very top */}
      <Navbar />

      {/* Main layout: Sidebar + Hero */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-20 bg-[#2B2321] border-r border-[#3A2F2C]">
          <SideBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </div>

        <div className="flex-1 overflow-auto bg-[#F5F3EB]">
          <Hero activeIndex={activeIndex} />
        </div>
      </div>
    </div>
  )
}
