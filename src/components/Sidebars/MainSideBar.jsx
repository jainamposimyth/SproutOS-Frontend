import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function SidebarTabs({ tabs, activeIndex, setActiveIndex }) {
  return (
    <Tabs
      value={String(activeIndex)}
      onValueChange={(v) => setActiveIndex(Number(v))}
      orientation="vertical"
  className="h-full flex" 
    >
   
      <div className="flex h-full">
     <div className="w-20 bg-sprout-color-background-dark h-full flex flex-col p-4 pt-6 text-white border-r border-[#3A2F2C] gap-4 items-start">
          
          <TabsList className="flex flex-col gap-6 mt-22 bg-transparent p-0">
            {tabs.map((tab, index) => (
              <React.Fragment key={index}>
                <TabsTrigger
                  value={String(index)}
                  className={`
                    flex items-center justify-center w-10 h-10 p-3 rounded-md border
                    data-[state=active]:bg-sprout-color-secondary
                    data-[state=active]:border-sprout-color-secondary
                    bg-[#3A2F2C] border-sprout-color-border-dark-weak
                  `}
                >
                  {tab.icon}
                </TabsTrigger>

                {index === 1 && (
                  <div className="h-0.5 w-full bg-[#3A2F2C] my-2"></div>
                )}
              </React.Fragment>
            ))}
          </TabsList>
        </div>
        <div className="flex-1 bg-white min-h-0">
          {tabs.map((tab, index) => (
   <TabsContent
  key={index}
  value={String(index)}
  className="overflow-y-auto h-full min-h-0"
>

              {tab.content ?? (
                <div className="text-gray-600">No content provided.</div>
              )}
            </TabsContent>
          ))}
        </div>

      </div>
    </Tabs>
  );
}
