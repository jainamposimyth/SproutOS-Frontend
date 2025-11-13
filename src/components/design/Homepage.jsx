'use client'
import React, { useState } from 'react'
import SideBar from './Sidebar'
import Hero from './Hero'

export default function Homepage() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex min-h-screen bg-sprout-color-background-weaker">
    
      <div className="hidden sm:flex">
        <SideBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </div>


      <div className="flex-1 flex flex-col overflow-hidden">
        <Hero activeIndex={activeIndex} />
      </div>
    </div>
  )
}
