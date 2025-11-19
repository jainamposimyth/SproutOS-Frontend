// ...existing code...
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

const SortableAccordionItem = ({ id, children, className = "" }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Support either a render-function child or a React element child
  let content = null;
  if (typeof children === "function") {
    content = children({ dragAttributes: attributes, dragListeners: listeners });
  } else if (React.isValidElement(children)) {
    content = React.cloneElement(children, {
      dragAttributes: attributes,
      dragListeners: listeners,
    });
  } else {
    // fallback: render children as-is
    content = children;
  }

  return (
    <div ref={setNodeRef} style={style} className={className}>
      {content}
    </div>
  );
}

export default SortableAccordionItem;
// ...existing code...