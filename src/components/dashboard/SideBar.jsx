'use client'
import React, { useState } from "react";

import { ChevronsUpDown } from 'lucide-react'
const SideBar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [secondActiveIndex, setSecondActiveIndex] = useState(null)
    const [ThirdActiveIndex, setThirdActiveIndex] = useState(null)
    const [isOpen, setIsOpen] = React.useState(false)

    const options = [
        {
            title: "Home",
            icon: (isActive) => (
                <svg
                    className="mt-0.5"
                    width="24"
                    height="24"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11.25 15.7507V9.75073C11.25 9.55182 11.171 9.36105 11.0303 9.2204C10.8897 9.07975 10.6989 9.00073 10.5 9.00073H7.5C7.30109 9.00073 7.11032 9.07975 6.96967 9.2204C6.82902 9.36105 6.75 9.55182 6.75 9.75073V15.7507"
                        stroke={isActive ? "#FFFDF9" : "#88827E"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M2.25 7.50182C2.24995 7.28363 2.2975 7.06804 2.38934 6.87011C2.48118 6.67218 2.6151 6.49667 2.78175 6.35582L8.03175 1.85582C8.30249 1.62701 8.64552 1.50146 9 1.50146C9.35448 1.50146 9.69751 1.62701 9.96825 1.85582L15.2183 6.35582C15.3849 6.49667 15.5188 6.67218 15.6107 6.87011C15.7025 7.06804 15.7501 7.28363 15.75 7.50182V14.2518C15.75 14.6496 15.592 15.0312 15.3107 15.3125C15.0294 15.5938 14.6478 15.7518 14.25 15.7518H3.75C3.35218 15.7518 2.97064 15.5938 2.68934 15.3125C2.40804 15.0312 2.25 14.6496 2.25 14.2518V7.50182Z"
                        stroke={isActive ? "#FFFDF9" : "#88827E"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            title: "Projects",
            icon: (isActive) => (
                <svg
                    className="mt-0.5"
                    width="24"
                    height="24"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M14.9985 7.50007H6.92853C6.65666 7.50637 6.39161 7.58646 6.16174 7.73178C5.93188 7.8771 5.74584 8.08218 5.62354 8.32507L4.49854 10.5001L2.08126 14.6869M14.9985 7.50007C15.2277 7.49967 15.4539 7.55177 15.6598 7.65238C15.8656 7.75299 16.0457 7.89944 16.1862 8.08047C16.3267 8.26151 16.4238 8.47232 16.4702 8.69674C16.5165 8.92115 16.5108 9.1532 16.4535 9.37507L15.2985 13.8751C15.215 14.1987 15.0257 14.4852 14.7607 14.689C14.4958 14.8929 14.1703 15.0023 13.836 15.0001H2.99854C2.66479 15.0001 2.34251 14.8888 2.08126 14.6869M14.9985 7.50007V6.00007C14.9985 5.60225 14.8405 5.22072 14.5592 4.93941C14.2779 4.65811 13.8964 4.50007 13.4985 4.50007H9.05103C8.8027 4.50003 8.55827 4.43834 8.33966 4.32052C8.12105 4.20271 7.93512 4.03247 7.79853 3.82507L7.19104 2.92507C7.05307 2.71554 6.86474 2.54396 6.64331 2.42604C6.42188 2.30811 6.1744 2.24761 5.92354 2.25007H2.99854C2.60071 2.25007 2.21918 2.40811 1.93787 2.68941C1.65657 2.97072 1.49854 3.35225 1.49854 3.75007V13.5001C1.49854 13.8979 1.65657 14.2794 1.93787 14.5607C1.98319 14.606 2.0311 14.6482 2.08126 14.6869"
                        stroke={isActive ? "#FFFDF9" : "#88827E"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            title: "Admin Settings",
            icon: (isActive) => (
                <svg
                    className="mt-0.5"
                    width="24"
                    height="24"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.2875 4.84639C5.49161 4.91824 5.70886 4.94508 5.92432 4.92505C6.13979 4.90503 6.34837 4.83863 6.53575 4.7304C6.72314 4.62218 6.88489 4.47469 7.0099 4.29806C7.13491 4.12143 7.22023 3.91985 7.26 3.70714L7.5 2.41714C8.48685 2.19233 9.51164 2.19233 10.4985 2.41714L10.74 3.70714C10.7798 3.91985 10.8651 4.12143 10.9901 4.29806C11.1151 4.47469 11.2769 4.62218 11.4642 4.7304C11.6516 4.83863 11.8602 4.90503 12.0757 4.92505C12.2911 4.94508 12.5084 4.91824 12.7125 4.84639L13.9492 4.41139C14.6377 5.15297 15.1506 6.03984 15.45 7.00639L14.4525 7.86139C14.2882 8.00221 14.1563 8.17691 14.0659 8.37349C13.9755 8.57007 13.9287 8.78389 13.9287 9.00027C13.9287 9.21664 13.9755 9.43046 14.0659 9.62704C14.1563 9.82363 14.2882 9.99832 14.4525 10.1391L15.45 10.9934C15.1506 11.9599 14.6377 12.8468 13.9492 13.5884L12.7117 13.1534C12.5076 13.0815 12.2904 13.0547 12.0749 13.0747C11.8595 13.0947 11.6509 13.1612 11.4635 13.2694C11.2761 13.3776 11.1144 13.5251 10.9893 13.7017C10.8643 13.8783 10.779 14.0799 10.7392 14.2926L10.5 15.5826C9.51314 15.8074 8.48835 15.8074 7.5015 15.5826L7.26 14.2926C7.22023 14.0799 7.13491 13.8783 7.0099 13.7017C6.88489 13.5251 6.72314 13.3776 6.53575 13.2694C6.34837 13.1612 6.13979 13.0947 5.92432 13.0747C5.70886 13.0547 5.49161 13.0815 5.2875 13.1534L4.05075 13.5884C3.36232 12.8468 2.84942 11.9599 2.55 10.9934L3.5475 10.1384C3.71165 9.99757 3.84342 9.82292 3.93375 9.62641C4.02409 9.4299 4.07086 9.21617 4.07086 8.99989C4.07086 8.78361 4.02409 8.56989 3.93375 8.37337C3.84342 8.17686 3.71165 8.00221 3.5475 7.86139L2.55 7.00639C2.8492 6.03991 3.36184 5.15304 4.05 4.41139L5.2875 4.84639ZM9 6.74989C9.59673 6.74989 10.169 6.98694 10.591 7.4089C11.0129 7.83086 11.25 8.40315 11.25 8.99989C11.25 9.59663 11.0129 10.1689 10.591 10.5909C10.169 11.0128 9.59673 11.2499 9 11.2499C8.40326 11.2499 7.83096 11.0128 7.409 10.5909C6.98705 10.1689 6.75 9.59663 6.75 8.99989C6.75 8.40315 6.98705 7.83086 7.409 7.4089C7.83096 6.98694 8.40326 6.74989 9 6.74989Z"
                        stroke={isActive ? "#FFFDF9" : "#88827E"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
    ];
    const options2 = [
        {
            title: "MarketPlace",
            icon: (isActive) => (

                <svg className="mt-0.5" width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        stroke={isActive ? "#FFFDF9" : "#88827E"}
                        d="M15.75 6.75V13.5C15.75 14.7426 14.7426 15.75 13.5 15.75H7.5M15.75 6.75H2.25M15.75 6.75V4.5C15.75 3.25736 14.7426 2.25 13.5 2.25H4.5C3.25736 2.25 2.25 3.25736 2.25 4.5V6.75M15.75 6.75H7.5M7.5 15.75H4.5C3.25736 15.75 2.25 14.7426 2.25 13.5V6.75M7.5 15.75V6.75M2.25 6.75H7.5" strokeWidth="1.5" />
                </svg>

            ),
        },

        {
            title: "Tutorials",
            icon: (isActive) => (

                <svg className="mt-0.5" width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.25 7.5L14.6647 5.793C14.7791 5.73588 14.9061 5.70891 15.0337 5.71466C15.1614 5.72041 15.2855 5.75869 15.3942 5.82585C15.5029 5.89302 15.5927 5.98686 15.6549 6.09845C15.7172 6.21005 15.7499 6.33571 15.75 6.4635V11.5365C15.7499 11.6643 15.7172 11.79 15.6549 11.9015C15.5927 12.0131 15.5029 12.107 15.3942 12.1741C15.2855 12.2413 15.1614 12.2796 15.0337 12.2853C14.9061 12.2911 14.7791 12.2641 14.6647 12.207L11.25 10.5V7.5ZM2.25 6C2.25 5.60218 2.40804 5.22064 2.68934 4.93934C2.97064 4.65804 3.35218 4.5 3.75 4.5H9.75C10.1478 4.5 10.5294 4.65804 10.8107 4.93934C11.092 5.22064 11.25 5.60218 11.25 6V12C11.25 12.3978 11.092 12.7794 10.8107 13.0607C10.5294 13.342 10.1478 13.5 9.75 13.5H3.75C3.35218 13.5 2.97064 13.342 2.68934 13.0607C2.40804 12.7794 2.25 12.3978 2.25 12V6Z" stroke={isActive ? "#FFFDF9" : "#88827E"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            ),
        },

    ];
    const options3 = [
        {
            title: "Billing",
            icon: (isActive) => (


                <svg className="mt-0.5" width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.88889 13.1572C6.39749 13.782 7.096 14.2238 7.87844 14.4157C9.64711 14.8738 11.3878 14.0688 11.7666 12.619C12.1453 11.1677 10.7764 9.58567 9.00856 9.12678C7.24067 8.66789 5.871 7.08667 6.24978 5.63611C6.62856 4.18556 8.36844 3.38133 10.1371 3.83944C10.9009 4.023 11.5916 4.45622 12.1111 5.07767M9.09411 14.544V16M9.09411 2V3.71111" stroke="#88827E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>


            ),
        },

        {
            title: "Settings",
            icon: (isActive) => (

                <svg className="mt-0.5" width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 15.75V10.5" stroke={isActive ? "#FFFDF9" : "#88827E"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 7.5V2.25" stroke={isActive ? "#FFFDF9" : "#88827E"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 15.75V9" stroke={isActive ? "#FFFDF9" : "#88827E"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 6V2.25" stroke={isActive ? "#FFFDF9" : "#88827E"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 15.75V12" stroke={isActive ? "#FFFDF9" : "#88827E"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 9V2.25" stroke={isActive ? "#FFFDF9" : "#88827E"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M0.75 10.5H5.25" stroke={isActive ? "#FFFDF9" : "#88827E"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.75 6H11.25" stroke={isActive ? "#FFFDF9" : "#88827E"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.75 12H17.25" stroke={isActive ? "#FFFDF9" : "#88827E"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>


            ),
        },

    ];
    return (
        <div className="w-60 bg-sprout-color-background-dark h-full flex flex-col p-4 text-white border-r border-[#3A2F2C]">

            <div className="border flex gap-2 cursor-pointer rounded-md border-sprout-color-border-dark-weak  p-3 mb-3">
                <img src="./j-icon.png" alt="" width={32} height={32} />
                <span className="text-[#FFFDF9] pt-0.5">Jainam.posimyth</span>
                <span className="text-[#FFFDF9] pt-0.5"><ChevronsUpDown strokeWidth={1} /></span>
            </div>
            {options.map((item, index) => (
                <div
                    key={index}
                    onClick={() => {
                        setActiveIndex(index)
                        setSecondActiveIndex(null)
                        setThirdActiveIndex(null)
                    }}
                    className={`flex gap-2 pl-3 mb-3 p-2 rounded-md cursor-pointer transition
            ${activeIndex === index
                            ? "bg-[#413735] border border-sprout-color-border-dark-weak "
                            : "hover:bg-sprout-color-border-dark-weak  bg-transparent"
                        }`}
                >
                    {item.icon(activeIndex === index)}
                    <h1
                        className={`text-lg font-normal ${activeIndex === index ? "text-[#FFFDF9]" : "text-sprout-color-text-disabled"
                            }`}
                    >
                        {item.title}
                    </h1>
                </div>


            ))}


            <div className="w-52  -ml-2 h-0.5 bg-sprout-color-border-dark-weak "></div>
            {options2.map((item, index) => (
                <div
                    key={index}
                    onClick={() => {
                        setSecondActiveIndex(index)
                        setActiveIndex(null)
                        setThirdActiveIndex(null)
                    }}
                    className={`flex gap-2 pl-3  p-2 mt-3 rounded-md cursor-pointer transition
            ${secondActiveIndex === index
                            ? "bg-[#413735] border border-sprout-color-border-dark-weak "
                            : "hover:bg-sprout-color-border-dark-weak /40 bg-transparent"
                        }`}
                >
                    {item.icon(secondActiveIndex === index)}
                    <h1
                        className={`text-lg font-normal ${secondActiveIndex === index ? "text-sprout-color-background-weaker" : "text-[#88827E]"
                            }`}
                    >
                        {item.title}
                    </h1>
                </div>


            ))}
            <div className="w-52 mt-3 -ml-2 h-0.5 bg-sprout-color-border-dark-weak "></div>
            {options3.map((item, index) => (
                <div
                    key={index}
                    onClick={() => {
                        setThirdActiveIndex(index)
                        setActiveIndex(null)
                        setSecondActiveIndex(null)
                    }}
                    className={`flex gap-2 pl-3  p-2 mt-3 rounded-md cursor-pointer transition
            ${ThirdActiveIndex === index
                            ? "bg-[#413735] border border-sprout-color-border-dark-weak "
                            : "hover:bg-sprout-color-border-dark-weak /40 bg-transparent"
                        }`}
                >
                    {item.icon(ThirdActiveIndex === index)}
                    <h1
                        className={`text-lg font-normal ${ThirdActiveIndex === index ? "text-sprout-color-background-weaker" : "text-[#88827E]"
                            }`}
                    >
                        {item.title}
                    </h1>
                </div>


            ))}
        </div>
    );
};

export default SideBar;
