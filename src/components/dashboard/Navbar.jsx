import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button'

const Navbar = () => {
    return (
        <div className="h-16  bg-sprout-color-background-dark flex items-center justify-between px-6 border-b border-[#3A2F2C]">
       <div className='border-2 cursor-pointer   border-sprout-color-border-dark-weak  px-3 py-2 rounded-lg'>
                <svg width="16" height="24" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.85185 16.26C4.42798 16.8141 5.14403 17.0911 6 17.0911C6.85597 17.0911 7.57202 16.8141 8.14815 16.26C8.72428 15.6896 9.01235 14.9482 9.01235 14.0356C9.01235 13.1556 8.72428 12.4385 8.14815 11.8845C7.57202 11.3304 6.85597 11.0534 6 11.0534C5.14403 11.0534 4.42798 11.3304 3.85185 11.8845C3.27572 12.4385 2.98765 13.1556 2.98765 14.0356C2.98765 14.9482 3.27572 15.6896 3.85185 16.26ZM10.2469 18.3378C9.09465 19.4459 7.67901 20 6 20C4.32099 20 2.89712 19.4459 1.7284 18.3378C0.576132 17.2296 0 15.7956 0 14.0356C0 12.2756 0.576132 10.8497 1.7284 9.75782C2.89712 8.66597 4.32099 8.12004 6 8.12004C7.67901 8.12004 9.09465 8.66597 10.2469 9.75782C11.4156 10.8497 12 12.2756 12 14.0356C12 15.7956 11.4156 17.2296 10.2469 18.3378Z" fill="#FFFDF9" />
                    <path d="M2.78487 5.78635C2.75508 5.81131 2.70986 5.78691 2.7149 5.74859L3.40127 0.532099C3.40615 0.494966 3.45377 0.481965 3.47719 0.511369L6.72116 4.58392C6.74465 4.6134 6.72059 4.65631 6.68289 4.65216L4.45248 4.40696C4.44081 4.40568 4.42912 4.4092 4.42016 4.41671L2.78487 5.78635Z" fill="#FFFDF9" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.98168 0.37666C3.03157 -0.00254377 3.51785 -0.135305 3.75703 0.164963L7.12706 4.39578C7.36686 4.69683 7.12117 5.13496 6.73625 5.09264L4.65391 4.86372C4.60206 4.85802 4.55012 4.87369 4.51029 4.90704L2.9825 6.18665C2.67825 6.44148 2.21646 6.19239 2.26796 5.80106M2.26796 5.80106L2.98168 0.37666L2.26796 5.80106ZM3.57698 1.0162L3.01523 5.28556L4.26683 4.23728C4.32558 4.18808 4.40219 4.16496 4.47868 4.17337L6.24662 4.36773L3.57698 1.0162Z" fill="#FFFDF9" />
                    <path d="M9.41699 5.38739H10.703V5.89664H9.41699V7.16979H8.90259V5.89664H7.61658V5.38739H8.90259V4.11424H9.41699V5.38739Z" fill="#FFFDF9" />
                </svg>

            </div>
            <div className='bg-sprout-color-border-dark-weak   ml-20 md:ml-38 flex w-56 md:w-96 rounded-md'>
                <div className='md:pl-8  pt-2 ml-4 md:ml-24'>

                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.9" d="M15.75 15.75L12.75 12.75M14.25 8.25C14.25 9.8413 13.6179 11.3674 12.4926 12.4926C11.3674 13.6179 9.8413 14.25 8.25 14.25C6.6587 14.25 5.13258 13.6179 4.00736 12.4926C2.88214 11.3674 2.25 9.8413 2.25 8.25C2.25 6.6587 2.88214 5.13258 4.00736 4.00736C5.13258 2.88214 6.6587 2.25 8.25 2.25C9.8413 2.25 11.3674 2.88214 12.4926 4.00736C13.6179 5.13258 14.25 6.6587 14.25 8.25Z" stroke="#D7D3C9" strokeWidth="1.125" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </div>
                <Input type="email" placeholder="Search Project" className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full  focus:outline-none placeholder:text-sprout-color-border-weak" />
            </div>
            <div className='md:flex hidden gap-3 '>
               <Button className="bg-sprout-color-background-dark hover:bg-sprout-color-background-dark cursor-pointer text-[#88827E]">
                Feedback
               </Button>
               <div className="bg-sprout-color-background-dark hover:bg-sprout-color-background-dark p-2 rounded-md cursor-pointer border border-sprout-color-border-dark-weak ">

<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7615 9.1423H12.1901L10.6663 11.428H7.61868L6.09487 9.1423H1.52344" stroke="#88827E" strokeWidth="1.14286" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.15201 3.89203L1.52344 9.14156V13.713C1.52344 14.1171 1.68398 14.5047 1.96975 14.7905C2.25552 15.0763 2.64311 15.2368 3.04725 15.2368H15.2377C15.6419 15.2368 16.0294 15.0763 16.3152 14.7905C16.601 14.5047 16.7615 14.1171 16.7615 13.713V9.14156L14.133 3.89203C14.0068 3.63816 13.8123 3.42451 13.5714 3.2751C13.3305 3.1257 13.0526 3.04647 12.7692 3.04632H5.51582C5.23233 3.04647 4.9545 3.1257 4.71357 3.2751C4.47264 3.42451 4.27816 3.63816 4.15201 3.89203Z" stroke="#88827E" strokeWidth="1.14286" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

               </div>
                   <div className="bg-sprout-color-background-dark hover:bg-sprout-color-background-dark p-2 rounded-md cursor-pointer border border-sprout-color-border-dark-weak ">


<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.1401 12.9524V12.96M2.28296 9.14286C2.28296 10.0433 2.46032 10.935 2.80493 11.767C3.14953 12.5989 3.65462 13.3548 4.29137 13.9916C4.92811 14.6283 5.68404 15.1334 6.51599 15.478C7.34793 15.8226 8.23961 16 9.1401 16C10.0406 16 10.9323 15.8226 11.7642 15.478C12.5962 15.1334 13.3521 14.6283 13.9888 13.9916C14.6256 13.3548 15.1307 12.5989 15.4753 11.767C15.8199 10.935 15.9972 10.0433 15.9972 9.14286C15.9972 8.24236 15.8199 7.35069 15.4753 6.51874C15.1307 5.68679 14.6256 4.93087 13.9888 4.29412C13.3521 3.65738 12.5962 3.15229 11.7642 2.80768C10.9323 2.46308 10.0406 2.28571 9.1401 2.28571C8.23961 2.28571 7.34793 2.46308 6.51599 2.80768C5.68404 3.15229 4.92811 3.65738 4.29137 4.29412C3.65462 4.93087 3.14953 5.68679 2.80493 6.51874C2.46032 7.35069 2.28296 8.24236 2.28296 9.14286Z" stroke="#88827E" strokeWidth="1.14286" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.14161 10.2844C9.12758 10.037 9.1943 9.79182 9.33172 9.58569C9.46913 9.37957 9.66981 9.22367 9.90351 9.14149C10.1899 9.03198 10.4469 8.85748 10.6544 8.63174C10.8619 8.40601 11.0142 8.13519 11.0992 7.84061C11.1842 7.54603 11.1997 7.23574 11.1444 6.93415C11.0892 6.63257 10.9647 6.34793 10.7807 6.10265C10.5967 5.85736 10.3584 5.65813 10.0843 5.52063C9.81026 5.38313 9.50804 5.31112 9.20144 5.31027C8.89483 5.30942 8.59222 5.37976 8.31741 5.51573C8.04261 5.65171 7.80312 5.84961 7.6178 6.09387" stroke="#88827E" strokeWidth="1.14286" strokeLinecap="round" strokeLinejoin="round"/>
</svg>


               </div>
            </div>

        </div>
    )
}

export default Navbar