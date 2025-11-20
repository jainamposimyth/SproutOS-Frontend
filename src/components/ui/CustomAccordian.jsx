
import React, { createContext, useContext, useState, cloneElement, forwardRef } from "react";

const AccordionContext = createContext(null);

export const Accordion = ({ children, className, ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export const AccordionItem = ({ children, value, className, ...props }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);

  return (
    <AccordionContext.Provider value={{ open, toggle, value }}>
      <div className={className} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export const AccordionTrigger = forwardRef(({ children, className, style, onClick, ...props }, ref) => {
  const ctx = useContext(AccordionContext);
  if (!ctx) return null;
  
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={ctx.open}
      onClick={(e) => {
        
        e.stopPropagation();
        if (typeof onClick === "function") onClick(e);
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
      {/* Dropdown arrow that toggles accordion */}
      <span
        className="ml-2 flex-shrink-0 cursor-pointer hover:bg-gray-100 rounded-md  p-0.5 transition-all"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          ctx.toggle();
        }}
        aria-label="Toggle accordion"
      >
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${ctx.open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </button>
  );
});

export const AccordionContent = forwardRef(({ children, className, asChild = false, ...props }, ref) => {
  const ctx = useContext(AccordionContext);
  const visible = !!ctx?.open;

  if (asChild && React.isValidElement(children)) {
    return cloneElement(children, {
      ref,
      className: [children.props.className || "", className || ""].join(" ").trim(),
      hidden: !visible,
      ...props,
    });
  }

  return (
    <div ref={ref} className={className} role="region" hidden={!visible} {...props}>
      {visible ? children : null}
    </div>
  );
});
