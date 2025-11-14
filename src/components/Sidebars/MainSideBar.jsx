import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function SidebarTabs({ tabs, activeIndex, setActiveIndex }) {
  return (
    <Tabs
      value={String(activeIndex)}
      onValueChange={(v) => setActiveIndex(Number(v))}
      orientation="vertical"
      className="h-full"
    >
      {/* --- Whole Layout: Sidebar + Content --- */}
      <div className="flex h-full">
        
        {/* --- Sidebar --- */}
        <div className="w-20 bg-sprout-color-background-dark h-full flex flex-col p-4 pt-6 text-white border-r border-[#3A2F2C] gap-4 items-start">
          <TabsList className="flex flex-col gap-4 bg-transparent p-0">
            {tabs.map((tab, index) => (
              <React.Fragment key={index}>
                <TabsTrigger
                  value={String(index)}
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-md border
                    data-[state=active]:bg-sprout-color-secondary
                    data-[state=active]:border-sprout-color-secondary
                    bg-[#3A2F2C] border-sprout-color-border-dark-weak text-white
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

        {/* --- Content Area --- */}
        <div className="flex-1 bg-white border  ">
          {tabs.map((tab, index) => (
            <TabsContent key={index} value={String(index)} className="h-full">
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
