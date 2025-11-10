import React, { useRef, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FlowDiagram = ({ data }) => {
  const mainCardRef = useRef(null);
  const childCardRefs = useRef([]);
  const [connectorPositions, setConnectorPositions] = useState(null);
  const [mainTitle, setMainTitle] = useState()

  useEffect(() => {
    if (mainTitle) {
      localStorage.setItem("mainTitle", mainTitle)

    }
  }, [mainTitle])


  useEffect(() => {
    const savedMainTitle = localStorage.getItem('mainTitle')
    if (savedMainTitle) {
      setMainTitle(savedMainTitle)
    }
    let rafId = null;
    let debounceTimer = null;

    const calculatePositions = () => {
      if (!mainCardRef.current || childCardRefs.current.length === 0) return;

      const mainRect = mainCardRef.current.getBoundingClientRect();
      const containerRect = mainCardRef.current.closest('.flow-container')?.getBoundingClientRect();

      if (!containerRect) return;

      const mainCenter = {
        x: mainRect.left + mainRect.width / 2 - containerRect.left,
        y: mainRect.bottom - containerRect.top
      };

      const childCenters = childCardRefs.current.map(ref => {
        if (!ref) return null;
        const rect = ref.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top - containerRect.top
        };
      }).filter(Boolean);

      setConnectorPositions({ mainCenter, childCenters });
    };

    const debouncedCalculate = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(calculatePositions);
      }, 10);
    };

    calculatePositions();

    window.addEventListener('resize', debouncedCalculate);

    const timer1 = setTimeout(calculatePositions, 50);
    const timer2 = setTimeout(calculatePositions, 150);
    const timer3 = setTimeout(calculatePositions, 300);

    const resizeObserver = new ResizeObserver(() => {
      debouncedCalculate();
    });

    if (mainCardRef.current) {
      resizeObserver.observe(mainCardRef.current);
    }

    childCardRefs.current.forEach(ref => {
      if (ref) {
        resizeObserver.observe(ref);
      }
    });

    return () => {
      window.removeEventListener('resize', debouncedCalculate);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(debounceTimer);
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [data]);

  if (!data || !data.pages) return null;

  const { projectName, websiteType, pages } = data;
  const mainPage = pages[0];
  const childPages = pages.slice(1);

  return (
    <div className="w-full flex flex-col bg-[#FFFDFA] items-center mt-12 relative overflow-x-auto pb-12 flow-container">
      <h2 className="text-2xl font-semibold text-gray-800 mb-10 text-center">
        {projectName} ({websiteType})
      </h2>


      <div className="relative flex flex-col items-center">
        <div
          ref={mainCardRef}
          className="border-2 border-gray-200 rounded-2xl shadow-lg bg-white p-5 min-w-[250px] text-center hover:shadow-xl transition-all duration-300 w-full max-w-[300px]" // Added max-width
        >
          <h1 className="font-semibold max-w-[250px] text-black mb-4 p-2 text-base bg-[#EFEFFF] rounded-md" contentEditable suppressContentEditableWarning={true} onInput={(e) => setMainTitle(e.currentTarget.textContent)}>
            {mainPage.name}

          </h1>

          <div className="flex flex-col gap-1 w-full">
            {mainPage.sections.map((section, sidx) => (
              <div
                key={sidx}
                className="rounded-md text-xs font-medium mb-2 w-full"
              >
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="w-full">
                    <AccordionTrigger className="font-normal border border-[#D7D3C9] text-black p-2 hover:no-underline text-lg w-full">
                      {section.name}
                    </AccordionTrigger>
                    <AccordionContent className="w-full">
                      <div className="bg-[#E7FFE7] border border-[#2EA343] p-3 mt-1 rounded-md text-gray-700 leading-relaxed w-full break-words">
                        {section.description}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
      {childPages.length > 0 && connectorPositions && (
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {(() => {
            const { mainCenter, childCenters } = connectorPositions;
            const avgChildY = childCenters.reduce((sum, c) => sum + c.y, 0) / childCenters.length;
            const verticalGap = avgChildY - mainCenter.y;
            const midY = mainCenter.y + verticalGap * 0.35;

            return (
              <>

                {childCenters.map((childCenter, idx) => {
                  return (
                    <g key={idx}>
                      \       <line
                        x1={mainCenter.x}
                        y1={mainCenter.y}
                        x2={mainCenter.x}
                        y2={midY}
                        stroke="#B5B2AA"
                        strokeWidth="1"
                      />


                      <line
                        x1={mainCenter.x}
                        y1={midY}
                        x2={childCenter.x}
                        y2={midY}
                        stroke="#B5B2AA"
                        strokeWidth="1"
                      />

                      <line
                        x1={childCenter.x}
                        y1={midY}
                        x2={childCenter.x}
                        y2={childCenter.y}
                        stroke="#B5B2AA"
                        strokeWidth="1"
                      />

                      <circle
                        cx={childCenter.x}
                        cy={childCenter.y}
                        r="8"
                        fill="white"
                        stroke="#B5B2AA"
                        strokeWidth="1"
                      />
                    </g>
                  );
                })}


                <circle
                  cx={mainCenter.x}
                  cy={mainCenter.y}
                  r="8"
                  fill="white"
                  stroke="#B5B2AA"
                  strokeWidth="1"
                />
              </>
            );
          })()}
        </svg>
      )}


      {childPages.length > 0 && (
        <div className="relative flex justify-center gap-20 px-8 mt-32" style={{ zIndex: 1 }}>
          {childPages.map((page, idx) => (
            <div key={idx} className="relative flex flex-col items-center group">
              <div
                ref={el => childCardRefs.current[idx] = el}
                className="border-2 border-gray-200 rounded-2xl shadow-md bg-white p-4 min-w-[250px] text-center group-hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-semibold min-w-[250px] text-black mb-4 p-2 text-base bg-[#EFEFFF] rounded-md">
                  {page.name}
                </h3>
                <div className="flex flex-col gap-1">
                  {page.sections.map((section, sidx) => (
                    <div
                      key={sidx}
                      className=" rounded-md text-xs font-medium mb-2"
                    >
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="font-normal  border border-[#D7D3C9] text-black p-2 hover:no-underline text-lg">
                            {section.name}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="bg-[#E7FFE7] border mt-1 border-[#2EA343]  p-3 rounded-md text-gray-700 leading-relaxed">
                              {section.description}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlowDiagram;