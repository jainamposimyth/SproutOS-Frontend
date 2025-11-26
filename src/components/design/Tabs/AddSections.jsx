'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const AddSections = () => {
    return (
        <div className='p-4 bg-[#FFFDF9] border min-h-screen w-72'>
            <div className='p-2 pt-3 flex gap-3 items-center'>

                <h1 className='text-xl text-sprout-color-text-default'>
                    Add Section
                </h1>
            </div>
            <div className='flex pt-4 gap-3'>

                <div className='bg-sprout-color-background-weaker border border-sprout-color-border-weak text-sprout-color-text-weakest   flex w-56 md:w-56 rounded-md'>
                    <div className='pl-4 pt-0.5'>


                        <svg className='mt-2' width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#6F6765" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.9986 13.9991L11.0986 11.0991" stroke="#6F6765" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>


                    </div>
                    <Input
                        type="text"

                        placeholder="Search sections"
                        className=" placeholder:pt-1 border-none focus-visible:ring-0 focus-visible:ringOffset-0 w-36  focus:outline-none placeholder:text-sprout-color-text-weakest placeholder:text-md"
                    />

                </div>
                <div className='p-2 rounded-md bg-sprout-color-background-weaker border border-sprout-color-border-weak text-sprout-color-text-weakest '>

                    <svg className='mt-0.5' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.1663 8.00009H5.92967M3.02234 8.00009H1.83301M3.02234 8.00009C3.02234 7.61464 3.17546 7.24498 3.44801 6.97243C3.72057 6.69987 4.09023 6.54676 4.47567 6.54676C4.86112 6.54676 5.23078 6.69987 5.50334 6.97243C5.77589 7.24498 5.92901 7.61464 5.92901 8.00009C5.92901 8.38554 5.77589 8.7552 5.50334 9.02775C5.23078 9.3003 4.86112 9.45342 4.47567 9.45342C4.09023 9.45342 3.72057 9.3003 3.44801 9.02775C3.17546 8.7552 3.02234 8.38554 3.02234 8.00009ZM14.1663 12.4048H10.3343M10.3343 12.4048C10.3343 12.7903 10.1809 13.1604 9.90824 13.433C9.63562 13.7056 9.26588 13.8588 8.88034 13.8588C8.49489 13.8588 8.12523 13.705 7.85268 13.4324C7.58013 13.1599 7.42701 12.7902 7.42701 12.4048M10.3343 12.4048C10.3343 12.0192 10.1809 11.6498 9.90824 11.3772C9.63562 11.1046 9.26588 10.9514 8.88034 10.9514C8.49489 10.9514 8.12523 11.1045 7.85268 11.3771C7.58013 11.6496 7.42701 12.0193 7.42701 12.4048M7.42701 12.4048H1.83301M14.1663 3.59542H12.0963M9.18901 3.59542H1.83301M9.18901 3.59542C9.18901 3.20998 9.34213 2.84031 9.61468 2.56776C9.88723 2.29521 10.2569 2.14209 10.6423 2.14209C10.8332 2.14209 11.0222 2.17968 11.1985 2.25272C11.3748 2.32576 11.535 2.43281 11.67 2.56776C11.805 2.70272 11.912 2.86293 11.985 3.03926C12.0581 3.21558 12.0957 3.40457 12.0957 3.59542C12.0957 3.78628 12.0581 3.97526 11.985 4.15159C11.912 4.32792 11.805 4.48813 11.67 4.62308C11.535 4.75804 11.3748 4.86509 11.1985 4.93813C11.0222 5.01116 10.8332 5.04876 10.6423 5.04876C10.2569 5.04876 9.88723 4.89564 9.61468 4.62308C9.34213 4.35053 9.18901 3.98087 9.18901 3.59542Z" stroke="black" strokeMiterlimit="10" strokeLinecap="round" />
                    </svg>

                </div>  </div>
            <div className='w-full h-[1px] bg-[#D7D5D2] mt-5'></div>
            <div className='border flex  border-sprout-color-border-weak rounded-md p-1 ml-5 mt-5 w-4/5 '>
                <Button className="border border-sprout-color-secondary bg-sprout-color-secondary-lightest hover:bg-sprout-color-secondary-lightest text-sprout-color-secondary" >
                    All

                </Button>
                <Button className="text-sprout-color-text-disabled bg-white hover:bg-white ">

                    Global

                </Button>
                <Button className="text-sprout-color-text-disabled bg-white hover:bg-white ">
                    Saved
                </Button>
            </div>
            <div>
                <h1 className='text-lg ml-2 text-sprout-color-text-disabled mt-5'>
                    Global Sections
                </h1>
                <div className='pt-2 grid grid-cols-2 gap-4 '>
                    <div className='border border-sprout-color-border-weak rounded-md w-[120px] h-[120px]'>
                        <div className='bg-sprout-color-background-strongest'>
                            <img className='ml-5' width={70} height={70} src="/sectionThumbnail.png" alt="" srcset="" />
                           
                        </div>
                        <h1 className='text-sprout-color-text-default font-[500] ml-6 mt-1'>Navbar</h1>
                    </div>
                    <div className='border border-sprout-color-border-weak rounded-md w-[120px] h-[120px]'>
                        <div className='bg-sprout-color-background-strongest'>
   <img className='ml-5' width={70} height={70} src="/sectionThumbnail.png" alt="" srcset="" />
   
                        </div>
                          <h1 className='text-sprout-color-text-default font-[500] ml-6 mt-1'>Navbar</h1>
                    </div>
                    <div className='border border-sprout-color-border-weak rounded-md w-[120px] h-[120px]'>
                        <div className='bg-sprout-color-background-strongest'>
          <img className='ml-5' width={70} height={70} src="/sectionThumbnail.png" alt="" srcset="" />
                        </div>
                          <h1 className='text-sprout-color-text-default font-[500] ml-6 mt-1'>Navbar</h1>
                    </div>
                </div>
            </div>
        </div>




    )
}

export default AddSections