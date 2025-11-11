'use client'
import React, { useState } from 'react'
import SideBar from './Sidebar'
import Hero from './Hero'

export default function Homepage() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex h-screen">
      <SideBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <Hero activeIndex={activeIndex} />
    </div>
  )
}
