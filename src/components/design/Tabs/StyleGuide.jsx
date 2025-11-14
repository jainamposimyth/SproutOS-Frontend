'use client'
import React,{useState} from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
const StyleGuide = () => {
     const selectedColor = "#004AEC";
const [selectedTextColor, setSelectedTextColor] = useState("#000000");
const [selectedBgColor, setSelectedBgColor] = useState("#FFFFFF");

  return (
    <main className="bg-[#FFFDFA]  text-black flex-1  rounded-t-xl">
      <div className='h-full w-80 border p-6  '>
        <div className='text-xl font-[500] text-sprout-color-text-default'>
          Section
        </div>
        <div className='flex flex-col pt-2 gap-3'>
             <Select>
              <SelectTrigger className="w-[270px] p-3 mt-4 border border-sprout-color-border-weak ">
                <SelectValue placeholder="Concept - 1" />
              </SelectTrigger>
            </Select>
          <Button className="bg-sprout-color-secondary-lightest cursor-pointer border border-sprout-color-secondary hover:bg-sprout-color-secondary-lightest text-sprout-color-secondary">

            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.93164 12.9805C10.2078 12.9805 10.4316 13.2043 10.4316 13.4805C10.4316 13.7566 10.2078 13.9805 9.93164 13.9805H4.02734C3.7512 13.9805 3.52734 13.7566 3.52734 13.4805C3.52734 13.2043 3.7512 12.9805 4.02734 12.9805H9.93164ZM8.79395 0.139648C8.99308 -0.0515678 9.3097 -0.0457196 9.50098 0.15332C9.69223 0.352487 9.68547 0.669085 9.48633 0.860352L8.22266 2.07422H12.1641C13.1364 2.07438 13.9598 2.83626 13.96 3.81836V10.6631C13.9599 11.6453 13.1365 12.4071 12.1641 12.4072H1.7959C0.884287 12.4071 0.103869 11.7377 0.00976562 10.8447L0 10.6631V3.81836C0.000171625 2.83624 0.82354 2.07436 1.7959 2.07422H5.7373L4.47363 0.860352C4.27482 0.669077 4.26888 0.352389 4.45996 0.15332C4.65125 -0.0455248 4.96792 -0.0514958 5.16699 0.139648L6.97949 1.88086L8.79395 0.139648ZM1.7959 3.07422C1.33724 3.07436 1.00018 3.42634 1 3.81836V10.6631L1.00391 10.7363C1.04273 11.098 1.36589 11.4071 1.7959 11.4072H12.1641C12.6228 11.4071 12.9599 11.0552 12.96 10.6631V3.81836C12.9598 3.42635 12.6227 3.07438 12.1641 3.07422H1.7959Z" fill="#695BE8" />
            </svg>
            Pitch Concepts
          </Button>   <div>
          </div>  </div>
       

   <div className='inline-block h-[1px] mt-1 w-full bg-[#D7D5D2]'>

        </div>
            <div className='w-full mt-6  p-2   rounded-md'>
                <div className='flex gap-3'>
          
          <Tabs defaultValue="colors" className="bg-none border-none">
      <TabsList>
          <TabsTrigger className=" cursor-pointer bg-sprout-color-secondary-lightest rounded-md text-sprout-color-secondary border border-sprout-color-secondary  p-3" value="colors">Colors</TabsTrigger>
          <TabsTrigger className="cursor-pointer bg-transparent shdadow-none rounded-md text-sprout-color-text-disabled ml-3 p-2" value="typography">Typography</TabsTrigger>
          <TabsTrigger className="cursor-pointer bg-transparent shdadow-none rounded-md text-sprout-color-text-disabled ml-3 p-2" value="effects">Effects</TabsTrigger>
      </TabsList>
      <TabsContent value="colors" className="border-none">
 <div className='mt-6'>
          <div className='text-md font-[500] text-sprout-color-text-default'>
           Brand Colors
          </div>


  

<ColorItem color="#004AEC" isSelected={selectedColor === "#004AEC"} />
<ColorItem color="#FF5733" isSelected={selectedColor === "#FF5733"} />
<ColorItem color="#00C27A" isSelected={selectedColor === "#00C27A"} />
      

        </div>
           <div className='mt-6'>
          <div className='text-md font-[500] text-sprout-color-text-default'>
           Text Colors
          </div>


  
<TextColorItem color="#000000" isSelected={selectedTextColor === "#000000"} />
<TextColorItem color="#3D3D3D" isSelected={selectedTextColor === "#3D3D3D"} />
<TextColorItem color="#000000" isSelected={selectedTextColor === "#000000"} />
      

        </div>
             <div className='mt-6'>
          <div className='text-md font-[500] text-sprout-color-text-default'>
           Background Colors
          </div>


  
<BackgroundColorItem 
  color="#FFFFFF" 
  isSelected={selectedBgColor === "#FFFFFF"} 
  onClick={() => setSelectedBgColor("#FFFFFF")}
/>

<BackgroundColorItem 
  color="#000000" 
  isSelected={selectedBgColor === "#000000"} 
  onClick={() => setSelectedBgColor("#000000")}
/>

<BackgroundColorItem 
  color="#004AEC" 
  isSelected={selectedBgColor === "#004AEC"} 
  onClick={() => setSelectedBgColor("#004AEC")}
/>

      

        </div>
      </TabsContent>
      <TabsContent value="typography">
        <div className='mt-4'>
 <div className='text-md font-[500] text-sprout-color-text-default'>
           Heading
          </div>

            <Select>
              <SelectTrigger className="w-[270px] p-3 mt-4 border border-sprout-color-border-weak ">
                <SelectValue placeholder="Inter" />
              </SelectTrigger>
            </Select>

        </div>
                <div className='mt-4'>
 <div className='text-md font-[500] text-sprout-color-text-disabled'>
           Font Weight
          </div>

            <Select>
              <SelectTrigger className="w-[270px] p-3 mt-4 border border-sprout-color-border-weak ">
                  <SelectValue placeholder="Regular" />
              </SelectTrigger>
            </Select>

        </div>
                <div className='mt-4 mb-2'>
 <div className='text-md font-[500] text-sprout-color-text-disabled'>
           Size
          </div>

          
        <div className='flex w-[270px] p-2 rounded-lg pl-6 mt-4 border border-sprout-color-border-weak '>
          <Button className="-ml-3 hover:bg-sprout-color-secondary-lightest mlcursor-pointer bg-sprout-color-secondary-lightest rounded-md text-sprout-color-secondary border border-sprout-color-secondary ">
          Small
        </Button>
        <Button className="cursor-pointer bg-transparent hover:bg-transparent shdadow-none rounded-md text-sprout-color-text-disabled ">
        Regular</Button>
        <Button className="cursor-pointer bg-transparent hover:bg-transparent  shdadow-none rounded-md text-sprout-color-text-disabled ">
          Large
        </Button>
        </div>
           

        </div>

         <div className='inline-block mt-3 h-[1px] w-full bg-[#D7D5D2]'>

        </div>

 <div className='mt-4'>


 <div className='text-md font-[500] text-sprout-color-text-default'>
           Body
          </div>

            <Select>
              <SelectTrigger className="w-[270px] p-3 mt-4 border border-sprout-color-border-weak ">
                <SelectValue placeholder="Inter" />
              </SelectTrigger>
            </Select>

        </div>
                <div className='mt-4'>
 <div className='text-md font-[500] text-sprout-color-text-disabled'>
           Font Weight
          </div>

            <Select>
              <SelectTrigger className="w-[270px] p-3 mt-4 border border-sprout-color-border-weak ">
                  <SelectValue placeholder="Regular" />
              </SelectTrigger>
            </Select>

        </div>
                <div className='mt-4'>
 <div className='text-md font-[500] text-sprout-color-text-disabled'>
           Size
          </div>

          
          <div className='flex w-[270px] p-2 rounded-lg pl-6 mt-4 border border-sprout-color-border-weak '>
            <Button className="-ml-3  hover:bg-sprout-color-secondary-lightest cursor-pointer bg-sprout-color-secondary-lightest rounded-md text-sprout-color-secondary border border-sprout-color-secondary ">
            Small
          </Button>
          <Button className="cursor-pointer bg-transparent hover:bg-transparent shdadow-none rounded-md text-sprout-color-text-disabled ">
          Regular</Button>
          <Button className="cursor-pointer bg-transparent hover:bg-transparent  shdadow-none rounded-md text-sprout-color-text-disabled ">
            Large
          </Button>
          </div>
           

        </div>

      </TabsContent>
      <TabsContent value="effects" className="">
   <div className='mt-6'>
       <div className='text-[#88827E]'>
      Border Radius
      </div>
      <div className='border border-sprout-color-border-weak '>
        <div className='border border-[#EFEFFF] bg-sprout-color-secondary-lightest'>
        
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.2229 1.0249C14.637 1.0249 14.9727 1.36089 14.9729 1.7749C14.9729 2.18912 14.6371 2.5249 14.2229 2.5249H2.52856V14.2192C2.52856 14.6335 2.19278 14.9692 1.77856 14.9692C1.36455 14.969 1.02856 14.6333 1.02856 14.2192V1.0249H14.2229Z" fill="#695BE8"/>
      </svg>

        </div>
      </div>
   </div>
      </TabsContent>
          </Tabs>
                </div>
            </div>
      </div>
    </main>
  )
}

export default StyleGuide


const ColorItem = ({ color, isSelected }) => {
  return (
    <div className="flex mb-4 mt-3 items-center gap-3">
  
      <div
        className={`w-6 h-6 mt-1 rounded-full ${
          isSelected
            ? "bg-[#004AEC]" 
            : "bg-white border border-sprout-color-border-weak"
        }`}
      ></div>

      <div className="border border-sprout-color-border-weak w-56 h-12 rounded-md flex items-center">
        <div className="flex items-center gap-3 ml-2">
  
          <div
            className={`w-5 h-5 rounded-full ${
              isSelected
                ? "bg-[#004AEC]"
                : "bg-white border border-sprout-color-border-weak"
            }`}
          ></div>

          <div className="text-sprout-color-text-default ml-3">
            {color}
          </div>
        </div>
      </div>
    </div>
  );
};

const TextColorItem = ({ color, isSelected }) => {
  return (
    <div className="flex mb-4 mt-3 items-center gap-3">
      
      {/* LEFT CIRCLE */}
      <div
        className={`w-6 h-6 mt-1 rounded-full ${
          isSelected
            ? "bg-black" // selected text color
            : "bg-white border border-sprout-color-border-weak"
        }`}
      ></div>

      <div className="border border-sprout-color-border-weak w-56 h-12 rounded-md flex items-center">
        <div className="flex items-center gap-3 ml-2">
          
          <div
            className={`w-5 h-5 rounded-full ${
              isSelected
                ? "bg-black"
                : "bg-white border border-sprout-color-border-weak"
            }`}
          ></div>

          {/* TEXT */}
          <div className="text-sprout-color-text-default ml-3">
            {color}
          </div>
        </div>
      </div>
    </div>
  );
};

const BackgroundColorItem = ({ color, isSelected }) => {
  return (
    <div className="flex items-center justify-between w-full mt-2">
      <div className="flex items-center gap-3">
        
        <div
          className={`w-6 h-6 rounded-full ${
            isSelected ? "ring-1 ring-sprout-color-border-weak" : "border border-sprout-color-border-weak"
          }`}
          style={{ backgroundColor: color }}
        ></div>

        {/* TEXT BOX */}
        <div className="border border-sprout-color-border-weak rounded-md w-48 h-12 flex items-center px-3">
          <div
            className={`w-5 h-5 rounded-full ${
              isSelected ? "ring-1 ring-sprout-color-border-weak" : "border border-sprout-color-border-weak"
            }`}
            style={{ backgroundColor: color }}
          ></div>

          <span className="text-sprout-color-text-default ml-3">{color}</span>
        </div>
      </div>

      {/* RIGHT SIDE 100% */}
      
    </div>
  );
};

