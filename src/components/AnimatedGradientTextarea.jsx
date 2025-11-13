"use client"

import React from "react"
import { cn } from "@/lib/utils"

// interface AnimatedGradientTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
//   /**
//    * Gradient colors for the background animation
//    * @default "from-[#FAE0D3] via-[#ED9167] to-[#F2D9CC]"
//    */
//   gradientColors?: string
// }

export function AnimatedGradientTextarea({
  className,
  gradientColors = "from-[#FAE0D3] via-[#ED9167] to-[#F2D9CC]",
  ...props
}) {
  return (
    <textarea
      className={cn(
        // Base textarea styles
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30",
        "flex field-sizing-content min-h-16 w-full rounded-md border shadow-xs transition-[color,box-shadow]",
        "outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-base px-3 py-2 resize-none",
        // Animated gradient styles
        `bg-gradient-to-r ${gradientColors} animate-gradient`,
        className,
      )}
      {...props}
    />
  )
}
