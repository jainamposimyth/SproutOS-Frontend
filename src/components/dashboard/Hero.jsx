'use client'
import SideBar from "./SideBar"
import Navbar from "./Navbar"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import RecentProjects from "./RecentProjects"

const Hero = () => {
  const CTAButtons = [
    {
      title: "Digital Agency",

    }, {
      title: "E Commerce",
    },
    {
      title: "Real Estate",

    }, {
      title: "Blog",
    },
    {
      title: "Food & Drinks",

    }, {
      title: "Portfolio",
    },
    {
      title: "Non Profit"
    }
  ]

  return (
    <div className="flex flex-col h-screen bg-[#F9F7F3] text-white">

      <Navbar />


      <div className="flex flex-1 min-h-0">
        <SideBar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="flex flex-col items-center justify-start pt-8 md:pt-16 lg:pt-24">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center text-neutral-800 dark:text-white px-4">
              What do you want to Build?
            </h1>

            <div className="relative w-full md:w-4/5 max-w-3xl mt-4 md:mt-6 lg:mt-8 px-4 md:px-0">
              <textarea
                id="description"
                placeholder=" "
                className="peer w-full border border-gray-400 bg-[#F5F3EB] rounded-md text-black placeholder-transparent px-3 md:px-4 pt-4 md:pt-6 text-sm md:text-base focus:outline-none focus:border-black h-24 md:h-28 lg:h-32 resize-none"
              />
              <label
                htmlFor="description"
                className="absolute left-7 md:left-4 top-3 md:top-4 text-sm md:text-base text-[#88827E] transition-all
             peer-placeholder-shown:opacity-100
             peer-focus:opacity-0 peer-focus:hidden"
              >
                Describe your project...
              </label>

              <div className="absolute left-3 md:left-4 bottom-2 md:bottom-3 flex flex-col sm:flex-row gap-2 md:gap-3">
                <Button className="cursor-pointer bg-[#F5F3EB] border border-[#D7D3C9] hover:bg-[#F5F3EB] text-[#574E4C] text-xs md:text-sm px-2 md:px-4 h-8 md:h-10">

                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-4 md:h-4">
                    <path d="M4.99906 3.73398L3.3324 4.66732L4.26573 3.00065L3.3324 1.33398L4.99906 2.26732L6.66573 1.33398L5.7324 3.00065L6.66573 4.66732L4.99906 3.73398ZM12.9991 10.2673L14.6657 9.33398L13.7324 11.0007L14.6657 12.6673L12.9991 11.734L11.3324 12.6673L12.2657 11.0007L11.3324 9.33398L12.9991 10.2673ZM14.6657 1.33398L13.7324 3.00065L14.6657 4.66732L12.9991 3.73398L11.3324 4.66732L12.2657 3.00065L11.3324 1.33398L12.9991 2.26732L14.6657 1.33398ZM8.8924 8.52065L10.5191 6.89398L9.10573 5.48065L7.47906 7.10732L8.8924 8.52065ZM9.57906 4.86065L11.1391 6.42065C11.3991 6.66732 11.3991 7.10065 11.1391 7.36065L3.35906 15.1407C3.09906 15.4007 2.66573 15.4007 2.41906 15.1407L0.859062 13.5807C0.599063 13.334 0.599063 12.9007 0.859062 12.6407L8.63906 4.86065C8.89906 4.60065 9.3324 4.60065 9.57906 4.86065Z" fill="#6F6765" />
                  </svg>

                  <span className="hidden sm:inline">Prompt Builder</span>
                  <span className="sm:hidden">Builder</span>
                </Button>
                <Button className="cursor-pointer bg-[#F5F3EB] border border-[#D7D3C9] hover:bg-[#F5F3EB] text-[#574E4C] text-xs md:text-sm px-2 md:px-4 h-8 md:h-10">


                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-4 md:h-4">
                    <g clipPath="url(#clip0_428_4901)">
                      <path d="M7.9987 14.6673C11.6806 14.6673 14.6654 11.6825 14.6654 8.00065C14.6654 4.31875 11.6806 1.33398 7.9987 1.33398C4.3168 1.33398 1.33203 4.31875 1.33203 8.00065C1.33203 11.6825 4.3168 14.6673 7.9987 14.6673Z" stroke="#88827E" strokeWidth="1.06667" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1.33203 8H14.6654" stroke="#88827E" strokeWidth="1.06667" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7.9987 1.33398C9.66622 3.15955 10.6139 5.52867 10.6654 8.00065C10.6139 10.4726 9.66622 12.8417 7.9987 14.6673C6.33118 12.8417 5.38353 10.4726 5.33203 8.00065C5.38353 5.52867 6.33118 3.15955 7.9987 1.33398Z" stroke="#88827E" strokeWidth="1.06667" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_428_4901">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  English
                </Button>

              </div>

              <Button className="cursor-pointer absolute bottom-2 md:bottom-3 right-2 bg-[#695BE8] border hover:bg-[#695BE8] text-[#FFFDF9] text-xs md:text-sm px-3 md:px-4 h-8 md:h-10">



                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-4 md:h-4">
                  <g clipPath="url(#clip0_428_4907)">
                    <circle cx="7.99609" cy="8" r="7.55556" stroke="#FFFDF9" strokeWidth="0.888889" />
                    <path opacity="0.8" d="M11.9846 3.9983C10.3535 6.41572 10.3535 9.58137 11.9846 11.9988C9.5672 10.3677 6.40155 10.3677 3.98413 11.9988C5.61524 9.58137 5.61524 6.41572 3.98413 3.9983C6.40155 5.62941 9.5672 5.62941 11.9846 3.9983Z" fill="#FFFDF9" />
                    <path d="M7.99609 2C8.58579 5.03621 10.9599 7.4103 13.9961 8C10.9599 8.5897 8.58579 10.9638 7.99609 14C7.4064 10.9638 5.03231 8.5897 1.99609 8C5.03231 7.4103 7.4064 5.03621 7.99609 2Z" fill="#FFFDF9" />
                  </g>
                  <defs>
                    <clipPath id="clip0_428_4907">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>


                Generate
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 px-4 pt-2">
              {CTAButtons.map((btns, idx) => (
                <Button key={idx} className="border-[#D7D3C9] bg-[#F9F7F3] px-2 md:px-3 py-2 cursor-pointer hover:bg-[#F9F7F3] border text-[#6F6765] text-xs md:text-sm">
                  {btns.title}
                </Button>
              ))}
            </div>

          </div>
          <div className="mt-8 md:mt-12 px-4 md:px-0">
            <div className="text-[#413735] font-semibold text-base md:text-lg pt-8 md:pt-12 lg:pt-18">
              <div className="flex justify-between items-start mb-4">
                <h1>Recent Projects</h1>
                <Button className="border-[#695BE8] border text-[#695BE8] cursor-pointer bg-[#FFFDF9] hover:bg-[#FFFDF9] -mt-1 text-xs md:text-sm px-2 md:px-4 h-8 md:h-10">

                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-4 md:h-4">
                    <path d="M8 3.33334V12.6667" stroke="#695BE8" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.33337 8H12.6667" stroke="#695BE8" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                  <span className="hidden sm:inline">New Project</span>
                  <span className="sm:hidden">New</span>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:ml-5 sm:gap-2 lg:grid-cols-4 lg:gap-4 gap-4">
                <RecentProjects title="Project 1" />
                <RecentProjects title="Project 2" />
                <RecentProjects title="Project 3" />
                <RecentProjects title="Project 4" />



              </div>
            </div>
          </div>


        </main>

      </div>
    </div>
  )
}

export default Hero