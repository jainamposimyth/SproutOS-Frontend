"use client";
import * as React from "react";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import Fuse from 'fuse.js';
import { useDebounceValue } from "usehooks-ts";

const IconRenderer = React.memo(({
  name
}) => {
  return <Icon name={name} />;
});
IconRenderer.displayName = "IconRenderer";

const IconsColumnSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full ">
      <Skeleton className="h-4 w-1/2 rounded-md" />
      <div className="grid grid-cols-5 gap-2 w-full">
        {Array.from({ length: 40 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-10 rounded-md" />
        ))}
      </div>
    </div>
  );
}

const useIconsData = () => {
  const [icons, setIcons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadIcons = async () => {
      setIsLoading(true);

      const { iconsData } = await import('./icons-data');
      if (isMounted) {
        setIcons(iconsData.filter((icon) => {
          return icon.name in dynamicIconImports;
        }));
        setIsLoading(false);
      }
    };

    loadIcons();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return { icons, isLoading };
};

const IconPicker = React.forwardRef(({
  value,
  defaultValue,
  onValueChange,
  searchable = true,
  searchPlaceholder = "Search",
  iconsList,
  categorized = true,
  className,
  ...props
}, ref) => {
  const [selectedIcon, setSelectedIcon] = useState(defaultValue)
  const [search, setSearch] = useDebounceValue("", 100);
  const { icons } = useIconsData();
  const [isLoading, setIsLoading] = useState(true);
  
  const iconsToUse = useMemo(() => iconsList || icons, [iconsList, icons]);
  
  const fuseInstance = useMemo(() => {
    return new Fuse(iconsToUse, {
      keys: ['name', 'tags', 'categories'],
      threshold: 0.3,
      ignoreLocation: true,
      includeScore: true,
    });
  }, [iconsToUse]);

  const filteredIcons = useMemo(() => {
    if (search.trim() === "") {
      return iconsToUse;
    }
    
    const results = fuseInstance.search(search.toLowerCase().trim());
    return results.map(result => result.item);
  }, [search, iconsToUse, fuseInstance]);

  const categorizedIcons = useMemo(() => {
    if (!categorized || search.trim() !== "") {
      return [{ name: "All Icons", icons: filteredIcons }];
    }

    const categories = new Map();
    
    filteredIcons.forEach(icon => {
      if (icon.categories && icon.categories.length > 0) {
        icon.categories.forEach(category => {
          if (!categories.has(category)) {
            categories.set(category, []);
          }
          categories.get(category).push(icon);
        });
      } else {
        const category = "Other";
        if (!categories.has(category)) {
          categories.set(category, []);
        }
        categories.get(category).push(icon);
      }
    });
    
    return Array.from(categories.entries())
      .map(([name, icons]) => ({ name, icons }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredIcons, categorized, search]);

  const handleValueChange = useCallback((icon) => {
    if (value === undefined) {
      setSelectedIcon(icon)
    }
    onValueChange?.(icon)
  }, [value, onValueChange]);

  const handleIconClick = useCallback((iconName) => {
    handleValueChange(iconName);
  }, [handleValueChange]);

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const renderIcon = useCallback((icon) => (
    <TooltipProvider key={icon.name}>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            "p-2 rounded-md border hover:bg-foreground/10 transition",
            "flex items-center justify-center",
            (value === icon.name || selectedIcon === icon.name) && "bg-primary/20 border-primary"
          )}
          onClick={() => handleIconClick(icon.name)}>
          <IconRenderer name={icon.name} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{icon.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ), [handleIconClick, value, selectedIcon]);

  const renderContent = useCallback(() => {
    if (filteredIcons.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          No icon found
        </div>
      );
    }

    return (
      <div className="w-full overscroll-contain">
        {categorizedIcons.map((category, categoryIndex) => (
          <div key={category.name} className="mb-6">
            <div className="sticky top-0 bg-background z-10 py-2">
              <h3 className="font-medium text-sm capitalize">
                {category.name}
              </h3>
              <div className="h-[1px] bg-foreground/10 w-full mt-1" />
            </div>
            
            <div className="grid grid-cols-5 gap-2 w-full mt-2">
              {category.icons.map(renderIcon)}
            </div>
          </div>
        ))}
      </div>
    );
  }, [categorizedIcons, filteredIcons, renderIcon]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={ref} 
      className={cn("w-full", className)} 
      {...props}
    >
      {searchable && (
        <Input
          placeholder={searchPlaceholder}
          onChange={handleSearchChange}
          className="mb-4" />
      )}
      
      <div
        className="max-h-96 overflow-auto"
        style={{ scrollbarWidth: 'thin' }}>
        {isLoading ? (
          <IconsColumnSkeleton />
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
});
IconPicker.displayName = "IconPicker";

const Icon = React.forwardRef(({ name, ...props }, ref) => {
  return <DynamicIcon name={name} {...props} ref={ref} />;
});
Icon.displayName = "Icon";

export { IconPicker, Icon };