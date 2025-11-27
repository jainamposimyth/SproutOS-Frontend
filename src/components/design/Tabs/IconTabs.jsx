'use client'
import React,{useState} from 'react'
import { Button } from '@/components/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from '@/components/ui/input'
import { IconPicker,Icon } from '@/components/ui/icon-picker'
import { useIconTab } from '@/context/IconTabContext'
const IconTabs = () => {
      const [activeTab, setActiveTab] = useState('replace');
      const [secondActiveTab,setSecondActiveTab]= useState('icon-pack')
      const [selectedIcon, setSelectedIcon] = useState(null);
        const {iconBoxOpen,setIconBoxOpen} = useIconTab()
  return (
    <div className='p-4 bg-[#FFFDF9] border min-h-screen w-80'>
        <div className='p-4 flex gap-3 items-center'>
        <div className='' onClick={()=> setIconBoxOpen(false)}>
          <svg 
         
          width="28" 
          height="28" 
          viewBox="0 0 20 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
        >
          <path d="M12.5 15L7.5 10L12.5 5" stroke="#413735" strokeWidth="2.08333" strokeLinecap="square" strokeLinejoin="round"/>
        </svg>
        </div>
        <h1 className='text-xl text-sprout-color-text-default'>
          Icons
        </h1>
      </div>
       <div className="flex flex-col gap-4 mt-2 pl-4">
        <div className="flex justify-between p-2">
          <div className='flex rounded-md p-1 w-full'>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

              <TabsList className="border flex border-sprout-color-border-weak gap-2 bg-transparent px-2 py-6 shadow-none">
                <TabsTrigger
                  value="edit"
                  className="p-0 bg-transparent border-none shadow-none data-[state=active]:bg-transparent"
                >
                  <Button className={`border ${
                    activeTab === 'edit' 
                      ? 'border-sprout-color-secondary bg-white hover:bg-white text-sprout-color-secondary' 
                      : 'text-sprout-color-text-disabled bg-white hover:bg-white'
                  }`}>
                    Edit Image
                  </Button>
                </TabsTrigger>

                <TabsTrigger
                  value="replace"
                  className="p-0 bg-transparent border-none shadow-none data-[state=active]:bg-transparent"
                >
                  <Button className={`border ${
                    activeTab === 'replace' 
                      ? 'border-sprout-color-secondary bg-white hover:bg-white text-sprout-color-secondary' 
                      : 'text-sprout-color-text-disabled bg-white hover:bg-white'
                  }`}>
                    Replace
                  </Button>
                </TabsTrigger>
              </TabsList>

          <TabsContent value="replace">
                  <div>
                    <div className=' mt-6  '>

<img src="/rectangle.png" alt="" className=' rounded-md w-full border border-sprout-color-border-weak' />

                    </div>
                    <div className='text-lg  pt-8 text-sprout-color-text-disabled'>
          <div>
            Content
          </div>
    <Tabs value={secondActiveTab} onValueChange={setSecondActiveTab} className="w-full">
           <TabsList className="border flex border-sprout-color-border-weak gap-2 bg-transparent px-2 py-6 shadow-none">
               <TabsTrigger
                  value="icon-pack"
                  className="p-0 bg-transparent border-none shadow-none data-[state=active]:bg-transparent"
                >
                  <Button className={`border ${
                    secondActiveTab === 'icon-pack' 
                      ? 'border-sprout-color-secondary bg-white hover:bg-white text-sprout-color-secondary' 
                      : 'text-sprout-color-text-disabled bg-white hover:bg-white'
                  }`}>
                    Icon Pack
                  </Button>
                </TabsTrigger>
                 <TabsTrigger
                  value="upload"
                  className="p-0 bg-transparent border-none shadow-none data-[state=active]:bg-transparent"
                >
                  <Button className={`border ${
                    secondActiveTab === 'upload' 
                      ? 'border-sprout-color-secondary bg-white hover:bg-white text-sprout-color-secondary' 
                      : 'text-sprout-color-text-disabled bg-white hover:bg-white'
                  }`}>
                   Uploads
                  </Button>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="icon-pack">
                    <div className='w-full h-[0.4px] border-[#D7D5D2] border mt-5'>

                    </div>
                    <div className='mt-6'>
          <IconPicker 
        value={selectedIcon}
        onValueChange={setSelectedIcon}
        className="border rounded-lg p-4"
      />
      
    
                    </div>
            </TabsContent>
          </Tabs>

          
        </div>
                  </div>
          </TabsContent>

             
            </Tabs>
          </div>
        </div> </div>

        </div>

  )
}

export default IconTabs