'use client'
import React from 'react'
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

const StyleGuide = () => {
  return (
    <main className="bg-[#FFFDFA]  text-black flex-1 overflow-y-auto rounded-t-xl">
      <div className='h-full w-80 border p-6 overflow-x-auto '>
        <div className='text-xl font-[500] text-sprout-color-text-default'>
          Section
        </div>
        <div className='flex flex-col pt-6 gap-6'>
          <Button className="bg-sprout-color-secondary-lightest cursor-pointer border border-sprout-color-secondary hover:bg-sprout-color-secondary-lightest text-sprout-color-secondary">

            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.93164 12.9805C10.2078 12.9805 10.4316 13.2043 10.4316 13.4805C10.4316 13.7566 10.2078 13.9805 9.93164 13.9805H4.02734C3.7512 13.9805 3.52734 13.7566 3.52734 13.4805C3.52734 13.2043 3.7512 12.9805 4.02734 12.9805H9.93164ZM8.79395 0.139648C8.99308 -0.0515678 9.3097 -0.0457196 9.50098 0.15332C9.69223 0.352487 9.68547 0.669085 9.48633 0.860352L8.22266 2.07422H12.1641C13.1364 2.07438 13.9598 2.83626 13.96 3.81836V10.6631C13.9599 11.6453 13.1365 12.4071 12.1641 12.4072H1.7959C0.884287 12.4071 0.103869 11.7377 0.00976562 10.8447L0 10.6631V3.81836C0.000171625 2.83624 0.82354 2.07436 1.7959 2.07422H5.7373L4.47363 0.860352C4.27482 0.669077 4.26888 0.352389 4.45996 0.15332C4.65125 -0.0455248 4.96792 -0.0514958 5.16699 0.139648L6.97949 1.88086L8.79395 0.139648ZM1.7959 3.07422C1.33724 3.07436 1.00018 3.42634 1 3.81836V10.6631L1.00391 10.7363C1.04273 11.098 1.36589 11.4071 1.7959 11.4072H12.1641C12.6228 11.4071 12.9599 11.0552 12.96 10.6631V3.81836C12.9598 3.42635 12.6227 3.07438 12.1641 3.07422H1.7959Z" fill="#695BE8" />
            </svg>
            Pitch Concepts
          </Button>

          <div>
            <div className='text-md font-[500] text-sprout-color-text-default'>
              Concepts
            </div>
            <Select>
              <SelectTrigger className="w-[270px] mt-4 border border-sprout-color-border-weak ">
                <SelectValue placeholder="Concept - 1" />
              </SelectTrigger>
            </Select>
          </div>

        </div>
        <div className='inline-block h-[1px] w-full bg-[#D7D5D2]'>

        </div>

        <div className='mt-3'>
          <div className='text-md font-[500] text-sprout-color-text-default'>
            Colors
          </div>
          <div className='border rounded-md mt-4 border-sprout-color-border-weak w-68 h-80'>

          </div>
          <Button className="bg-sprout-color-secondary-lightest cursor-pointer border w-full mt-4 border-sprout-color-secondary hover:bg-sprout-color-secondary-lightest text-sprout-color-secondary">


            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3.33203V12.6654" stroke="#695BE8" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.33203 8H12.6654" stroke="#695BE8" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            Add Colors
          </Button>

        </div>
        <div className='inline-block h-[1px] mt-1 w-full bg-[#D7D5D2]'>

        </div>
        <div className='mt-3'>
          <div className='text-md font-[500] text-sprout-color-text-default'>
            Typography
          </div>
          <div className='border rounded-md mt-4 border-sprout-color-border-weak w-68 h-52'>

          </div>
        </div>
        <div className='inline-block h-[1px] mt-1 w-full bg-[#D7D5D2]'>

        </div>

        <div className='mt-3'>
          <div className='text-lg font-[500] text-sprout-color-text-default'>
            UI Styling
          </div>
          <div className='border rounded-md mt-4 border-sprout-color-border-weak w-68 h-44'>
            <div className='flex justify-between items-start p-3'>
              <div className='text-md font-[500] text-sprout-color-text-default '>
                Buttons & Forms
              </div>
              <div className='border rounded-sm cursor-pointer border-sprout-color-border-weak'>

                <svg className='p-1' width="24" height="24" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_542_5244)">
                    <path d="M7.91667 4.57812H2.08333C1.6231 4.57812 1.25 4.95122 1.25 5.41146V8.32813C1.25 8.78836 1.6231 9.16146 2.08333 9.16146H7.91667C8.3769 9.16146 8.75 8.78836 8.75 8.32813V5.41146C8.75 4.95122 8.3769 4.57812 7.91667 4.57812Z" stroke="#413735" strokeWidth="0.833333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.91797 4.57812V2.91146C2.91797 2.35892 3.13746 1.82902 3.52816 1.43832C3.91886 1.04762 4.44877 0.828125 5.0013 0.828125C5.55384 0.828125 6.08374 1.04762 6.47444 1.43832C6.86514 1.82902 7.08464 2.35892 7.08464 2.91146V4.57812" stroke="#413735" strokeWidth="0.833333" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_542_5244">
                      <rect width="10" height="10" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

              </div>

            </div>
            <div className='p-3 flex gap-4'>
              <Button className='bg-[#004AEC] hover:bg-[#004AEC] text-white cursor-pointer w-28 h-10'>Button</Button>
              <Button className='bg-transparent border-[#7878784D] border text-black cursor-pointer w-28 h-10'>Button</Button>
            </div>
            <div className='pl-3 pt-1'>
              <Input placeholder=" Placeholder" className="w-60 " />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default StyleGuide