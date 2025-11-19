'use client'
import React,{useState} from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from '@/components/ui/shadcn-io/color-picker';
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const StyleGuide = () => {
    //  const selectedColor = "#004AEC";
const [selectedTextColor, setSelectedTextColor] = useState("#000000"); 
const [selectedBgColor, setSelectedBgColor] = useState("#FFFFFF");
const [selectedColor, setSelectedColor] = useState("#004AEC");
  return (
<main className="bg-[#FFFDFA] text-black flex-1 min-h-screen  rounded-t-xl">
  <div className="flex flex-row ">
  <div className="w-[350px] border-r p-6 flex flex-col gap-6">
        <div className='text-xl font-[500] text-sprout-color-text-default'>
          Style guide
        </div>
        <div className='flex flex-col pt-2 gap-3'>
             <Select>
              <SelectTrigger className="w-[300px] p-3 mt-4 border border-sprout-color-border-weak ">
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
          <TabsTrigger className="cursor-pointer bg-transparent shdadow-none rounded-md text-sprout-color-text-disabled ml-3 p-2" value="typography"  >Typography</TabsTrigger>
          <TabsTrigger className="cursor-pointer bg-transparent shdadow-none rounded-md text-sprout-color-text-disabled ml-3 p-2" value="effects">Effects</TabsTrigger>
      </TabsList>
      <TabsContent value="colors" className="border-none">
 <div className='mt-6'>
          <div className='text-md font-[500] text-sprout-color-text-default'>
           Brand Colors
          </div>

{/* <ColorPicker
  value={selectedColor}
  onValueChange={setSelectedColor}
  className="max-w-sm rounded-md border bg-background p-4 shadow-sm"
>
   <ColorPickerSelection />
   <div className="flex items-center gap-4">
     <ColorPickerEyeDropper />
     <div className="grid w-full gap-1">
       <ColorPickerHue />
       <ColorPickerAlpha />
     </div>
   </div>
   <div className="flex items-center gap-2">
     <ColorPickerOutput />
     <ColorPickerFormat />
   </div>
 </ColorPicker>
   */}

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
      <TabsContent value="typography" >


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
  
        <div className="flex-1 p-6 w-[550px] overflow-hidden border-r"> 
            <div className='text-xl font-[500] text-sprout-color-text-default'>
          Component Example
        </div>
           <div className='inline-block h-[1px] mt-1 w-full bg-[#D7D5D2]'></div>
            <div className='text-md font-[500] pt-5 text-sprout-color-text-default'>
       Color Palette
        </div>
       <div className="pt-4 grid grid-cols-2 gap-6">
  <div className="relative">
    <div className="w-[196px] h-[80px] bg-[#004AEC] rounded-md"></div>
    <div className="absolute top-7 left-12 text-white font-medium">
      Foreground
    </div>
    <div className="pl-2 pt-2">Primary</div>
  </div>

  <div className="relative">
    <div className="w-[196px] h-[80px] border border-sprout-color-border-weak rounded-md"></div>
    <div className="absolute top-7 left-12 text-black font-medium">
      Foreground
    </div>
    <div className="pl-2 pt-2">Secondary</div>
  </div>

  <div className="relative">
    <div className="w-[196px] h-[80px] border border-sprout-color-border-weak rounded-md"></div>
    <div className="absolute top-7 left-12 text-black font-medium">
      Foreground
    </div>
    <div className="pl-2 pt-2">Primary</div>
  </div>

  <div className="relative">
    <div className="w-[196px] h-[80px] border border-sprout-color-border-weak rounded-md"></div>
    <div className="absolute top-7 left-12 text-black font-medium">
      Foreground
    </div>
    <div className="pl-2 pt-2">Secondary</div>
  </div>
</div>
           <div className='inline-block h-[1px] mt-1 w-full bg-[#D7D5D2]'></div>
<div className="">
     <div className='text-lg font-[500] pt-5 text-sprout-color-text-default'>
       Buttons
        </div>
        <div className=" gap-4 flex p-3"> 
           <Button className="bg-[#004AEC] hover:bg-[#004AEC] cursor-pointer p-4 px-7 py-5 font-semibold">Primary</Button> 
              <Button className="text-black  bg-white border hover:bg-white cursor-pointer p-4 px-7 py-5 font-semibold">Secondary</Button> 
              <Button variant="ghost" className="font-semibold">Ghost</Button>
                       <Button variant="link" className="underline font-semibold">Link</Button>
        </div>
</div>

<div className="pt-4 mb-3">
<Input
  placeholder="Enter your email"
  className="
    bg-[#F6F6F6]
  px-5 py-4
    border border-[#7878784D]
    focus:outline-none 
    focus:ring-0 
    focus:ring-offset-0 
    focus:border-none 
    hover:border-none 
    focus-visible:ring-0
  "
/>

</div>
<div className='inline-block h-[1px] mt-4 w-full bg-[#D7D5D2]'></div>
<div>
   <div className='text-xl font-[500] pt-5 text-sprout-color-text-default'>
         Cards & Images
        </div>
        <div className="grid grid-cols-3 gap-4 pt-6">
          <div>
            <img src="/frame3.png" className="h-full"/>
          </div>
       <div className="p-1 border flex flex-col items-center">
  <img src="/frame4.png" className="w-44" />

  <div className=" p-2 w-44 text-center">
    <div className="text-sm whitespace-nowrap">
      Ethereal Summit Vista
    </div>

    <p className="text-xs font-light">
      The tranquil vista of twilight paints the sky with hues of amber, rose, and lavender.
    </p>
  </div>
</div>

<div className="p-1 relative border flex flex-col items-center">

<div className="absolute top-5 left-4 bg-[#F6F6F6] p-2">
  <svg className="" width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_645_2793)">
<path d="M6.50776 3.90285C6.93508 2.65233 8.66294 2.61445 9.16958 3.78923L9.21245 3.90356L9.78912 5.58998C9.92128 5.97674 10.1348 6.33065 10.4154 6.62786C10.696 6.92506 11.037 7.15864 11.4155 7.31284L11.5706 7.37072L13.257 7.94668C14.5075 8.374 14.5454 10.1019 13.3713 10.6085L13.257 10.6514L11.5706 11.228C11.1837 11.3601 10.8296 11.5736 10.5323 11.8542C10.235 12.1348 10.0013 12.4759 9.847 12.8544L9.78912 13.0088L9.21317 14.6959C8.78585 15.9464 7.05798 15.9843 6.55206 14.8102L6.50776 14.6959L5.9318 13.0095C5.79973 12.6226 5.58621 12.2686 5.30564 11.9712C5.02507 11.6739 4.68399 11.4402 4.30541 11.2859L4.15106 11.228L2.46464 10.6521C1.21341 10.2248 1.17553 8.4969 2.35031 7.99098L2.46464 7.94668L4.15106 7.37072C4.53782 7.23856 4.89173 7.025 5.18894 6.74444C5.48614 6.46388 5.71972 6.12284 5.87392 5.74433L5.9318 5.58998L6.50776 3.90285ZM13.5771 1.43896C13.7108 1.43896 13.8418 1.47646 13.9553 1.5472C14.0687 1.61794 14.16 1.71908 14.2188 1.83913L14.2531 1.92274L14.5032 2.6559L15.2371 2.906C15.3711 2.95152 15.4885 3.03578 15.5746 3.14812C15.6606 3.26045 15.7113 3.39579 15.7204 3.537C15.7294 3.6782 15.6963 3.81891 15.6253 3.94128C15.5543 4.06366 15.4485 4.1622 15.3214 4.22441L15.2371 4.25871L14.5039 4.50881L14.2538 5.24269C14.2082 5.37663 14.1239 5.49401 14.0115 5.57997C13.8992 5.66593 13.7638 5.7166 13.6226 5.72555C13.4814 5.73451 13.3407 5.70134 13.2184 5.63027C13.0961 5.55919 12.9976 5.4534 12.9354 5.3263L12.9011 5.24269L12.651 4.50953L11.9172 4.25943C11.7832 4.21391 11.6657 4.12965 11.5797 4.01731C11.4937 3.90498 11.4429 3.76964 11.4339 3.62843C11.4249 3.48723 11.458 3.34652 11.529 3.22415C11.6 3.10177 11.7057 3.00323 11.8328 2.94102L11.9172 2.90672L12.6503 2.65662L12.9004 1.92274C12.9486 1.78155 13.0398 1.65899 13.1611 1.57223C13.2825 1.48548 13.4279 1.43888 13.5771 1.43896Z" fill="#88827E"/>
</g>
<defs>
<clipPath id="clip0_645_2793">
<rect width="17.15" height="17.15" fill="white"/>
</clipPath>
</defs>
</svg>

</div>
 <div className=" -ml-2 absolute bottom-0 left-0  text-center">
    <div className="text-sm whitespace-nowrap">
      Ethereal Summit Vista
    </div>

    <p className="text-xs font-light p-2">
      The tranquil vista of twilight paints the sky with hues of amber, rose, and lavender.
    </p>
  </div>
</div>


        </div>
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

