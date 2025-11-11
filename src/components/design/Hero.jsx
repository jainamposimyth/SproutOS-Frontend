'use client'
import React from 'react'
import Navbar from '../sitemap/Navbar'
import Sections from './Tabs/Sections'
import StyleGuide from './Tabs/StyleGuide'
// import any other tab components here
// import AnotherTab from './Tabs/AnotherTab'
// import SettingsTab from './Tabs/SettingsTab'

export default function Hero({ activeIndex }) {
  const tabs = [
    <Sections key="sections" />,
    <div key="tab2">Tab 2 content here</div>,
    <div key="tab3">Tab 3 content here</div>,
 <StyleGuide key="styleguide" />,
    <div key="tab5">Tab 5 content here</div>,
    <div key="tab6">Tab 6 content here</div>,
  ]

  return (
    <div className="flex flex-col flex-1 h-screen text-white">
     
      <main className="flex-1 overflow-auto  w-full">
        {tabs[activeIndex]}
      </main>
    </div>
  )
}
