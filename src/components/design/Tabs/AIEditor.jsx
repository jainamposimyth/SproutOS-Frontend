import React,{useEffect,useState,useRef} from 'react'
import { useSelectedElement } from '@/context/SelectedElement'
import { Input } from '@/components/ui/input'
const AIEditor = () => {
  const {selectedTexts,setSelectedTexts} = useSelectedElement()
  const [value,setValue] = useState(selectedTexts)
  const textareaRef = useRef(null);
    useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto"; // Reset
      el.style.height = `${el.scrollHeight}px`; // Adjust based on content
    }
  }, [value]);

  return (
  <main className="bg-[#FFFDFA]  text-black flex-1 overflow-y-auto rounded-t-xl">
         <div className='h-full w-80 border p-6 overflow-x-auto '>
                        <div className='text-xl font-[500] text-sprout-color-text-default'>
              Section
            </div>
            
             <div className='pt-5 gap-8 '>
              <div className='text-sprout-color-text-weaker text-md font-[500]'>
               Selected Text
              </div>
                 <div className="relative mt-2 rounded-md border border-sprout-color-border-weak">
      <textarea
        ref={textareaRef}
        id="description"
        placeholder=" "
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="peer w-full border-none resize-none text-black placeholder-transparent px-3 md:px-4 pt-4 md:pt-6 text-sm md:text-base focus-visible:ring-0 focus:ring-0 focus:outline-none bg-transparent resize-none overflow-hidden"
      />

      <label
        htmlFor="description"
        className="absolute left-7 md:left-4 top-2 md:top-2 text-sm md:text-base text-sprout-color-text-disabled transition-all
        peer-placeholder-shown:opacity-100
        peer-focus:opacity-0 peer-focus:hidden
        pointer-events-none"
      >
        {selectedTexts}
      </label>
    </div>
            </div>
            </div>
    </main>
  )
}

export default AIEditor