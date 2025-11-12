import React from 'react'

const RecentProjects = ({title}) => {
  return (
  
  <div className="p-2 pt-3 cursor-pointer ">
    <div className="pb-3 border border-sprout-color-border-weak w-full rounded-xl">

    <img src="./thumbnail.png" alt="" className='w-full' />
  <div className="flex justify-between items-start">
      <h1 className="text-sprout-color-text-default p-2 pl-4 ">{title}</h1>
            <div className="text-sprout-color-text-default flex gap-1 p-3 font-normal text-sm ">
                
          <svg className="mt-1" width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_428_4801)">
          <path d="M5.00001 9.16665C7.3012 9.16665 9.16668 7.30117 9.16668 4.99998C9.16668 2.69879 7.3012 0.833313 5.00001 0.833313C2.69882 0.833313 0.833344 2.69879 0.833344 4.99998C0.833344 7.30117 2.69882 9.16665 5.00001 9.16665Z" stroke="#88827E" strokeWidth="0.833333" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 2.5V5L6.66667 5.83333" stroke="#88827E" strokeWidth="0.833333" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <defs>
          <clipPath id="clip0_428_4801">
          <rect width="10" height="10" fill="white"/>
          </clipPath>
          </defs>
          </svg>

      <h1> 5 days ago</h1>         
               </div>
  </div>
    
   <div className="flex gap-1 pt-4 ">
     <span className="flex gap-1 pl-4">
        
<svg className="mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_428_4901)">
<path d="M7.9987 14.6673C11.6806 14.6673 14.6654 11.6825 14.6654 8.00065C14.6654 4.31875 11.6806 1.33398 7.9987 1.33398C4.3168 1.33398 1.33203 4.31875 1.33203 8.00065C1.33203 11.6825 4.3168 14.6673 7.9987 14.6673Z" stroke="#88827E" strokeWidth="1.06667" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M1.33203 8H14.6654" stroke="#88827E" strokeWidth="1.06667" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.9987 1.33398C9.66622 3.15955 10.6139 5.52867 10.6654 8.00065C10.6139 10.4726 9.66622 12.8417 7.9987 14.6673C6.33118 12.8417 5.38353 10.4726 5.33203 8.00065C5.38353 5.52867 6.33118 3.15955 7.9987 1.33398Z" stroke="#88827E" strokeWidth="1.06667" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_428_4901">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
<p className="font-normal text-sm"> EN</p >
<span className="inline-block w-2 h-2 mt-1.5 ml-1 bg-gray-300 rounded-full"></span>
    </span>
        <span className="flex gap-1 pl-1">
        

<svg className="mt-0.5" width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.41666 0.833313H2.49999C2.27898 0.833313 2.06701 0.92111 1.91073 1.07739C1.75445 1.23367 1.66666 1.44563 1.66666 1.66665V8.33331C1.66666 8.55433 1.75445 8.76629 1.91073 8.92257C2.06701 9.07885 2.27898 9.16665 2.49999 9.16665H7.49999C7.721 9.16665 7.93296 9.07885 8.08925 8.92257C8.24553 8.76629 8.33332 8.55433 8.33332 8.33331V3.74998L5.41666 0.833313Z" stroke="#88827E" strokeWidth="0.833333" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5.41666 0.833313V3.74998H8.33332" stroke="#88827E" strokeWidth="0.833333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

<p className="font-normal text-sm"> 5 pages</p >

    </span>
   
   </div>

    </div>
 

        </div>
  )
}

export default RecentProjects